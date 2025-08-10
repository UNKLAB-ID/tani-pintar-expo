const shortMonthMap: Record<number, string> = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'Mei',
  5: 'Jun',
  6: 'Jul',
  7: 'Agus',
  8: 'Sep',
  9: 'Okt',
  10: 'Nov',
  11: 'Des',
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // e.g., Senin
    day: 'numeric', // e.g., 7
    month: 'long', // e.g., Agustus
    year: 'numeric', // e.g., 2025
    hour: '2-digit', // e.g., 14
    minute: '2-digit', // e.g., 05
    hour12: false, // 24-hour format
  };

  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate(); // 6
  const month = date.getMonth(); // 0–11
  const shortMonth = shortMonthMap[month]; // e.g., "Agus"
  return `${day} ${shortMonth}`;
};
