import attractions from "../../data/search/attractions.json";
import cities from "../../data/search/cities.json";
import tours from "../../data/search/tours.json";
import users from "../../data/search/users.json";

export type SearchCollection = "attractions" | "cities" | "tours" | "users";
export type SearchParams = {
  q?: string;
  query_by?: string;
  filter_by?: string;
  sort_by?: string;
  per_page?: number;
  page?: number;
  exclude_fields?: string;
  [key: string]: unknown;
};
export type SearchHit = { document: SearchDocument; highlights: []; text_match: number };
export type SearchResponse = { found: number; out_of: number; page: number; hits: SearchHit[] };
type SearchDocument = Record<string, unknown>;
type Predicate = (document: SearchDocument) => boolean;
type Sorter = (left: SearchDocument, right: SearchDocument) => number;

const MAX_PARAMETER_LENGTH = 10_000;

const documents: Record<SearchCollection, SearchDocument[]> = {
  attractions: attractions as SearchDocument[],
  cities: cities as SearchDocument[],
  tours: tours as SearchDocument[],
  users: users as SearchDocument[],
};

export function findCityByEnglishName(name: string): SearchDocument | undefined {
  const city = documents.cities.find((document) => document["translatedCity.en"] === name);
  return city ? { ...city } : undefined;
}

export class SearchSyntaxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SearchSyntaxError";
  }
}

function validateSearchParams(params: SearchParams): void {
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (typeof value === "string") {
      if (value.length > MAX_PARAMETER_LENGTH) throw new SearchSyntaxError(`${key} is too long.`);
      continue;
    }
    if (key === "page" || key === "per_page" || key === "cache_ttl") {
      if (typeof value !== "number" || !Number.isFinite(value)) throw new SearchSyntaxError(`${key} must be a finite number.`);
      continue;
    }
    if (key === "use_cache" && typeof value === "boolean") continue;
    throw new SearchSyntaxError(`${key} has an unsupported value type.`);
  }
}

function splitTopLevel(value: string, separator: string): string[] {
  const parts: string[] = [];
  let start = 0;
  let quote = "";
  let bracketDepth = 0;
  let parenDepth = 0;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (quote) {
      if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
    } else if (character === "[") {
      bracketDepth += 1;
    } else if (character === "]") {
      bracketDepth -= 1;
    } else if (character === "(") {
      parenDepth += 1;
    } else if (character === ")") {
      parenDepth -= 1;
    }
    if (bracketDepth < 0 || parenDepth < 0) throw new SearchSyntaxError(`Unbalanced expression: ${value}`);
    if (!quote && bracketDepth === 0 && parenDepth === 0 && value.startsWith(separator, index)) {
      parts.push(value.slice(start, index));
      start = index + separator.length;
      index += separator.length - 1;
    }
  }
  if (quote || bracketDepth !== 0 || parenDepth !== 0) throw new SearchSyntaxError(`Unbalanced expression: ${value}`);
  parts.push(value.slice(start));
  return parts;
}

function stringValue(value: unknown): string {
  return String(value ?? "");
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length >= 2 && ["'", '"', "`"].includes(trimmed[0]) && trimmed.at(-1) === trimmed[0]) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function documentValues(document: SearchDocument, field: string): unknown[] {
  const value = document[field];
  return Array.isArray(value) ? value : [value];
}

function parseList(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) throw new SearchSyntaxError(`Expected a bracket list: ${value}`);
  return splitTopLevel(trimmed.slice(1, -1), ",").map((item) => unquote(item)).filter(Boolean);
}

function coordinate(value: string): number {
  const number = Number(value.trim());
  if (!Number.isFinite(number)) throw new SearchSyntaxError(`Invalid coordinate: ${value}`);
  return number;
}

function haversineKilometers([latitudeA, longitudeA]: number[], [latitudeB, longitudeB]: number[]): number {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitude = radians(latitudeB - latitudeA);
  const longitude = radians(longitudeB - longitudeA);
  const a = Math.sin(latitude / 2) ** 2 + Math.cos(radians(latitudeA)) * Math.cos(radians(latitudeB)) * Math.sin(longitude / 2) ** 2;
  return 6371.0088 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pointInPolygon(point: number[], polygon: number[][]): boolean {
  const [latitude, longitude] = point;
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const [currentLatitude, currentLongitude] = polygon[index];
    const [previousLatitude, previousLongitude] = polygon[previous];
    const crosses = currentLatitude > latitude !== previousLatitude > latitude;
    const intersection = ((previousLongitude - currentLongitude) * (latitude - currentLatitude)) / (previousLatitude - currentLatitude) + currentLongitude;
    if (crosses && longitude < intersection) inside = !inside;
  }
  return inside;
}

