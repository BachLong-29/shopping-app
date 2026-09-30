export function formatNumber(value: number | undefined | null): string {
  if (value == null) return "0";
  return value.toLocaleString("en-US");
}

export function formatVND(value: number | undefined | null): string {
  return `${(value ?? 0).toLocaleString("vi-VN")}₫`;
}

export function formatCurrency(
  value: number | undefined | null,
  symbol = "$"
): string {
  return `${symbol}${formatNumber(value)}`;
}
