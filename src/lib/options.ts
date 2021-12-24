const hm: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' }
const hma: Intl.DateTimeFormatOptions = { ...hm, hour12: true }
const hms: Intl.DateTimeFormatOptions = { ...hm, second: 'numeric' }
const hmsa: Intl.DateTimeFormatOptions = { ...hms, hour12: true }
const yd: Intl.DateTimeFormatOptions = { year: 'numeric', day: 'numeric' }
const ymd: Intl.DateTimeFormatOptions = { ...yd, month: 'numeric' }
const ymdMed: Intl.DateTimeFormatOptions = { ...yd, month: 'short' }
const ymdLong: Intl.DateTimeFormatOptions = { ...yd, month: 'long' }
const ymdFull: Intl.DateTimeFormatOptions = { ...yd, month: 'long', weekday: 'long' }

type Options = {
  [key: string]: Intl.DateTimeFormatOptions
}

const options: Options = {
  hm,
  hma,
  hms,
  hmsa,
  yd,
  ymd,
  ymdMed,
  ymdLong,
  ymdFull
}

export default { ...options }
