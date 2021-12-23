interface Tokens {
  [key: string]: Intl.DateTimeFormatOptions
}

const hma: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true }
const hmsa: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }

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
  // @ts-ignore
  'h:mm:ss.SSS': { ...hmsa, fractionalSecondDigits: 3 },
  // @ts-ignore
  'h:mm:ss.SS': { ...hmsa, fractionalSecondDigits: 2 },
  // @ts-ignore
  'h:mm:ss.S': { ...hmsa, fractionalSecondDigits: 1 },
  'h:mm:ss': { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true },
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

interface Overrides {
  [key: string]: (date: Date, locale: string) => string
}

const ampmForLocale = (date: Date, locale: string): string => {
  const options: Intl.DateTimeFormatOptions = hma
  const result = date.toLocaleString(locale, options)
  if (locale.startsWith('ar')) {
    return result.split(' ')[1]
  }
  const filtered = result.replace(/(\d{0,2}:\d{0,2})/, '')
  return filtered.trim()
}

const overrides: Overrides = {
  mm: (date, locale) => {
    const minute = date.toLocaleString('en-US', { minute: '2-digit' })
    return new Intl.NumberFormat(locale, {
      minimumIntegerDigits: 2
    }).format(+minute)
  },
  ss: (date, locale) => {
    const second = date.toLocaleString('en-US', { second: '2-digit' })
    return new Intl.NumberFormat(locale, {
      minimumIntegerDigits: 2
    }).format(+second)
  },
  a: ampmForLocale
}

type ProcessDateFn = (date: Date, options: Intl.DateTimeFormatOptions, locale: string) => string

const processDate: ProcessDateFn = (date: Date, options: Intl.DateTimeFormatOptions, locale: string) =>
  date.toLocaleString(locale, options)

interface Matches {
  [key: string]: string
}

export const formatToken = (date: Date, format: string, localeOverride?: string): string => {
  const locale = localeOverride || window.navigator.language || 'en-US'
  let updatedFormatStr = format
  const replacements: Matches = {}
  let matchNumber = 10 // Starting with 2 digits to handle more than 9 matches
  for (const tokenKey of Object.keys(tokens)) {
    const regex = new RegExp(tokenKey, 'g')
    const matches = updatedFormatStr.match(regex)
    if (matches) {
      const matchKey = `_${++matchNumber}`
      updatedFormatStr = updatedFormatStr.replace(regex, matchKey)
      replacements[matchKey] = tokenKey
    }
  }

  if (matchNumber === 10) {
    return 'No date format tokens found'
  }

  for (const [key, tokenKey] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g')
    let replacement
    if (overrides[tokenKey]) {
      replacement = overrides[tokenKey](date, locale)
    } else {
      replacement = processDate(date, tokens[tokenKey], locale)
    }
    updatedFormatStr = updatedFormatStr.replace(regex, replacement)
  }
  return updatedFormatStr
}
