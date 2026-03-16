/**
 * Encode a recommendation object to a URL-safe base64 string.
 */
export function encodeResult(recommendation) {
  const json = JSON.stringify(recommendation);
  return btoa(encodeURIComponent(json));
}

/**
 * Decode a URL-safe base64 string back to a recommendation object.
 * Returns null on failure.
 */
export function decodeResult(encoded) {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
