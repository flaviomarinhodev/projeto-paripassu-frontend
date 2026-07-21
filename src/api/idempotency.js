/**
 * Generates a v4-style UUID used as an idempotency key.
 * The same key must be reused across retries of the same submit action,
 * so the backend can detect and ignore duplicate requests
 * (double clicks, network retries, etc.).
 */
export function generateIdempotencyKey () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const random = Math.random() * 16 | 0
    const value = char === 'x' ? random : (random & 0x3 | 0x8)
    return value.toString(16)
  })
}