function geoPredicate(expression: string): Predicate {
  const contents = expression.trim();
  const parts = splitTopLevel(contents, ",").map((item) => item.trim()).filter(Boolean);
  if (parts.length === 3 && /^(km|mi)$/i.test(parts[2].replace(/^[\d.]+/, ""))) {
    const latitude = coordinate(parts[0]);
    const longitude = coordinate(parts[1]);
    const match = parts[2].match(/^([\d.]+)\s*(km|mi)$/i);
    if (!match) throw new SearchSyntaxError(`Invalid geo radius: ${parts[2]}`);
    const radiusKm = Number(match[1]) * (match[2].toLowerCase() === "mi" ? 1.609344 : 1);
    return (document) => {
      const location = document._geoloc;
      return Array.isArray(location) && location.length === 2 && haversineKilometers([latitude, longitude], location.map(Number)) <= radiusKm;
    };
  }
  if (parts.length < 6 || parts.length % 2 !== 0) throw new SearchSyntaxError(`Invalid geo polygon: ${expression}`);
  const polygon: number[][] = [];
  for (let index = 0; index < parts.length; index += 2) polygon.push([coordinate(parts[index]), coordinate(parts[index + 1])]);
  return (document) => {
    const location = document._geoloc;
    return Array.isArray(location) && location.length === 2 && pointInPolygon(location.map(Number), polygon);
  };
}

function filterPredicate(clause: string): Predicate {
  const trimmed = clause.trim();
  if (!trimmed) return () => true;
  const geo = trimmed.match(/^_geoloc:\(([\s\S]*)\)$/);
  if (geo) return geoPredicate(geo[1]);

  const range = trimmed.match(/^([^:]+):\[([^.]*)\.\.([^\]]*)\]$/);
  if (range) {
    const [, field, lowerRaw, upperRaw] = range;
    const lower = Number(lowerRaw.trim());
    const upper = Number(upperRaw.trim());
    if (!Number.isFinite(lower) || !Number.isFinite(upper)) throw new SearchSyntaxError(`Invalid numeric range: ${trimmed}`);
    return (document) => documentValues(document, field.trim()).some((value) => {
      const number = Number(value);
      return Number.isFinite(number) && number >= lower && number <= upper;
    });
  }

  const comparison = trimmed.match(/^([^:]+):(<=|>=|!=|=|<|>)([\s\S]*)$/);
  if (!comparison) throw new SearchSyntaxError(`Unsupported filter clause: ${trimmed}`);
  const [, fieldRaw, operator, valueRaw] = comparison;
  const field = fieldRaw.trim();
  const value = valueRaw.trim();
  if (!field || !value) throw new SearchSyntaxError(`Invalid filter clause: ${trimmed}`);

  if (operator === "=") {
    const expected = value.startsWith("[") ? parseList(value) : [unquote(value)];
    return (document) => documentValues(document, field).some((item) => expected.includes(stringValue(item)));
  }
  if (operator === "!=") {
    const expected = unquote(value);
    return (document) => documentValues(document, field).every((item) => item === undefined || stringValue(item) !== expected);
  }

  const expected = Number(unquote(value));
  if (!Number.isFinite(expected)) throw new SearchSyntaxError(`Expected a numeric value: ${trimmed}`);
  return (document) => documentValues(document, field).some((item) => {
    const actual = Number(item);
    if (!Number.isFinite(actual)) return false;
    if (operator === "<=") return actual <= expected;
    if (operator === ">=") return actual >= expected;
    if (operator === "<") return actual < expected;
    return actual > expected;
  });
}

function compileFilter(filterBy?: string): Predicate {
  if (!filterBy?.trim()) return () => true;
  const predicates = splitTopLevel(filterBy, "&&").map((clause) => clause.trim()).filter(Boolean).map(filterPredicate);
  return (document) => predicates.every((predicate) => predicate(document));
}

function compareValues(left: unknown, right: unknown, direction: "asc" | "desc"): number {
  const leftMissing = left === undefined || left === null || left === "";
  const rightMissing = right === undefined || right === null || right === "";
  if (leftMissing || rightMissing) return leftMissing === rightMissing ? 0 : leftMissing ? 1 : -1;
  const leftNumber = Number(left);
  const rightNumber = Number(right);
  const leftString = stringValue(left);
  const rightString = stringValue(right);
  const base = Number.isFinite(leftNumber) && Number.isFinite(rightNumber)
    ? leftNumber - rightNumber
    : leftString === rightString
      ? 0
      : leftString < rightString ? -1 : 1;
  return direction === "asc" ? base : -base;
}

