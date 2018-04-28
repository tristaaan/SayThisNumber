/**********************************************************************
Norwegian number parser
Author: Tristan Wright
Last edited: September 2014
**********************************************************************/

var numbers = {'hasSingle': false, 'conjunction': 'og', 'negative': 'negativ',
  0:'null', 1:'en', 2:'to', 3:'tre', 4:'fire', 5:'fem',
  6:'seks', 7:'syv', 8:'åtte', 9:'ni', 10:'ti',
  11:'elleve', 12:'tolv', 13:'tretten', 14:'fjorten', 15: 'femten',
  16:'sexten', 17:'sytten', 18:'atten', 19:'niten', 20:'tjue',
  30:'tretti', 40:'førti', 50:'femti', 60:'seksti', 70:'sytti', 80:'åtti', 90:'nitti', 100:'hundre',
  1000: 'tusen', 1000000:'million', 1000000000:'milliard'};

/*   Function: getPlace
   Return the parsed value of a number in a certain position
   in the target language. For example, if n = 123,
   getPlace(n, 1, 10) will return the equivalent of "twenty"
   in the target language, and getPlace(n, 1, 1) will return
   the equivalent of "two" in the target language. */

function getPlace(n, which, scale) {
  return numbers[parseInt(n.toString()[which]) * scale];
}

function parse10s(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace(n, 0, 10);
    } else {
      out = getPlace(n, 0, 10) + getPlace(n, 1, 1);
    }
  }
  return out;
}

function parse100s(n) {
  var out = '';
  if (n % 100 === 0) {
    out = getPlace(n, 0, 1) + ' ' + numbers[100];
  } else {
    out = getPlace(n, 0, 1) + ' ' + numbers[100] + ' ' + numbers.conjunction + ' ' + parse10s(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers.hasSingle) {
      piece = andSingle(piece);
    } else {
      piece = parseNumber(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber(nStr.substr(0, 3)) + ' ' + numbers[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle(n) {
  return numbers.conjunction + ' ' + parseNumber(n);
}

export default function parseNumber(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s(n, false);
  } else if (n < 1000) {
    out = parse100s(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers.negative + ' ' + out;
  }

  return out.trim();
}
