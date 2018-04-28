# Contributing

Always seeking pull requests for new languages!

## Getting started

```
git clone https://github.com/tristaaan/SayThisNumber.git
cd SayThisNumber
npm install
```

## Adding new languages

Step 0: Check the parsers list to make sure the language isn't already there.

1. Write your number parser in `src/parsers/` and export your parse function which takes a number and returns the number parsed in the language. Be sure to support negative numbers and follow the ESLint rules.
2. Add the parser to `languages.js` with [language] as the key. Keep this list alphabetical.
3. Test it out, write tests if desired.
4. Add your name to the [authors list](AUTHORS).
5. Submit a pull request.