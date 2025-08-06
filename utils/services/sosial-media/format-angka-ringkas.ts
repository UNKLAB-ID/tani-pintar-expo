export const formatAngkaRingkas = (angka: number): string => {
  if (angka >= 1_000_000_000)
    return (angka / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'; // Miliar
  if (angka >= 1_000_000)
    return (angka / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'; // Juta
  if (angka >= 1_000)
    return (angka / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'; // Ribu
  return angka.toString(); // Di bawah 1.000, tampilkan apa adanya
};
