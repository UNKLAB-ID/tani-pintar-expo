export const formatPrice = (number: number): string =>
  'Rp' +
  number.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
