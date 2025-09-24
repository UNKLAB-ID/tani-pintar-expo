export const formatPrice = (value: number | string): string => {
  // pastikan jadi number
  const number = typeof value === 'string' ? parseFloat(value) : value;

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
