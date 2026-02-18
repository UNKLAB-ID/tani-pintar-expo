export type OperatorKey = 'TELKOMSEL' | 'INDOSAT' | 'XL';

export function detectOperator(phone: string): OperatorKey | null {
  if (phone.length < 4) return null;

  // TELKOMSEL
  if (/^08(11|12|13|21|22|23|51)/.test(phone)) {
    return 'TELKOMSEL';
  }

  // INDOSAT (IM3 + Matrix + Mentari)
  if (/^08(14|15|16|55|56|57|58)/.test(phone)) {
    return 'INDOSAT';
  }

  // XL AXIATA
  if (/^08(17|18|19|59|77|78)/.test(phone)) {
    return 'XL';
  }

  return null;
}
