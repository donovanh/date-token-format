# Date Token Format

A tiny (~4kB before gzip), locale-aware format function for dates, using unicode date tokens to format the returned string along with localized preset formats.

![Test coverage](https://badgen.net/badge/coverage/100%25/green) [![Minimised code size](https://badgen.net/bundlephobia/min/date-token-format)](https://bundlephobia.com/package/date-token-format) ![Types included](https://badgen.net/npm/types/date-token-format) ![License: ISC](https://badgen.net/npm/license/date-token-format)

## Usage

```js
yarn add date-token-format
```

```js
import { format, Presets } from "date-token-format"
```

The `format` method takes a `Date` object and returns a formatted date `string`.

```js
format(
  date: Date,
  format?: string,
  locale?: string,
  timeZoneName?: 'short' | 'long'
)
```

The `date` object should be a valid JavaScript date. The `format` string should contain one or more unicode tokens, or a `Preset`, and the optional `locale` string is a [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)-compatible locale code such as `en-US` or `fr`.

## Examples

```js
// Using preset formats

const date = new Date('2021-08-27T12:34:56')

format(date, Presets.DATETIME_FULL, 'en-US')
//=> Friday, August 27, 2021, 12:34 PM

format(date, Presets.DATETIME_FULL, 'ja-JP')
//=> 2021 年 8 月 7 日土曜日 12:34

// Using format strings

format(date, 'EEEE', 'en-US')
//=> Friday

format(date, 'EEEE', 'de')
//=> Freitag

format(date, 'EEEE') // No locale, defaults to browser's langauge setting
//=> Friday

// Optional timezone name

format(date, 'h:mm', 'en-US', 'short')
// => 2:34 PM, GMT-5

format(date, 'h:mm', 'en-US', 'long')
// => 2:34 PM, Eastern Standard Time
```

## Date / Time Formats

As well as formatting tokens, you can also specify date and time formats. These will adapt to the given locale, based on locale and browser interpretation.

```js
const date = new Date('2021-08-27T12:34:56')
import { format, Presets } from 'date-token-format'
format(date, Presets.DATE_SHORT, 'en-US')
//=> 8/27/2021
```

| Preset                       | Output (en-US)                       | Output (ja-JP)                  |
| ---------------------------- | ------------------------------------ | ------------------------------- |
| DATE_SHORT                   | 8/27/2021                            | 2021/8/7                        |
| DATE_MEDIUM                  | Aug 7, 2021                          | 2021 年 8 月 7 日               |
| DATE_LONG                    | August 7, 2021                       | 2021 年 8 月 7 日               |
| DATE_FULL                    | Saturday, August 7, 2021             | 2021 年 8 月 7 日土曜日         |
| TIME                         | 2:04 AM                              | 午前 2:04                       |
| TIME_WITH_SECONDS            | 2:04:06 AM                           | 午前 2:04:06                    |
| TIME_LONG                    | 2:04:06.789 AM                       | 午前 2:04:06.789                |
| TIME_24                      | 02:04                                | 2:04                            |
| TIME_24_WITH_SECONDS         | 02:04:06                             | 2:04:06                         |
| TIME_24_LONG                 | 02:04:06.789                         | 2:04:06.789                     |
| DATETIME_SHORT               | 8/7/2021, 2:04 AM                    | 2021/8/7 2:04                   |
| DATETIME_SHORT_WITH_SECONDS  | 8/7/2021, 2:04:06 AM                 | 2021/8/7 2:04:06                |
| DATETIME_MEDIUM              | Aug 7, 2021, 2:04 AM                 | 2021 年 8 月 7 日 2:04          |
| DATETIME_MEDIUM_WITH_SECONDS | Aug 7, 2021, 2:04:06 AM              | 2021 年 8 月 7 日 2:04:06       |
| DATETIME_LONG                | August 7, 2021, 2:04 AM              | 2021 年 8 月 7 日 2:04          |
| DATETIME_LONG_WITH_SECONDS   | August 7, 2021, 2:04:06 AM           | 2021 年 8 月 7 日 2:04:06       |
| DATETIME_FULL                | Saturday, August 7, 2021, 2:04 AM    | 2021 年 8 月 7 日土曜日 2:04    |
| DATETIME_FULL_WITH_SECONDS   | Saturday, August 7, 2021, 2:04:06 AM | 2021 年 8 月 7 日土曜日 2:04:06 |

## Unicode tokens

The following options, based on [unicode date field symbols](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) can be used to generate a locale-based formatted string.

| Category          | Token | Output (en-US) | Output (ja-JP) |
| ----------------- | ----- | -------------- | -------------- |
| Year              | yyyy  | 2021           | 2021 年        |
|                   | yy    | 21             | 21 年          |
| Month             | MMMM  | August         | 8 月           |
|                   | MMM   | Aug            | 8 月           |
|                   | MM    | 08             | 08 月          |
|                   | M     | 8              | 8 月           |
| Day (numeric)     | dd    | 07             | 07 日          |
|                   | d     | 7              | 7 日           |
| Week day          | EEEE  | Friday         | 金曜日         |
|                   | EEE   | Fri            | 金             |
|                   | EE    | F              | 金             |
| Hour (24)         | HH    | 08             | 08 時          |
|                   | H     | 08             | 08 時          |
| Hour (12)         | h     | 8 AM           | 午前 8 時      |
| Minute            | mm    | 03             | 03             |
|                   | m     | 3              | 3              |
| Second            | ss    | 06             | 06             |
|                   | s     | 6              | 6              |
| Fractional second | SSS   | 789            | 789            |
|                   | SS    | 78             | 78             |
|                   | S     | 7              | 7              |
| AM/PM             | a     | AM             | 午前           |

## Showing Time Zone (optional)

If you want to add a time zone string to the result, set the optional `timeZoneName` value to `short` or `long`. 

By default no time zone is shown.

```js
format(date, 'h:mm', 'en-US', 'short')
// => 2:34 PM, GMT - 5

format(date, 'h:mm', 'en-US', 'long')
// => 2:34 PM, , Eastern Standard Time
```

## Browser support

![Chrome 24+](https://badgen.net/badge/icon/24%2b?icon=chrome&label=chrome&color=green) ![IE 11](https://badgen.net/badge/icon/11%2b?icon=windows&label=ie&color=green) ![Edge 11](https://badgen.net/badge/icon/12%2b?icon=windows&label=edge&color=green) ![Safari 10+](https://badgen.net/badge/icon/10%2b?icon=apple&label=safari&color=green) ![Firefox 29+](https://badgen.net/badge/icon/29%2b?icon=firefox&label=firefox&color=green)

This utility uses the `toLocaleString` method to provide locale support. This means all locales are supported via the browser without the need for any extra locale configuration.

It is [widely supported](https://caniuse.com/?search=toLocaleString) across all modern and many not-so-modern browsers.

To ensure better browser support, options such as `dateStyle` and `timeStyle` are avoided in favour of more specific options.

## Limitations

As this utility makes use of `toLocaleString`, it is not able to support as many options as you might find in libraries such as [date-fns](http://date-fns.org), such as international support for `ordinals`.

Be aware of potential clashing token letters. For example, if you use `s` in your format, it will be converted into seconds. This version does not yet include a method for excluding parts of format strings from being processed.

## ISC License

Copyright 2021 Donovan Hutchinson

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
