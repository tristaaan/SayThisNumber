/**********************************************************************
 Portuguese number parser
 Author: Wagner Leonardi (leonardiwagner@gmail.com)
 Last edited: Novemeber 2015
 **********************************************************************/

var portugueseNumberParser = function(){
  var my = {};

  var numbers = {'hasSingle': true, 'conjunction': 'e', '':'um', 'negative':'menos',
    0:'zero', 1:'um', 2:'dois', 3:'três', 4:'quatro', 5:'cinco',
    6:'seis', 7:'sete', 8:'oito', 9:'nove', 10:'dez',
    11:'onze', 12:'doze', 13:'treze', 14:'quatorze', 15: 'quinze',  16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove',
    20:'vinte',
    30:'trinta', 40:'quarenta', 50:'cinquenta', 60:'sesenta', 70:'setenta', 80:'oitenta', 90:'noventa',
    100:'cem', '100s': 'cento', 200: 'duzentos', 300: 'trezentos', 400: 'quatrocentos', 500: 'quinhentos',
    600: 'seiscentos', 700: 'setecentos', 800: 'oitocentos', 900: 'novecentos',
    1000: 'mil', 1000000:'milhão', 1000000000:'bilhão', 1000000000000:'trilhão'};

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
      else{
        out = getPlace(n,0,10) + ' ' + numbers.conjunction + ' '+ getPlace(n,1,1);
      }
    }
    return out;
  }

  function parse100s(n){
    var out = '';
    if (n == 100){
      out = numbers[100];
    }
    else if (n % 100 == 0){
      out = numbers[n];
    }
    else {
      console.log(n)
      if (inRange(n, 100, 200)){
        out = numbers['100s'] + ' ' + numbers.conjunction + ' ' + parse10s(parseInt(n.toString().substr(1,2)), true);
      }
      else{
        out = numbers[Math.floor(n/100)*100] + ' ' + numbers.conjunction + ' ' + parse10s(parseInt(n.toString().substr(1,2)), true);
      }
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

  function andSingle(n){
    return numbers.conjunction+ ' ' + my.parseNumber(n);
  }

  function inRange(n, lower, upper){
    return n > lower && n < upper;
  }

  my.parseNumber = function(n){
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

  return my;
}

module.exports = new portugueseNumberParser;
