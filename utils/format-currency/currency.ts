export const formatPrice = (number: number): string => {
  if (number == null || isNaN(number)) {
    return 'Rp 0';
  }
  return (
    'Rp' +
    number.toLocaleString('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
};
