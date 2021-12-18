# Date Token Format

A lightweight (less than 2kB), locale aware formatter for strings containing unicode date tokens.

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

## Formats

The following options, based on [unicode date field symbols](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) can be used to generate a locale-based formatted string.

| token    | description        | example output |
| -------- | ------------------ | -------------- |
| yyyy     | Full year          | 2021           |
| yy       | Short year         | 21             |
| MMMM     | Full month (text)  | August         |
| MMM      | Short month (text) | Aug            |
| MM       | 2-digit month      | 08             |
| M        | Numeric month      | 8              |
| dd       | 2-digit month      | 07             |
| d        | Numeric month      | 7              |
| EEEE     | Full week day      | Friday         |
| EEE      | Short week day     | Fri            |
| EE       | Narrow week day    | F              |
| 'HH:mm'  | 24-hour time       | 08:23          |
| 'h:mm'   | 12-hour time       | 8:23 AM        |
| 'h:mm a' | 12-hour time       | 8:23 AM        |
| HH       | 24-hour hour       | 08             |
| H        | 24-hour hour       | 08             |
| h        | 12-hour hour       | 8 AM           |
| mm       | Minutes            | 03             |
| m        | Minutes            | 03             |
| ss       | Seconds            | 06             |
| s        | Seconds            | 06             |

## Limitations

As this utility makes use of `Date.toLocaleString`, it is not able to support as many options, especially around hours and minutes. Libraries such as [date-fns](http://date-fns.org) might be useful for a wider range of token support, such as 12-hour times without AM/PM, or ordinals such as `1st`, `2nd`, etc.

## Browser support

This utility uses the `Date.toLocaleString` method to provide locale support. This means all locales are supported via the browser without the need for any extra locale configuration.

It is [widely supported](https://caniuse.com/?search=toLocaleString) across all modern and many not-so modern browsers.

To ensure better browser support, options such as `dateStyle` and `timeStyle` are avoided in favour of more specific options.

## ISC License

Copyright 2021 Donovan Hutchinson

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
