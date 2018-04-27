# Say This Number
Parses raw numbers into a human language.

## Usage

```js
import sayThisNumber from 'SayThisNumber';
sayThisNumber(37).in('english'); // => 'thirty seven'
sayThisNumber(52).in('russian'); // => пятьдесят два'
```

Ranges:

```js
import sayNumberRange from 'SayThisNumber';
sayNumberRange(3,1).in('spanish'); // => [ 'tres', 'dos', 'uno', '🚀' ]
```

Multiple numbers:

```js
import sayTheseNumbers from 'SayThisNumber';
sayTheseNumbers([33, 91]).in('icelandic') // => [ 'þrettán', 'níutíu og sjö' ]
```

## Adding New Languages

Always seeking pull requests for new languages!

1. Write your number parser in `src/parsers/` and export your parse function which takes a number and returns the number parsed in the language. Be sure to support negative numbers.
2. Add the parser to `languages.js` with [language] as the key. Keep this list alphabetical.
3. Test it out.
4. Add your name to the [authors list](AUTHORS).
5. Submit a pull request.


## Supported Languages

[List of parsers](https://github.com/tristaaan/SayThisNumber/tree/master/src/parsers).

## License

MIT
