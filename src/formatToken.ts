import { tokens } from './tokens'
import { overrides } from './overrides'

type ProcessDateFn = (date: Date, options: Intl.DateTimeFormatOptions, locale: string) => string

const processDate: ProcessDateFn = (date: Date, options: Intl.DateTimeFormatOptions, locale: string) =>
  date.toLocaleString(locale, options)

export const formatToken = (date: Date, format: string, localeOverride?: string): string => {
  const locale = localeOverride ? localeOverride : window ? window.navigator.language : 'en-US'
  let updatedFormatStr = format
  const replacements: { [key: string]: string } = {}
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