function sortCompiler(sortBy?: string): Sorter {
  if (!sortBy?.trim()) return () => 0;
  const sorters = splitTopLevel(sortBy, ",").map((raw) => {
    const expression = raw.trim();
    if (!expression) return null;
    const evalMatch = expression.match(/^_eval\(uid:([^)]*)\):(asc|desc)$/i);
    if (evalMatch) {
      const [, uid, direction] = evalMatch;
      return (left: SearchDocument, right: SearchDocument) => compareValues(Number(stringValue(left.uid ?? left.id) === uid), Number(stringValue(right.uid ?? right.id) === uid), direction.toLowerCase() as "asc" | "desc");
    }
    const geoMatch = expression.match(/^_geoloc\(([^,]+),\s*([^)]+)\):(asc|desc)$/i);
    if (geoMatch) {
      const [, latitudeRaw, longitudeRaw, direction] = geoMatch;
      const origin = [coordinate(latitudeRaw), coordinate(longitudeRaw)];
      const distance = (document: SearchDocument) => Array.isArray(document._geoloc) && document._geoloc.length === 2 ? haversineKilometers(origin, document._geoloc.map(Number)) : undefined;
      return (left: SearchDocument, right: SearchDocument) => compareValues(distance(left), distance(right), direction.toLowerCase() as "asc" | "desc");
    }
    const missingMatch = expression.match(/^([^:(]+)\(missing_values:\s*last\):(asc|desc)$/i);
    const fieldMatch = expression.match(/^([^:]+):(asc|desc)$/i);
    const match = missingMatch || fieldMatch;
    if (!match) throw new SearchSyntaxError(`Unsupported sort expression: ${expression}`);
    const [, field, direction] = match;
    return (left: SearchDocument, right: SearchDocument) => compareValues(left[field.trim()], right[field.trim()], direction.toLowerCase() as "asc" | "desc");
  }).filter(Boolean) as Sorter[];
  return (left, right) => {
    for (const sorter of sorters) {
      const result = sorter(left, right);
      if (result !== 0) return result;
    }
    return 0;
  };
}

function matchesQuery(document: SearchDocument, q?: string, queryBy?: string): boolean {
  const normalized = (q || "").normalize("NFKC").toLocaleLowerCase().trim();
  if (!normalized || normalized === "*") return true;
  if (!queryBy?.trim()) throw new SearchSyntaxError("query_by is required when q is not empty.");
  const fields = splitTopLevel(queryBy, ",").map((field) => field.trim()).filter(Boolean);
  if (!fields.length) throw new SearchSyntaxError("query_by contains no fields.");
  const haystack = fields.flatMap((field) => documentValues(document, field)).map((value) => stringValue(value).normalize("NFKC").toLocaleLowerCase());
  return normalized.split(/\s+/).every((token) => haystack.some((value) => value.includes(token)));
}

function excludeFields(document: SearchDocument, excludeFieldsValue?: string): SearchDocument {
  if (!excludeFieldsValue?.trim()) return { ...document };
  const excluded = new Set(splitTopLevel(excludeFieldsValue, ",").map((field) => field.trim()).filter(Boolean));
  return Object.fromEntries(Object.entries(document).filter(([field]) => !excluded.has(field)));
}

export function searchCollection(collection: SearchCollection, params: SearchParams): SearchResponse {
  validateSearchParams(params);
  const page = Number(params.page ?? 1);
  const perPage = Number(params.per_page ?? 10);
  if (!Number.isInteger(page) || page < 1) throw new SearchSyntaxError("page must be a positive integer.");
  if (!Number.isInteger(perPage) || perPage < 1 || perPage > 100) throw new SearchSyntaxError("per_page must be an integer between 1 and 100.");
  for (const key of ["q", "query_by", "filter_by", "sort_by", "exclude_fields"]) {
    if (params[key] !== undefined && typeof params[key] !== "string") throw new SearchSyntaxError(`${key} must be a string.`);
  }

  const collectionDocuments = documents[collection];
  const documentOrder = new Map(collectionDocuments.map((document, index) => [document, index]));
  const filter = compileFilter(params.filter_by as string | undefined);
  const sort = sortCompiler(params.sort_by as string | undefined);
  const matched = collectionDocuments.filter((document) => filter(document) && matchesQuery(document, params.q as string | undefined, params.query_by as string | undefined));
  // Typesense breaks equal sort keys by its internal sequence ID. Export order is
  // the inverse of that sequence, so preserve the observed live ordering for ties.
  matched.sort((left, right) => sort(left, right) || (documentOrder.get(right)! - documentOrder.get(left)!));
  const start = (page - 1) * perPage;
  return {
    found: matched.length,
    out_of: collectionDocuments.length,
    page,
    hits: matched.slice(start, start + perPage).map((document) => ({ document: excludeFields(document, params.exclude_fields as string | undefined), highlights: [], text_match: 0 })),
  };
}
