
var numbers = {'hasSingle': true, 'conjunction': 'en', 'conjunctionDieresis': 'ën', 'negative': 'min',
  0:'nul', 1:'een', 2:'twee', 3:'drie', 4:'vier', 5:'vijf',
  6:'zes', 7:'zeven', 8:'acht', 9:'negen', 10:'tien',
  11:'elf', 12:'twaalf', 13:'dertien', 14:'veertien', 15: 'vijftien',
  16:'zestien', 17:'zeventien', 18:'achtien', 19:'negentien', 20:'twintig',
  30:'dertig', 40:'veertig', 50:'vijftig', 60:'zestig', 70:'zeventig', 80:'tacht', 90:'negentig', 100:'honderd',
  1000: 'duizend', 1000000:'miljoen', 1000000000:'miljard', 1000000000000:'biljoen', 1000000000000000:'biljard'};

/*   Function: getPlace
   Return the parsed value of a number in a certain position
   in the target language. For example, if n = 123,
   getPlace(n, 1, 10) will return the equivalent of "twenty"
   in the target language, and getPlace(n, 1, 1) will return
   the equivalent of "two" in the target language. */

function getPlace(n, which, scale){
  return numbers[parseInt(n.toString()[which])*scale];
}

function parse10s(n, ignore0){
  var out = '', lastNumber;
  if (n == 0 && ignore0){
    out = '';
  }
  else if (n <= 20){
    out = numbers[n];
  }
  else{
    if (n % 10 == 0){
      out = getPlace(n,0,10);
    }
    else{
      lastNumber = (String(n).split('')[1]);
      out = getPlace(n,1,1) + ("23".indexOf(lastNumber) >= 0 ? numbers.conjunctionDieresis : numbers.conjunction) + getPlace(n,0,10);
    }
  }
  return out;
}

function parse100s(n){
  var out = '', hundredsName, stringNumber = String(n).split('');
  hundredsName = (stringNumber[0] === '1' ? '': getPlace(n, 0, 1)) + numbers[100];

  if (n % 100 == 0){
    out = hundredsName;
  }
  else{
    out = hundredsName + (stringNumber[1] === '0' ? numbers.conjunction : '') + parse10s(parseInt(n.toString().substr(1,2)), true);
  }

  return out;
}


function parse1000s(n){
  var out = '', firstSet = parseInt(n.toString().substr(0,2));

  if (n % 1000 == 0){
    out = getPlace(n,0,1000);
  }
  else{
    out = (firstSet === 10 ? getPlace(n,0,1000) : (parse10s(firstSet, true) + getPlace(1, 0, 100))) + parse10s(parseInt(n.toString().substr(2,2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo10000(n){
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3){
    var piece = parseInt(nStr.substr(nStr.length-3, nStr.length-1));

    if (piece == 0){
      nStr = nStr.substr(0,nStr.length-3);
      ctr += 3;
      continue;
    }
    else if (piece < 100 && numbers.hasSingle){
      piece = andSingle(piece);
    }
    else{
      piece = my.parseNumber(parseInt(piece));
    }

    out = piece + (ctr >= 3 ? numbers[Math.pow(10,ctr)]:'') + ' ' + out;

    nStr = nStr.substr(0,nStr.length-3);
    ctr += 3;
  }
  out = my.parseNumber(nStr.substr(0,3)) + ' ' + numbers[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle(n){
  return numbers.conjunction+ ' ' + my.parseNumber(n);
}

export default function(n) {
  var out = '';
  var negative = n < 0;

  if (negative){
    n *= -1;
  }

  if (n < 100){
    out = parse10s(n, false);
  }
  else if (n < 1000){
    out = parse100s(n);
  }
  else if (n < 9999){
    out = parse1000s(n);
  }
  else if (n >= 10000){
    out = parseGreaterThanOrEqualTo10000(n);
  }
  else{
    out = 'unbound';
  }

  if (negative){
    out = numbers.negative + ' ' + out;
  }

  return out.trim();
}
