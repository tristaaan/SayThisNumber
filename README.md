# Say This Number
Parses raw numbers into a human language.

## Usage

```bash
git clone https://github.com/tristaaan/SayThisNumber.git
cd SayThisNumber
npm install
npm run start # runs a server at 127.0.0.1:8000
```

The service also supports a basic API through POST requests.
```bash
curl -X POST curl -X POST localhost:8000/english/12
```

Outputs:
```json
{
  "language": "english",
  "number": 12,
  "parsedNumber": "twelve"
}
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
