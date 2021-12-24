import options from './options'

const { hma, hmsa, ymd } = options

interface Tokens {
  [key: string]: Intl.DateTimeFormatOptions
}

export const tokens: Tokens = {
  date_short: ymd,
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
