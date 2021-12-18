interface Tokens {
  [key: string]: Intl.DateTimeFormatOptions;
}

interface Matches {
  [key: string]: string;
}

const tokens: Tokens = {
  yyyy: { year: 'numeric' },
  yy: { year: '2-digit' },
  MMMM: { month: 'long' },
  MMM: { month: 'short' },
  MM: { month: '2-digit' },
  M: { month: 'numeric' },
  dd: { day: '2-digit' },
  d: { day: 'numeric' },
  EEEE: { weekday: 'long' },
  EEE: { weekday: 'short' },
  EE: { weekday: 'narrow' },
  'HH:mm': { hour: 'numeric', minute: 'numeric', hour12: false },
  'h:mm': { hour: 'numeric', minute: 'numeric', hour12: true },
  'h:mm a': { hour: 'numeric', minute: 'numeric', hour12: true },
  HH: { hour: '2-digit', hour12: false },
  H: { hour: 'numeric', hour12: false },
  h: { hour: 'numeric', hour12: true },
  mm: { minute: '2-digit' },
  m: { minute: 'numeric' },
  ss: { second: '2-digit' },
  s: { second: 'numeric' }
};

const localeStringFromToken = (date: Date, options: Intl.DateTimeFormatOptions, locale: string) =>
  date.toLocaleString(locale, options);

export const formatToken = (date: Date, format: string, locale = 'en-US'): string => {
  let updatedFormatStr = format;
  const replacements: Matches = {};
  let matchNumber = 0;
  for (const tokenKey of Object.keys(tokens)) {
    const regex = new RegExp(tokenKey, 'g');
    const matches = updatedFormatStr.match(regex);
    if (matches) {
      const matchKey = `_${++matchNumber}`;
      updatedFormatStr = updatedFormatStr.replace(regex, matchKey);
      replacements[matchKey] = tokenKey;
    }
  }

  if (!matchNumber) {
    return 'No date format tokens found';
  }

  for (const [key, tokenKey] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g');
    updatedFormatStr = updatedFormatStr.replace(regex, localeStringFromToken(date, tokens[tokenKey], locale));
  }
  return updatedFormatStr;
};
