import options from './options'

const { hm, hma, hms, hmsa, ymd, ymdMed, ymdLong, ymdFull } = options

interface PresetsType {
  DATE_SHORT: Intl.DateTimeFormatOptions
  DATE_MEDIUM: Intl.DateTimeFormatOptions
  DATE_LONG: Intl.DateTimeFormatOptions
  DATE_FULL: Intl.DateTimeFormatOptions
  TIME: Intl.DateTimeFormatOptions
  TIME_WITH_SECONDS: Intl.DateTimeFormatOptions
  TIME_LONG: Intl.DateTimeFormatOptions
  TIME_24: Intl.DateTimeFormatOptions
  TIME_24_WITH_SECONDS: Intl.DateTimeFormatOptions
  TIME_24_LONG: Intl.DateTimeFormatOptions
  DATETIME_SHORT: Intl.DateTimeFormatOptions
  DATETIME_SHORT_WITH_SECONDS: Intl.DateTimeFormatOptions
  DATETIME_MEDIUM: Intl.DateTimeFormatOptions
  DATETIME_MEDIUM_WITH_SECONDS: Intl.DateTimeFormatOptions
  DATETIME_LONG: Intl.DateTimeFormatOptions
  DATETIME_LONG_WITH_SECONDS: Intl.DateTimeFormatOptions
  DATETIME_FULL: Intl.DateTimeFormatOptions
  DATETIME_FULL_WITH_SECONDS: Intl.DateTimeFormatOptions
}

export const Presets: PresetsType = {
  DATE_SHORT: ymd,
  DATE_MEDIUM: ymdMed,
  DATE_LONG: ymdLong,
  DATE_FULL: ymdFull,
  TIME: hma,
  TIME_WITH_SECONDS: hmsa,
  // @ts-ignore
  TIME_LONG: { ...hmsa, fractionalSecondDigits: 3 },
  TIME_24: { ...hm, hour12: false },
  TIME_24_WITH_SECONDS: { ...hmsa, hour12: false },
  // @ts-ignore
  TIME_24_LONG: { ...hms, fractionalSecondDigits: 3, hour12: false },
  DATETIME_SHORT: { ...ymd, ...hm },
  DATETIME_SHORT_WITH_SECONDS: { ...ymd, ...hms },
  DATETIME_MEDIUM: { ...ymdMed, ...hm },
  DATETIME_MEDIUM_WITH_SECONDS: { ...ymdMed, ...hms },
  DATETIME_LONG: { ...ymdLong, ...hm },
  DATETIME_LONG_WITH_SECONDS: { ...ymdLong, ...hms },
  DATETIME_FULL: { ...ymdFull, ...hm },
  DATETIME_FULL_WITH_SECONDS: { ...ymdFull, ...hms }
}
