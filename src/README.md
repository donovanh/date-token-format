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

## Date.toLocaleString

This utility uses the `Date.toLocaleString` method to provide locale support. This means all locales are supported via the browser without the need for any extra locale configuration.

## Formats

The following options, based on [unicode date field symbols](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) can be used to generate a locale-based formatted string.

## Limitations

As this utility makes use of `Date.toLocaleString`, it is not able to support as many options, especially around hours and minutes. Libraries such as [date-fns](http://date-fns.org) might be useful for a wider range of token support, such as 12-hour times without AM/PM, or ordinals such as `1st`, `2nd`, etc.

## ISC License

Copyright 2021 Donovan Hutchinson

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
