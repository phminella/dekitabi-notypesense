/**
 * Utility to unflatten an object with dot-notation keys into a nested structure.
 * Replaces the untyped `dottie` dependency.
 *
 * Example:
 * unflatten({ "author.name": "John" }) // => { author: { name: "John" } }
 */
export function unflatten(data: Record<string, unknown>): Record<string, unknown> {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  const result: Record<string, unknown> = {};

  for (const key in data) {
    const keys = key.split(".");
    let current: Record<string, unknown> = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = data[key];
      } else {
        if (!current[k] || typeof current[k] !== "object") {
          current[k] = {};
        }
        current = current[k] as Record<string, unknown>;
      }
    }
  }

  return result;
}
