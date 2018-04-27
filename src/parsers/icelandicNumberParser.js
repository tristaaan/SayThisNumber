/**********************************************************************
Icelandic number parser
Author: Tristan Wright
Last edited: September 2014
**********************************************************************/

var icelandicNumberParser = function(){

  var my = {};

  var numbers = {'hasSingle': true, 'conjunction': 'og', 'negative': 'neikvæð',
    0:'null', 1:'eitt', 2:'tvö', 3:'þrjú', 4:'fjögur', 5:'fimm',
    6:'sex', 7:'sjö', 8:'átta', 9:'níu', 10:'tíu',
    11:'ellefu', 12:'tólf', 13:'þrettán', 14:'fjórtán', 15: 'fimmtán',
    16:'sextán', 17:'sautján', 18:'átján', 19:'nitán', 20:'tuttugu',
    30:'þrjátíu', 40:'fjörutíu', 50:'fimmtíu', 60:'sextíu', 
    70:'sjötíu', 80:'áttatíu', 90:'níutíu', 100:'hundrað',
    1000: 'þúsund', 1000000:'milljón', 1000000000:'miljarður', 1000000000000:'billjón'};

  var masculineSingles = {1: 'einn', 2:'tveir', 3:'þrír', 4:'fjórir'};

/*   Function: getPlace
     Return the parsed value of a number in a certain position 
     in the target language. For example, if n = 123, 
     getPlace(n, 1, 10) will return the equivalent of "twenty" 
     in the target language, and getPlace(n, 1, 1) will return
     the equivalent of "two" in the target language. */
  
  function getPlace(n, which, scale){
    return numbers[parseInt(n.toString()[which])*scale];
  }

  function parse10s(n, masc){
    var out = '';
    if (n == 0){
      out = numbers[0];
    }
    else if (n < 5 && masc){
      out = masculineSingles[n];
    }
    else if (n <= 20){
      out = numbers[n];
    }
    else{
      if (n % 10 == 0){
        out = getPlace(n,0,10);
      }
      else if (n % 10 >= 5){
        out = getPlace(n,0,10) + ' ' +numbers.conjunction+ ' ' + getPlace(n,1,1);
      }
      else{
        out = getPlace(n,0,10) + ' ' +numbers.conjunction+ ' ' + masculineSingles[n.toString()[1]];
      }
    }
    return out;
  }

  function parse100s(n){
    var out = '';
    if (n % 100 == 0){
      out = getPlace(n, 0, 1) + ' ' + numbers[100];
    }
    else{
      out = getPlace(n, 0, 1) + ' ' + numbers[100] + ' ' +numbers.conjunction+ ' ' + parse10s(parseInt(n.toString().substr(1,2)));
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
        nStr = nStr.substr(0,nStr.length-3);
        ctr += 3;
        continue;
      }
      else if (piece < 100 && numbers.hasSingle){
        piece = andSingle(piece);
      }
      else{
        piece = my.parseNumber(parseInt(piece), ctr < 3);
      }

      out = piece + ' ' + (ctr >= 3 ? numbers[Math.pow(10,ctr)] : '') + ' ' + out;

      nStr = nStr.substr(0,nStr.length-3);
      ctr += 3;
    }
    out = my.parseNumber(nStr.substr(0,3)) + ' ' + numbers[Math.pow(10, ctr)] + ' ' + out;
    return out;
  }

  function andSingle(n){
    return numbers.conjunction+ ' ' + my.parseNumber(n, true);
  }

  my.parseNumber = function(n, masc){
    var out = '';
    var negative = n < 0;

    if (negative){
      n *= -1;
    }

    if (n < 100){
      out = parse10s(n, masc);
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

module.exports = new icelandicNumberParser;
