/**********************************************************************
Japanese number parser
Author: Gus Schuerger
Last edited: March 2014
**********************************************************************/

var numbers = {'negative': 'minus',
  0:'zero', 1:'ichi', 2:'ni', 3:'san', 4:'yon', 5:'go',
  6:'roku', 7:'nana', 8:'hachi', 9:'kyuu', 10:'jyuu', 100:'hyaku',
  300:'sanbyaku', 600:'roppyaku', 800:'happyaku',
  1000:'sen', 3000:'sanzen', 8000:'hassen', 10000:'man'};

/*   Function: getPlace
   Return the parsed value of a number in a certain position
   in the target language. For example, if n = 123,
   getPlace(n, 1, 10) will return the equivalent of "twenty"
   in the target language, and getPlace(n, 1, 1) will return
   the equivalent of "two" in the target language. */

function getPlace(n, which, scale){
  return numbers[parseInt(n.toString()[which])*scale];
}

/*   Function: checkForNumber
 Return true if number n is contained in the array my_list.  */

function checkForNumber(n, my_list){
  for (i = 0; i < my_list.length; i++){
    if (my_list[i] == n) return true;
  }
  return false;
}

function parse10s(n, ignore0){
  var out = '';
  if (n == 0 && ignore0){
      out = '';
  }
  else if (n <= 10){
    out = numbers[n];
  }
  else if (n < 20){
    out = numbers[10] + getPlace(n, 1, 1);
  }
  else{
    out = getPlace(n, 0, 1) + numbers[10];
    if (n % 10 != 0){
      out = out + ' ' + getPlace(n, 1, 1);
    }
  }

  return out;

}

function parse100s(n){
  var out = '';
  var hundreds = Math.floor(n/100);
  var tens = parse10s(parseInt(n.toString().substr(1,n.length)), true);
  if (hundreds == 0){
    out = parse10s(n, true);
  }
  else if (checkForNumber(hundreds, [1,3,6,8])){
    out = numbers[hundreds * 100] + ' ' + tens;
  }
  else{
    out = numbers[hundreds] + numbers[100] + ' ' + tens;
  }

  return out;

}

function parse1000s(n){
  var out = '';
  var thousands = Math.floor(n/1000);
  var hundreds = parse100s(parseInt(n.toString().substr(1,n.length)));
  if (thousands == 0){
    out = parse100s(n);
  }
  else if (checkForNumber(thousands, [1,3,8])){
    out = numbers[thousands * 1000] + ' ' + hundreds;
  }
  else{
    out = numbers[thousands] + numbers[1000] + ' ' + hundreds;
  }

  return out;

}

function parseLessThanOku(n){
  var out = '';
  var nStr = n.toString();
  var top = parseInt(nStr.substr(0, nStr.length - 4));
  var thousands = parse1000s(parseInt(nStr.substr(nStr.length - 4, nStr.length)));
  out = my.parseNumber(top);
  out = out + ' ' + numbers[10000] + ' ' + thousands;

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
  else if (n < 10000){
    out = parse1000s(n);
  }
  else if (n < 100000000){
    out = parseLessThanOku(n);
  }
  else{
    out = 'unbound';
  }

  if (negative){
    out = numbers.negative + ' ' + out;
  }

  return out.trim();
}
