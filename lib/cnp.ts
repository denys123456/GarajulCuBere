const CONTROL = "279146358279";

export function isValidRomanianCNP(cnp: string) {
  if (!/^\d{13}$/.test(cnp)) {
    return false;
  }

  const digits = cnp.split("").map(Number);
  const gender = digits[0];

  if (gender < 1 || gender > 8) {
    return false;
  }

  const year = Number(cnp.slice(1, 3));
  const month = Number(cnp.slice(3, 5));
  const day = Number(cnp.slice(5, 7));
  const county = Number(cnp.slice(7, 9));

  if (month < 1 || month > 12 || day < 1 || day > 31 || county < 1 || county > 52) {
    return false;
  }

  const centuryMap: Record<number, number> = {
    1: 1900,
    2: 1900,
    3: 1800,
    4: 1800,
    5: 2000,
    6: 2000,
    7: 2000,
    8: 2000
  };

  const fullYear = centuryMap[gender] + year;
  const date = new Date(fullYear, month - 1, day);

  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  const checksum = digits
    .slice(0, 12)
    .reduce((sum, digit, index) => sum + digit * Number(CONTROL[index]), 0);
  const controlDigit = checksum % 11 === 10 ? 1 : checksum % 11;

  return controlDigit === digits[12];
}
