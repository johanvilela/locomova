export const normalizeCurrency = (value: string | undefined) => {
  if (!value) return "";

  // Remove all non-numeric characters, including comma and period
  value = value.replace(/[^\d]/g, "");

  // Add comma
  value = value.replace(/^(\d+)(\d{2})$/, "$1,$2");

  // Separate thousands
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  // Add currency symbol
  value = "R$ " + value;

  return value;
};

export const currencyStringToNumber = (value: string | undefined): number => {
  if (!value) return 0;

  // Remove currency symbol and spaces
  value = value.replace(/R\$|\s/g, "");

  // Remove periods separating thousands
  value = value.replace(/\./g, "");

  // Replace comma with period to convert to decimal number
  value = value.replace(/,/, ".");

  // Convert to number
  const numberValue = parseFloat(value);

  // Check if the conversion was successful
  if (isNaN(numberValue)) {
    console.error("Invalid value for conversion");
  }

  return numberValue;
};
