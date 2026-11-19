// Utility to format numbers with commas safely
function intlFormat(num) {
  const rounded = Math.round(num * 10) / 10; // round to 1 decimal
  // Remove .0 if it's a whole number
  const formatted = Number.isInteger(rounded)
    ? rounded.toString()
    : rounded.toString();
  // Add commas manually
  return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert large numbers to short format (k, M)
function shortNumbers(num) {
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "k";
  return intlFormat(num);
}

export default shortNumbers;
