import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const host = process.env.TYPESENSE_HOST || "https://hft21495dauqblnop-1.a1.typesense.net";
const adminKey = process.env.TYPESENSE_ADMIN_KEY;
const collections = ["users", "attractions", "tours", "cities"];

if (!adminKey) {
  throw new Error("TYPESENSE_ADMIN_KEY must be set in the environment before exporting.");
}

const exactFields = {
  users: new Set([
    "id",
    "uid",
    "guide",
    "verified",
    "firstname",
    "lastname",
    "username",
    "avatar",
    "photos",
    "licensed",
    "canDrive",
    "languages",
    "states",
    "availability",
    "acceptTourFrom",
    "transportIncluded",
    "feeWithTransport",
    "maxPeople",
    "maxPeopleTransport",
    "ratingScore",
    "ratingCounter",
    "rating",
    "createdAt",
    "lastVisit",
    "_geoloc",
  ]),
  attractions: new Set([
    "id",
    "url",
    "website",
    "name",
    "tags",
    "hide",
    "_geoloc",
    "rating",
    "ratingCounter",
    "duration",
    "date",
    "dateFrom",
    "closedDays",
    "openingPeriods",
    "openingHours",
  ]),
  tours: new Set([
    "id",
    "url",
    "name",
    "photos",
    "attractions",
    "urls",
    "attractionsName",
    "startTime",
    "duration",
    "ratingScore",
    "ratingCounter",
    "tags",
    "_geoloc",
  ]),
  cities: new Set(["id", "city", "country", "area", "_geoloc"]),
};

const fieldPrefixes = {
  users: ["fee."],
  attractions: ["translatedName.", "translatedCity.", "translatedArea."],
  tours: ["translatedName.", "translatedAttractions."],
  cities: ["translatedCity.", "translatedCountry.", "translatedArea."],
};

function publicDocument(collection, document) {
  if (collection === "users" && (String(document.guide) !== "true" || String(document.verified) !== "true")) {
    return null;
  }

  return Object.fromEntries(
    Object.entries(document).filter(([field]) =>
      exactFields[collection].has(field) || fieldPrefixes[collection].some((prefix) => field.startsWith(prefix))
    )
  );
}

async function getRaw(pathname) {
  const response = await fetch(`${host}${pathname}`, {
    headers: { "X-TYPESENSE-API-KEY": adminKey },
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`GET ${pathname} failed (${response.status}): ${body.slice(0, 300)}`);
  }

  return body;
}

function parseJsonLines(body, collection) {
  return body
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${collection} export line ${index + 1} is not valid JSON: ${error.message}`);
      }
    });
}

async function fileSize(file) {
  return (await stat(file)).size;
}

async function main() {
  const backupDir = path.join(root, "backups", "typesense");
  const snapshotDir = path.join(root, "data", "search");
  const fixturesDir = path.join(root, "scripts", "fixtures");
  await Promise.all([mkdir(backupDir, { recursive: true }), mkdir(snapshotDir, { recursive: true }), mkdir(fixturesDir, { recursive: true })]);

  const available = JSON.parse(await getRaw("/collections"));
  const availableNames = available.map((collection) => collection.name);
  const unexpected = availableNames.filter((name) => !collections.includes(name));
  console.log(`Typesense collections: ${availableNames.join(", ") || "(none)"}`);
  console.log(`Additional collections: ${unexpected.join(", ") || "(none)"}`);

  for (const collection of collections) {
    if (!availableNames.includes(collection)) {
      throw new Error(`Expected collection \"${collection}\" was not found.`);
    }

    const [schemaRaw, exportRaw] = await Promise.all([
      getRaw(`/collections/${collection}`),
      getRaw(`/collections/${collection}/documents/export`),
    ]);
    const rawSchemaPath = path.join(backupDir, `${collection}.schema.json`);
    const rawExportPath = path.join(backupDir, `${collection}.jsonl`);
    const fixtureSchemaPath = path.join(fixturesDir, `${collection}.schema.json`);
    const snapshotPath = path.join(snapshotDir, `${collection}.json`);
    const rawDocuments = parseJsonLines(exportRaw, collection);
    const publicDocuments = rawDocuments.map((document) => publicDocument(collection, document)).filter(Boolean);

    await Promise.all([
      writeFile(rawSchemaPath, schemaRaw),
      writeFile(rawExportPath, exportRaw),
      writeFile(fixtureSchemaPath, schemaRaw),
      writeFile(snapshotPath, `${JSON.stringify(publicDocuments, null, 2)}\n`),
    ]);

    console.log(
      `${collection}: raw=${rawDocuments.length}, served=${publicDocuments.length}, ` +
        `backup=${await fileSize(rawExportPath)} bytes, snapshot=${await fileSize(snapshotPath)} bytes`
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
