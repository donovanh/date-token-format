import { tokens } from './lib/tokens'
import { overrides } from './lib/overrides'

function processDate(
  date: Date,
  options: Intl.DateTimeFormatOptions,
  locale: string,
  timeZoneName?: 'long' | 'short'
): string {
  return date.toLocaleString(locale, { ...options, timeZoneName })
}

function findReplacementsAndFormat(formatStr: string): {
  replacements: {
    [key: string]: string
  }
  mappingStr: string
} {
  let matchNumber = 10 // Starting with 2 digits to handle more than 9 matches
  let mappingStr: string = formatStr
  const replacements: {
    [key: string]: string
  } = {}
  for (const tokenKey of Object.keys(tokens)) {
    const regex = new RegExp(tokenKey, 'g')
    const matches = mappingStr.match(regex)
    if (matches) {
      const matchKey = `_${++matchNumber}`
      mappingStr = mappingStr.replace(regex, matchKey)
      replacements[matchKey] = tokenKey
    }
  }
  return {
    replacements,
    mappingStr
  }
}

function processReplacements(
  dateObj: Date,
  replacements: { [key: string]: string },
  mappingStr: string,
  locale: string,
  timeZoneName?: 'long' | 'short'
) {
  for (const [key, tokenKey] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g')
    let replacement
    if (overrides[tokenKey]) {
      replacement = overrides[tokenKey](dateObj, locale)
    } else {
      replacement = processDate(dateObj, tokens[tokenKey], locale, timeZoneName)
    }
    mappingStr = mappingStr.replace(regex, replacement)
  }
  return mappingStr
}

function processTokenString(dateObj: Date, formatStr: string, locale: string, timeZoneName?: 'long' | 'short'): string {
  const result = findReplacementsAndFormat(formatStr)
  const { replacements, mappingStr } = result

  if (!Object.keys(replacements).length) {
    return 'No date format tokens found'
  }

  return processReplacements(dateObj, replacements, mappingStr, locale, timeZoneName)
}

type Format = (
  date: string | Date,
  formatting: string | Intl.DateTimeFormatOptions,
  localeOverride?: string,
  timeZoneName?: 'long' | 'short'
) => string

export const format: Format = (date, formatting = 'date_short', localeOverride, timeZoneName) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const locale = localeOverride ? localeOverride : typeof window !== 'undefined' ? window.navigator.language : 'en-US'
  if (typeof formatting === 'string') {
    return processTokenString(dateObj, formatting, locale, timeZoneName)
  }
  // Not a string, parse as DateTimeFormatOptions object
  return processDate(dateObj, formatting, locale, timeZoneName)
}

// Legacy
export const formatToken: Format = (date, formatting, localeOverride, timeZoneName) =>
  format(date, formatting, localeOverride, timeZoneName)
