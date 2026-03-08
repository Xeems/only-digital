export function toTwoDigits(num: number): string {
  return String(num).padStart(2, "0");
}