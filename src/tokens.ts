interface Tokens {
  [key: string]: Intl.DateTimeFormatOptions
}

const hm: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' }
const hma: Intl.DateTimeFormatOptions = { ...hm, hour12: true }
const hms: Intl.DateTimeFormatOptions = { ...hm, second: 'numeric' }
const hmsa: Intl.DateTimeFormatOptions = { ...hms, hour12: true }
const ymd: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
const ymdMed: Intl.DateTimeFormatOptions = { year: "numeric", month: 'short', day: 'numeric' }
const ymdLong: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric' }
const ymdFull: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric', weekday: 'long' }

export const tokens: Tokens = {
  datetime_short_with_seconds: { ...ymd, ...hms },
  datetime_short: { ...ymd, ...hm },
  datetime_medium_with_seconds: { ...ymdMed, ...hms },
  datetime_medium: { ...ymdMed, ...hm },
  datetime_long_with_seconds: { ...ymdLong, ...hms },
  datetime_long: { ...ymdLong, ...hm },
  datetime_full_with_seconds: { ...ymdFull, ...hms },
  datetime_full: { ...ymdFull, ...hm },
  date_short: ymd,
  date_med: ymdMed,
  date_long: ymdLong,
  date_full: ymdFull,
  time_with_seconds: hmsa,
  // @ts-ignore
  time_long: { ...hmsa, fractionalSecondDigits: 3 },
  time_24_with_seconds: { ...hmsa, hour12: false },
  // @ts-ignore
  time_24_long: { ...hms, fractionalSecondDigits: 3, hour12: false },
  time_24: { ...hm, hour12: false },
  time: hma,
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
  // @ts-ignore
  'h:mm:ss.SSS': { ...hmsa, fractionalSecondDigits: 3 },
  // @ts-ignore
  'h:mm:ss.SS': { ...hmsa, fractionalSecondDigits: 2 },
  // @ts-ignore
  'h:mm:ss.S': { ...hmsa, fractionalSecondDigits: 1 },
  'h:mm:ss': hmsa,
  'hh:mm a': hma,
  'h:mm a': hma,
  'h:mm': hma,
  // @ts-ignore
  SSS: { fractionalSecondDigits: 3 },
  // @ts-ignore
  SS: { fractionalSecondDigits: 2 },
  // @ts-ignore
  S: { fractionalSecondDigits: 1 },
  HH: { hour: '2-digit', hour12: false },
  H: { hour: 'numeric', hour12: false },
  h: { hour: 'numeric', hour12: true },
  mm: {},
  m: { minute: 'numeric' },
  ss: {},
  s: { second: 'numeric' },
  a: {}
}