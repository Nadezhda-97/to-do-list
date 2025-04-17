export function generateId(): number {
  return Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);
}
  