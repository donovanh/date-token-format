import { formatToken } from '.';

describe('formatToken', () => {
  const date = new Date('2021-08-27T12:34:56');

  it('should handle no tokens being found', () => {
    expect(formatToken(date, 'foo')).toEqual('No date format tokens found');
  });

  it('should format with a single token', () => {
    const token = 'EEE';
    expect(formatToken(date, token)).toEqual('Fri');
  });

  it('should format with multiple tokens', () => {
    const token = 'EEE dd';
    expect(formatToken(date, token)).toEqual('Fri 27');
  });

  it('should format with multiple tokens including other text', () => {
    const token = 'MMMM, EEEE';
    expect(formatToken(date, token)).toEqual('August, Friday');
  });

  // Times

  it('should format 24-hour hours', () => {
    expect(formatToken(new Date('2021-08-27T08:34:56'), 'HH')).toEqual('08');
    expect(formatToken(new Date('2021-08-27T08:34:56'), 'H')).toEqual('08');
  });

  it('should format single digit hours', () => {
    const token = 'h';
    expect(formatToken(new Date('2021-08-27T08:34:56'), token)).toEqual('8 AM');
    expect(formatToken(new Date('2021-08-27T14:34:56'), token)).toEqual('2 PM');
  });

  it('should format 24-hour time (HH:mm)', () => {
    const token = 'HH:mm';
    expect(formatToken(new Date('2021-08-27T08:34:56'), token)).toEqual('08:34');
  });

  it('should format 12-hour time (h:mm)', () => {
    const token = 'h:mm';
    expect(formatToken(date, token)).toEqual('12:34 PM');
  });

  it('should format 12-hour time with AM/PM specified (h:mm a)', () => {
    const token = 'h:mm';
    expect(formatToken(date, token)).toEqual('12:34 PM');
  });

  it('should format minutes, 2-digit', () => {
    const token = 'mm';
    expect(formatToken(new Date('2021-08-27T08:04:56'), token)).toEqual('4'); // A bug in Date.toLocaleString? Should be 04
  });

  it('should format minutes, 2-digit', () => {
    const token = 'm';
    expect(formatToken(new Date('2021-08-27T08:04:56'), token)).toEqual('4');
  });

  // Locales

  it('should format token by locale', () => {
    const token = 'MMMM';
    expect(formatToken(date, token, 'fr-FR')).toEqual('août');
  });

  it('should format multiple tokens by locale', () => {
    const token = 'EEEE dd MMMM';
    expect(formatToken(date, token, 'fr-FR')).toEqual('vendredi 27 août');
  });

  it('should format single digit hours with locale', () => {
    const token = 'h';
    expect(formatToken(new Date('2021-08-27T08:34:56'), token, 'en-GB')).toEqual('8 am');
    expect(formatToken(new Date('2021-08-27T14:34:56'), token, 'en-GB')).toEqual('2 pm');
  });
});
