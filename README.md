# SayThisNumber
Parses raw numbers into a human language.

## Usage

```js
import say from 'SayThisNumber';
say.thisNumber(37).in('english'); // => 'thirty seven'
say.thisNumber(52).in('russian'); // => пятьдесят два'
```

Ranges:

```js
import say from 'SayThisNumber';
say.thisNumberRange(3,1).in('spanish'); // => [ 'tres', 'dos', 'uno', '🚀' ]
```

Multiple numbers:

```js
import say from 'SayThisNumber';
say.theseNumbers([33, 91]).in('icelandic') // => [ 'þrettán', 'níutíu og sjö' ]
```

In the browser there is an exposed `say` object with the same API.

## Adding New Languages

Always seeking pull requests for new languages!

1. Write your number parser in `src/parsers/` and export your parse function which takes a number and returns the number parsed in the language. Be sure to support negative numbers and follow the ESLint rules..
2. Add the parser to `languages.js` with [language] as the key. Keep this list alphabetical.
3. Test it out.
4. Add your name to the [authors list](AUTHORS).
5. Submit a pull request.


## Supported Languages

[List of parsers](https://github.com/tristaaan/SayThisNumber/tree/master/src/parsers).

## License

MIT
