/**********************************************************************
German number parser
Author: Robert Roth
Last edited: October 2014
**********************************************************************/

var exceptions = {1:'eins', 10:'zehn', 11:'elf', 12:'zwölf', 13:'dreizehn', 14:'vierzehn', 15:'fünfzehn', 16:'sechzehn', 17:'siebzehn', 18:'achtzehn', 19:'neunzehn'};
var oneFeminine = 'eine';
var numbers = {'conjunction':'und', 'negative':'minus',
  0: '', 1:'ein', 2:'zwei', 3:'drei', 4:'vier', 5:'fünf', 6:'sechs', 7:'sieben', 8:'acht', 9:'neun',
  10:'zehn', 20:'zwanzig', 30:'dreßig', 40:'vierzig', 50:'fünfzig', 60:'sechzig', 70:'siebzig', 80:'achtzig', 90:'neunzig',
  100:'hundert', 1000:'tausend', 1000000:'Million ', 1000000000:'Millarde ', 1000000000000:'Billion ', 1000000000000000:'Billiarde '};

function rParse(n, maxPlace, feminine) {
  if (feminine && n === 1) return oneFeminine;
  if (n in exceptions) return exceptions[n] + (feminine ? ' ' : '');
  if (n in numbers) return numbers[n] + (feminine ? ' ' : '');
  if (n < 10) return numbers[n];
  if (n < 100) return numbers[n % 10] + numbers.conjunction + numbers[Math.floor(n / 10) * 10] + (feminine ? ' ' : '');
  if (n < 1000) {
    return numbers[Math.floor(n / 100)] + numbers[100] + rParse(n % 100, false) + (feminine ? ' ' : '');
  }
  for (var i = maxPlace; i >= 1000; i /= 1000) {
    var mdivi = Math.floor(n / i);
    if (mdivi > 0) {
      return rParse(mdivi, 100, i > 1000) + numbers[i] + rParse(n % i, i / 1000, false);
    }
  }
}

export default function parseNumber(n) {
  if (n === 0) return 'null';
  if (n > 10000000000000000 - 1) return 'unbound';
  if (n > 1000 && n in numbers) return oneFeminine + ' ' + numbers[n];
  var out = '';

  if (n < 0) {
    n *= -1;
    out = numbers.negative + ' ';
  }
  out = out + rParse(n, 1000000000000000, n > 1000);
  return out.trim();
}
