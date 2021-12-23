import { formatToken, Presets } from '.'

describe('formatToken', () => {
  const date = new Date('2021-08-27T12:34:56')
  const originalLanguage = window.navigator.language
  let languageGetter

  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get')
  })

  afterEach(() => {
    languageGetter.mockReturnValue(originalLanguage)
  })

  describe('tokens', () => {
    it('should handle no tokens being found', () => {
      expect(formatToken(date, 'foo')).toEqual('No date format tokens found')
    })

    it('should format with a single token', () => {
      const token = 'EEE'
      expect(formatToken(date, token)).toEqual('Fri')
    })

    it('should format with multiple tokens', () => {
      const token = 'EEE dd'
      expect(formatToken(date, token)).toEqual('Fri 27')
    })

    it('should format with multiple tokens including other text', () => {
      const token = 'MMMM, EEEE'
      expect(formatToken(date, token)).toEqual('August, Friday')
    })

    it('should format with more than 9 tokens', () => {
      const token = 'yy yyyy MMMM MMM MM M dd d EEEE EEE EE HH H h mm m ss s a yyyy'
      expect(formatToken(date, token)).toEqual(
        '21 2021 August Aug 08 8 27 27 Friday Fri F 12 12 12 PM 34 34 56 56 PM 2021'
      )
    })
  })

  // Locales
  describe('locales', () => {
    it('should use the browser locale if no locale given', () => {
      languageGetter.mockReturnValue('fr')
      const token = 'EEE'
      expect(formatToken(date, token)).toEqual('ven.')
    })
  
    it('should use the default locale if no browser locale given', () => {
      languageGetter.mockReturnValue(undefined)
      const token = 'EEE'
      expect(formatToken(date, token)).toEqual('Fri')
    })

    it('should format token by locale', () => {
      const token = 'MMMM'
      expect(formatToken(date, token, 'fr-FR')).toEqual('août')
    })

    it('should format multiple tokens by locale', () => {
      const token = 'EEEE dd MMMM'
      expect(formatToken(date, token, 'fr-FR')).toEqual('vendredi 27 août')
    })

    it('should format single digit hours with locale', () => {
      const token = 'h'
      expect(formatToken(new Date('2021-08-27T08:34:56'), token, 'en-GB')).toEqual('8 am')
      expect(formatToken(new Date('2021-08-27T14:34:56'), token, 'en-GB')).toEqual('2 pm')
    })

    it('should format hours with 2 digits by locale', () => {
      const token = 'HH'
      expect(formatToken(new Date('2021-08-27T08:34:06'), token, 'ar')).toEqual('٠٨')
    })

    it('should format seconds with 2 digits by locale', () => {
      const token = 'mm'
      expect(formatToken(new Date('2021-08-27T08:04:06'), token, 'ar')).toEqual('٠٤')
    })

    it('should format seconds with 2 digits by locale', () => {
      const token = 'ss'
      expect(formatToken(new Date('2021-08-27T08:04:06'), token, 'ar')).toEqual('٠٦')
    })
  })  

  // am / pm
  describe('am / pm', () => {
    it('should format am/pm by ko locale', () => {
      const token = 'a'
      expect(formatToken(date, token, 'ko')).toEqual('오후')
    })

    it('should format am/pm by ar locale', () => {
      const token = 'a'
      expect(formatToken(date, token, 'ar')).toEqual('م')
    })

    it('should format am/pm by cn locale', () => {
      const token = 'a'
      expect(formatToken(date, token, 'cn')).toEqual('p.m.')
    })

    it('should format am/pm by af locale', () => {
      const token = 'a'
      expect(formatToken(date, token, 'af')).toEqual('nm.')
    })

    it('should format am/pm by en-GB locale', () => {
      const token = 'a'
      expect(formatToken(date, token, 'en-GB')).toEqual('pm')
    })

    it('should format am/pm by en-GB locale', () => {
      const token = 'a'
      expect(formatToken(date, token, 'bo-CN')).toEqual('ཕྱི་དྲོ་')
    })

    it('should present am/pm am/pm by ja-JP locale', () => {
      const token = 'a'
      expect(formatToken(date, token, 'ja-JP')).toEqual('午後')
    })
  })

  // All the formats
  describe('all formats', () => {
    const allFormatsTestDate = new Date('2021-08-07T02:04:06.789')
    const tokens = {
      date_short: '8/7/2021',
      date_med: 'Aug 7, 2021',
      date_long: 'August 7, 2021',
      date_full: 'Saturday, August 7, 2021',
      time: '2:04 AM',
      time_with_seconds: '2:04:06 AM',
      time_long: '2:04:06.789 AM',
      time_24: '02:04',
      time_24_with_seconds: '02:04:06',
      time_24_long: '02:04:06.789',
      datetime_short: '8/7/2021, 2:04 AM',
      datetime_short_with_seconds: '8/7/2021, 2:04:06 AM',
      datetime_medium: 'Aug 7, 2021, 2:04 AM',
      datetime_medium_with_seconds: 'Aug 7, 2021, 2:04:06 AM',
      datetime_long: 'August 7, 2021, 2:04 AM',
      datetime_long_with_seconds: 'August 7, 2021, 2:04:06 AM',
      datetime_full: 'Saturday, August 7, 2021, 2:04 AM',
      datetime_full_with_seconds: 'Saturday, August 7, 2021, 2:04:06 AM',
      yyyy: '2021',
      yy: '21',
      MMMM: 'August',
      MMM: 'Aug',
      MM: '08',
      M: '8',
      dd: '07',
      d: '7',
      EEEE: 'Saturday',
      EEE: 'Sat',
      EE: 'S',
      'HH:mm': '02:04',
      'h:mm': '2:04 AM',
      'hh:mm a': '2:04 AM',
      'h:mm a': '2:04 AM',
      'HH:mm:ss': '02:04:06',
      'H:mm:ss': '02:04:06',
      'h:mm:ss': '2:04:06 AM',
      'h:mm:ss.SSS': '2:04:06.789 AM',
      'h:mm:ss.SS': '2:04:06.78 AM',
      'h:mm:ss.S': '2:04:06.7 AM',
      HH: '02',
      H: '02',
      h: '2 AM',
      mm: '04',
      m: '4',
      ss: '06',
      s: '6',
      SSS: '789',
      SS: '78',
      S: '7',
      a: 'AM'
    }

    for (const [token, expectedValue] of Object.entries(tokens)) {
      it(`should format ${token}`, () => {
        expect(formatToken(allFormatsTestDate, token)).toEqual(expectedValue)
      })
    }
  })

  describe('presets', () => {
    it('should handle preset date', () => {
      expect(formatToken(date, Presets.DATE_SHORT)).toEqual('8/27/2021')
    })

    it('should handle preset time', () => {
      expect(formatToken(date, Presets.TIME)).toEqual('12:34 PM')
    })

    it('should handle preset datetime', () => {
      expect(formatToken(date, Presets.DATETIME_SHORT)).toEqual('8/27/2021, 12:34 PM')
    })
  })
})
