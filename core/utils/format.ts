export function formatNumber(value: number | undefined | null): string {
  if (value == null) return "0";
  return value.toLocaleString("en-US");
}

export function formatCurrency(
  value: number | undefined | null,
  symbol = "$"
): string {
  return `${symbol}${formatNumber(value)}`;
}
