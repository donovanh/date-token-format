interface Overrides {
  [key: string]: (date: Date, locale: string) => string
}

export const overrides: Overrides = {
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

function ampmForLocale(date: Date, locale: string): string {
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true }
  const result = date.toLocaleString(locale, options)
  if (locale.startsWith('ar')) {
    return result.split(' ')[1]
  }
  const filtered = result.replace(/(\d{0,2}:\d{0,2})/, '')
  return filtered.trim()
}
