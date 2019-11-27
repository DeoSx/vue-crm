export default function currencyFilter(value, currency = "KZT") {
  return new Intl.NumberFormat("Ru-ru", {
    style: "currency",
    currency
  }).format(value);
}
