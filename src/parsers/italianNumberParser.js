/**********************************************************************
italian number parser
Author: Tristan Wright
Last edited: March 2014
**********************************************************************/

var numbers = {'hasSingle': false, 'negative':'negativo',
  0:'zero', 1:'uno', 2:'due', 3:'tre', 4:'quattro', 5:'cinque',
  6:'sei', 7:'sette', 8:'otto', 9:'nove', 10:'dieci',
  11:'undici', 12:'dodici', 13:'tredici', 14:'quattordici', 15: 'quindici',
  16: "sedici", 17: "diciassette", 18: "diciotto", 19: "diciannove", 20:'venti',
  30:'trenta', 40:'quaranta', 50:'cinquanta', 60:'sessanta',
  70:'settanta', 80:'ottanta', 90:'novanta', 100:'cento',
  1000: 'mille', 1000000:'milione', 1000000000:'miliardo'};

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
  var out = '';
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
    else if (n.toString()[1] == "1" || n.toString()[1] == "8"){
      var tens = getPlace(n,0,10);
      out = tens.substr(0,tens.length-1) + getPlace(n,1,1);
    }
    else{
      out = getPlace(n,0,10) + getPlace(n,1,1);
    }
  }
  return out;
}

function parse100s(n){
  var out = '';
  if (n == 100){
    out = numbers[100];
  }
  else if (n % 100 == 0 && Math.floor(n/100) > 1){
    out = getPlace(n, 0, 1) + numbers[100];
  }
  else if (Math.floor(n/100) > 1){
    out = getPlace(n, 0, 1) + numbers[100] + parse10s(parseInt(n.toString().substr(1,2)), true);
  }
  else {
    out = numbers[100] + parse10s(parseInt(n.toString().substr(1,2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000(n){
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3){
    var piece = parseInt(nStr.substr(nStr.length-3, nStr.length-1));

    if (piece == 0){
      nStr = nStr.substr(0,nStr.length-3)
      ctr += 3;
      continue;
    }
    else if (piece < 100 && numbers.hasSingle){
      piece = andSingle(piece);
    }
    else{
      piece = my.parseNumber(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers[Math.pow(10,ctr)]:'') + ' ' + out;

    nStr = nStr.substr(0,nStr.length-3);
    ctr += 3;
  }
  out = my.parseNumber(nStr.substr(0,3)) + ' ' + numbers[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

export default function parseNumber(n) {
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
  else if (n >= 1000){
    out = parseGreaterThanOrEqualTo1000(n);
  }
  else{
    out = 'unbound';
  }

  if (negative){
    out = numbers.negative + ' ' + out;
  }

  return out.trim();
}
