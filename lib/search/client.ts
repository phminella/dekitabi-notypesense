import type { SearchCollection, SearchParams, SearchResponse } from "./index";

export function createLocalSearchClient() {
  return {
    collections(name: SearchCollection) {
      return {
        documents() {
          return {
            async search(params: SearchParams): Promise<SearchResponse> {
              const response = await fetch(`/api/search/${name}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params),
              });
              if (!response.ok) throw new Error(`Local search failed (${response.status})`);
              return response.json();
            },
          };
        },
      };
    },
  };
}
