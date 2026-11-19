import type { NextApiRequest, NextApiResponse } from "next";
import { SearchSyntaxError, searchCollection, type SearchCollection, type SearchParams } from "../../../lib/search";

const collections = new Set<SearchCollection>(["users", "attractions", "tours", "cities"]);

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }
  const collection = request.query.collection;
  if (typeof collection !== "string" || !collections.has(collection as SearchCollection)) {
    return response.status(404).json({ error: "Unknown collection" });
  }
  if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
    return response.status(400).json({ error: "Search parameters must be an object" });
  }
  try {
    return response.status(200).json(searchCollection(collection as SearchCollection, request.body as SearchParams));
  } catch (error) {
    if (error instanceof SearchSyntaxError) {
      if (process.env.NODE_ENV !== "production") throw error;
      console.error("Local search rejected request:", error.message);
      return response.status(400).json({ error: error.message });
    }
    console.error("Local search failed:", error);
    return response.status(500).json({ error: "Local search failed" });
  }
}
