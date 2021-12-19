interface Tokens {
  [key: string]: Intl.DateTimeFormatOptions
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
  'HH:mm:ss': { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false },
  'H:mm:ss': { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false },
  'h:mm:ss': { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true },
  'hh:mm a': { hour: 'numeric', minute: 'numeric', hour12: true },
  'HH:mm': { hour: 'numeric', minute: 'numeric', hour12: false },
  'h:mm a': { hour: 'numeric', minute: 'numeric', hour12: true },
  'h:mm': { hour: 'numeric', minute: 'numeric', hour12: true },
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
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true }
  const fallback = date.toLocaleString('en-US', options).split(' ')[1]
  const result = date.toLocaleString(locale, options)
  const filtered = result.replace(/([^\s-]*[^\s-]:[^\s-][^\s-])/, '')
  return filtered && filtered.trim().length ? filtered.trim() : fallback
}

const overrides: Overrides = {
  mm: (date, locale) => {
    const minute = date.toLocaleString(locale, { minute: '2-digit' })
    return ('0' + minute).slice(-2)
  },
  ss: (date, locale) => {
    const minute = date.toLocaleString(locale, { second: '2-digit' })
    return ('0' + minute).slice(-2)
  },
  a: ampmForLocale
}

type ProcessDateFn = (date: Date, options: Intl.DateTimeFormatOptions, locale: string) => string

const processDate: ProcessDateFn = (date: Date, options: Intl.DateTimeFormatOptions, locale: string) =>
  date.toLocaleString(locale, options)

interface Matches {
  [key: string]: string
}

export const formatToken = (date: Date, format: string, locale = 'en-US'): string => {
  let updatedFormatStr = format
  const replacements: Matches = {}
  let matchNumber = 0
  for (const tokenKey of Object.keys(tokens)) {
    const regex = new RegExp(tokenKey, 'g')
    const matches = updatedFormatStr.match(regex)
    if (matches) {
      const matchKey = `_${++matchNumber}`
      updatedFormatStr = updatedFormatStr.replace(regex, matchKey)
      replacements[matchKey] = tokenKey
    }
  }

  if (!matchNumber) {
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
