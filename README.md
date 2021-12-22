# Date Token Format

A lightweight (~2kB), locale-aware formatter for strings containing unicode date tokens.

![Test coverage](https://badgen.net/badge/coverage/100%25/green) [![Minimised code size](https://badgen.net/bundlephobia/min/date-token-format)](https://bundlephobia.com/package/date-token-format) ![Types included](https://badgen.net/npm/types/date-token-format) ![License: ISC](https://badgen.net/npm/license/date-token-format)

## Usage

Install the package using:

```
yarn add date-token-format
```

Import it to your project:

```
import { formatToken } from "date-token-format"
```

Then the `formatToken` method can be used to format a date to produce a string.

```
formatToken(date: Date, format: string, locale?: string)
```

The `date` object should be a valid JavaScript date. The `format` string should contain one or more formats, and the optional `locale` string is a [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)-compatible locale code such as `en-US` or `fr`.

## Example usage: formatToken

```
const date = new Date('2021-08-27T12:34:56')
formatToken(date, 'EEEE', 'en-US')
//=> Friday

formatToken(date, 'EEEE', 'de')
//=> Freitag
```

Auto-detecting browser locale:

```
const locale = window.navigator.userLanguage || window.navigator.language
const date = new Date('2021-08-27T12:34:56')
formatToken(date, 'EEEE', locale)
//=> weekday in the browser's locale
```

## Formats

The following options, based on [unicode date field symbols](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) can be used to generate a locale-based formatted string.

| Category          | Token    | Example output |
| ----------------- | -------- | -------------- |
| Year              | yyyy     | 2021           |
|                   | yy       | 21             |
| Month             | MMMM     | August         |
|                   | MMM      | Aug            |
|                   | MM       | 08             |
|                   | M        | 8              |
| Day (numeric)     | dd       | 07             |
|                   | d        | 7              |
| Week day          | EEEE     | Friday         |
|                   | EEE      | Fri            |
|                   | EE       | F              |
| Hour (24)         | HH       | 08             |
|                   | H        | 08             |
| Hour (12)         | h        | 8 AM           |
| Minute            | mm       | 03             |
|                   | m        | 3              |
| Second            | ss       | 06             |
|                   | s        | 6              |
| Fractional second | SSS      | 789            |
|                   | SS       | 78             |
|                   | S        | 7              |
| AM/PM             | a        | AM             |

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
