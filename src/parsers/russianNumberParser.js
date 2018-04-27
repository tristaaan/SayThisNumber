/**********************************************************************
Russian number parser
Author: Tristan Wright
Last edited: August 2014
**********************************************************************/

var russianNumberParser = function(){
  var my = {};

  var numbers = {'negative':'минус',
    0:'ноль', 1:'один', 2:'два', 3:'три', 4:'четыре', 
    5:'пять', 6:'шесть', 7:'семь', 8:'восемь', 9:'девять', 
    10:'десять', 11:'одиннадцать', 12:'двенадцать', 13:'тринадцать', 14:'четырнадцать', 
    15: 'пятнадцать', 16: 'шестнадцать', 17:'семнадцать', 18: 'восемнадцать', 19: 'девятнадцать',
    20:'двадцать', 30:'тридцать', 40:'сорок', 50:'пятьдесят', 
    60:'шестьдесят', 70:'семьдесят', 80:'восемьдесят', 90:'девяносто', 
    100:'сто', 200: 'двести', 300: 'триста', 400: 'четыреста', 500: 'пятьсот', 
    600: 'шестьсот', 700:'семьсот', 800: 'восемьсот', 900: 'девятьсот',
    1000: 'тысяча', 1000000:'миллион', 1000000000:'Миллиард', 1000000000000:'Биллион'};

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
        out = getPlace(n,0,10) + ' ' + getPlace(n,1,1);
      }
    }
    return out;
  }

  function parse100s(n){
    return numbers[Math.floor(n/100)*100] + ' ' + parse10s(parseInt(n.toString().substr(1,2)), true);
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

module.exports = new russianNumberParser;
