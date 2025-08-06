import moment from 'moment';
import { formatAngkaRingkas } from './format-angka-ringkas';

export const formatWaktuSingkat = (tanggal: string) => {
  const now = moment();
  const posted = moment(tanggal);
  const diffInMinutes = now.diff(posted, 'minutes');

  if (diffInMinutes < 60) {
    return `${formatAngkaRingkas(diffInMinutes)}m`;
  } else if (diffInMinutes < 1440) {
    const jam = Math.floor(diffInMinutes / 60);
    return `${formatAngkaRingkas(jam)}h`;
  } else {
    const hari = Math.floor(diffInMinutes / 1440);
    return `${formatAngkaRingkas(hari)}d`;
  }
};
