# Contributing

Always seeking pull requests for new languages!

## Up and Running

```
git clone https://github.com/tristaaan/SayThisNumber.git
cd SayThisNumber
npm install
npm run start # runs a server at 127.0.0.1:8000
```

When you make changes you'll have to restart the server.

## Adding New Languages

0. Check [the list](https://github.com/tristaaan/SayThisNumber/tree/master/application/parsers) to make sure the language isn't already there.
1. Write your number parser in `application/parsers/` and expose the function `parseNumber` which receives a number and returns the number parsed in the language. Be sure to support negative numbers.
2. Add the language to the `parsers` object in `numberDictionary.js` with [language] as the key and `require('./parsers/[your language]')` as the value.
3. Test it out.
4. Submit a pull request
