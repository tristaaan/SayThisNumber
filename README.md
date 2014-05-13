#How Do I Say This Number
Parses numbers to a human language.

##Requirements
Available via npm.
 - mime
 - jade

##Usage
Run `node index.js` and go to `127.0.0.1:8181`, a basic page with instructions is there. The service also supports a basic cURL API.

##Adding New Languages
1. Write your number parser and expose the function `parseNumber` which recieves a number and returns the number parsed in that language. Make sure to support negative numbers in the new language.
2. Add the language to the `parsers` object in `numberDictionary.js` with the [your language] name as the key and `require('./parsers/[your language]')` as the value.
3. Restart the server and try it out by going to `127.0.0.1:8181/[your langauge]/123`!

##Supported Languages

- English (American)
- Spanish
- Japanese (transliterated)
