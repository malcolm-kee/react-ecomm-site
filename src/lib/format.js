export const formatMoney = (
  value,
  { thousandSeparator, decimalPlaces = 2 } = {}
) => {
  const valueInNumber = typeof value === 'number' ? value : Number(value);
  const valueWithDecimal = valueInNumber.toFixed(decimalPlaces);
  if (!thousandSeparator) {
    return valueWithDecimal;
  }
  // solution below is copied from stack overflow:
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const parts = valueWithDecimal.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
