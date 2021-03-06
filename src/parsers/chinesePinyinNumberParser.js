/**********************************************************************
Chinese numberals number parser (simplified)
Author: Robert Roth
Last edited: October 2014
**********************************************************************/

var exceptions = {
  100:'yībǎi', 1000:'yīqiān', 10000:'yīwàn', 100000000:'yīyì', 1000000000000:'yīzhào'};
var numbers = {'negative':'fù',
  0: '', 1:'yī', 2:' èr', 3:'sān', 4:'sì', 5:'wǔ', 6:'liù', 7:'qī', 8:'bā', 9:'jiǔ',
  10:'shí',
  100:'bǎi', 1000:'qiān', 10000:'wàn', 100000000:'yì', 1000000000000:'zhào'};
var zero = 'líng';

function rParse(n, maxPlace) {
  if (n in exceptions) return exceptions[n];
  if (maxPlace === 1 || n in numbers) return numbers[n];
  for (var i = maxPlace; i >= 1; i /= 10) {
    if (i in numbers) {
      var ndivi = Math.floor(n / i);
      if (ndivi > 0) {
        var nmodi = n % i;
        var next = i / 10;

        return (
          rParse(ndivi, maxPlace / i) +
          numbers[i] +
          ((nmodi !== 0 && next > nmodi) ? zero : '') +
          ((nmodi === 10) ? numbers[1] + numbers[10] : rParse(nmodi, i))
        );
      }
    }
  }
}

export default function parseNumber(n) {
  if (n === 0) return zero;
  if (n > 10000000000000000 - 1) return 'unbound';
  var out = '';

  if (n < 0) {
    n *= -1;
    out = numbers.negative;
  }
  if (n > 9 && n < 20) return out + numbers[10] + numbers[n % 10];

  out = out + rParse(n, 1000000000000000);
  return out.trim();
}
