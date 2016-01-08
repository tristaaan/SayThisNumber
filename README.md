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

0. Check [the list](https://github.com/tristaaan/SayThisNumber/tree/master/application/parsers) to make sure the language isn't already there.
1. Write your number parser in `application/parsers/` and expose the function `parseNumber` which recieves a number and returns the number parsed in the language. Be sure to support negative numbers.
2. Add the language to the `parsers` object in `numberDictionary.js` with [language] as the key and `require('./parsers/[your language]')` as the value.
3. Test it out.
4. Submit a pull request

##Supported Languages

[List of parsers](https://github.com/tristaaan/SayThisNumber/tree/master/application/parsers).
