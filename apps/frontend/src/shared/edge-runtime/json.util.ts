export function json<T = {}>(value: T, indent = 2) {
  return JSON.stringify(value, null, indent);
}
