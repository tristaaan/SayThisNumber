/**********************************************************************
Estonian number parser
Author: Valentin Châtelet
Last edited: June 2016
**********************************************************************/

var numbers = {'hasSingle': false, 'conjunction': '', 'negative': 'miinus',
  0:'null', 1:'üks', 2:'kaks', 3:'kolm', 4:'neli', 5:'viis',
  6:'kuus', 7:'seitse', 8:'kaheksa', 9:'üheksa', 10:'kümme',
  11:'üksteist', 12:'kaksteist', 13:'kolmteist', 14:'neliteist', 15: 'viisteist',
  16:'kuusteist', 17:'seitseteist', 18:'kaheksateist', 19:'üheksateist', 20:'kakskümmend',
  30:'kolmkümmend', 40:'nelikümmend', 50:'viiskümmend', 60:'kuuskümmend', 70:'seitsekümmend', 80:'kaheksakümmend', 90:'üheksakümmend', 100:'sada',
  1000: 'tuhat', 1000000:'miljon', 1000000000:'miljard', 1000000000000:'biljon', 1000000000000000:'triljon'};

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
      out = getPlace(n, 0, 10) + ' ' + getPlace(n, 1, 1);
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
