/**********************************************************************
Chinese numberals number parser (simplified)
Author: Robert Roth
Last edited: October 2014
**********************************************************************/

var exceptions = {
  100:'一百', 1000:'一千', 10000:'一万', 100000000:'一亿', 1000000000000:'一兆'};
var numbers = {'negative':'負',
  0: '', 1:'一', 2:'二', 3:'三', 4:'四', 5:'五', 6:'六', 7:'七', 8:'八', 9:'九',
  10:'十',
  100:'百', 1000:'千', 10000:'萬', 100000000:'億', 1000000000000:'兆'};
var zero = '零';

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
