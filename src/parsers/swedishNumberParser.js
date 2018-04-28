
var numbers = {'hasSingle': true, 'conjunction': '', 'negative': 'minus',
  0:'noll', 1:'ett', 2:'två', 3:'tre', 4:'fyra', 5:'fem',
  6:'sex', 7:'sju', 8:'åtta', 9:'nio', 10:'tio',
  11:'elva', 12:'tolv', 13:'tretton', 14:'fjorton', 15: 'femton',
  16:'sexton', 17:'sjutton', 18:'arton', 19:'nitton', 20:'tjugo',
  30:'trettio', 40:'fyrtio', 50:'femtio', 60:'sextio', 70:'sjuttio', 80:'åttio', 90:'nittio', 100:'hundra',
  1000: 'tusen', 1000000:'miljon', 1000000000:'miljard', 1000000000000:'biljon', 1000000000000000:'biljard'};

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
    out = getPlace(n, 0, 1) + numbers[100];
  } else {
    out = getPlace(n, 0, 1) + numbers[100] + numbers.conjunction + parse10s(parseInt(n.toString().substr(1, 2)), true);
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

    out = piece + (ctr >= 3 ? numbers[Math.pow(10, ctr)] : '') + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber(nStr.substr(0, 3)) + numbers[Math.pow(10, ctr)] + out;
  return out;
}

function andSingle(n) {
  return numbers.conjunction + parseNumber(n);
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
