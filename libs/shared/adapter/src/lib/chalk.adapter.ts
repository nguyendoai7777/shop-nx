export async function ChalkAdapter() {
  return (await import('chalk')).default;
}