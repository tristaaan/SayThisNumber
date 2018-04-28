'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isNumber = _interopDefault(require('101/is-number'));
var isString = _interopDefault(require('101/is-string'));

var errors = {
  invalidNumber: 'Invalid number',
  noNumber: 'No number provided',
  unsupported: 'Language unsupported',
  numberTooSmall: 'Number too small',
  numberTooLarge: 'Number too large'
};

/**********************************************************************
Chinese numberals number parser (simplified)
Author: Robert Roth
Last edited: October 2014
**********************************************************************/

var exceptions = {
  100:'yībǎi', 1000:'yīqiān', 10000:'yīwàn', 100000000:'yīyì', 1000000000000:'yīzhào'};
var numbers = {'negative':'fù',
  0: '', 1:'yī', 2:' èr', 3:'sān', 4:'sì', 5:'wǔ', 6:'liù', 7:'qī', 8:'bā', 9:'jiǔ',
  10:'shí',
  100:'bǎi', 1000:'qiān', 10000:'wàn', 100000000:'yì', 1000000000000:'zhào'};
var zero = 'líng';

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

function parseNumber(n) {
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

/**********************************************************************
Chinese numberals number parser (simplified)
Author: Robert Roth
Last edited: October 2014
**********************************************************************/

var exceptions$1 = {
  100:'一百', 1000:'一千', 10000:'一万', 100000000:'一亿', 1000000000000:'一兆'};
var numbers$1 = {'negative':'负',
  0: '', 1:'一', 2:'二', 3:'三', 4:'四', 5:'五', 6:'六', 7:'七', 8:'八', 9:'九',
  10:'十',
  100:'百', 1000:'千', 10000:'万', 100000000:'亿', 1000000000000:'兆'};
var zero$1 = '零';

function rParse$1(n, maxPlace) {
  if (n in exceptions$1) return exceptions$1[n];
  if (maxPlace === 1 || n in numbers$1) return numbers$1[n];
  for (var i = maxPlace; i >= 1; i /= 10) {
    if (i in numbers$1) {
      var ndivi = Math.floor(n / i);
      if (ndivi > 0) {
        var nmodi = n % i;
        var next = i / 10;

        return (
          rParse$1(ndivi, maxPlace / i) +
          numbers$1[i] +
          ((nmodi !== 0 && next > nmodi) ? zero$1 : '') +
          ((nmodi === 10) ? numbers$1[1] + numbers$1[10] : rParse$1(nmodi, i))
        );
      }
    }
  }
}

function parseNumber$1(n) {
  if (n === 0) return zero$1;
  if (n > 10000000000000000 - 1) return 'unbound';
  var out = '';

  if (n < 0) {
    n *= -1;
    out = numbers$1.negative;
  }
  if (n > 9 && n < 20) return out + numbers$1[10] + numbers$1[n % 10];

  out = out + rParse$1(n, 1000000000000000);
  return out.trim();
}

/**********************************************************************
Chinese numberals number parser (simplified)
Author: Robert Roth
Last edited: October 2014
**********************************************************************/

var exceptions$2 = {
  100:'一百', 1000:'一千', 10000:'一万', 100000000:'一亿', 1000000000000:'一兆'};
var numbers$2 = {'negative':'負',
  0: '', 1:'一', 2:'二', 3:'三', 4:'四', 5:'五', 6:'六', 7:'七', 8:'八', 9:'九',
  10:'十',
  100:'百', 1000:'千', 10000:'萬', 100000000:'億', 1000000000000:'兆'};
var zero$2 = '零';

function rParse$2(n, maxPlace) {
  if (n in exceptions$2) return exceptions$2[n];
  if (maxPlace === 1 || n in numbers$2) return numbers$2[n];
  for (var i = maxPlace; i >= 1; i /= 10) {
    if (i in numbers$2) {
      var ndivi = Math.floor(n / i);
      if (ndivi > 0) {
        var nmodi = n % i;
        var next = i / 10;

        return (
          rParse$2(ndivi, maxPlace / i) +
          numbers$2[i] +
          ((nmodi !== 0 && next > nmodi) ? zero$2 : '') +
          ((nmodi === 10) ? numbers$2[1] + numbers$2[10] : rParse$2(nmodi, i))
        );
      }
    }
  }
}

function parseNumber$2(n) {
  if (n === 0) return zero$2;
  if (n > 10000000000000000 - 1) return 'unbound';
  var out = '';

  if (n < 0) {
    n *= -1;
    out = numbers$2.negative;
  }
  if (n > 9 && n < 20) return out + numbers$2[10] + numbers$2[n % 10];

  out = out + rParse$2(n, 1000000000000000);
  return out.trim();
}

/**********************************************************************
Czech number parser
Author: Harrison Gill
Last edited: October 2014
**********************************************************************/

var numbers$3 = {'negative':'negativní',
  0:'nula', 1:'jeden/jedna/jedno', 2:'dva/dvě', 3:'tři', 4:'čtyři',
  5:'pět', 6:'šest', 7:'sedm', 8:'osm', 9:'devět',
  10:'deset', 11:'jedenáct', 12:'dvanáct', 13:'třináct', 14:'čtrnáct',
  15: 'patnáct', 16: 'šestnáct', 17:'sedmnáct', 18: 'osmnáct', 19: 'devatenáct',
  20:'dvacet', 30:'třicet', 40:'čtyřicet', 50:'padesát',
  60:'šedesát', 70:'sedmdesát', 80:'osmdesát', 90:'devadesát',
  100:'sto', 200: 'dvě stě', 300: 'tři sta', 400: 'čtyři sta', 500: 'pět set',
  600: 'šest set', 700:'sedm set', 800: 'osm set', 900: 'devět set',
  1000: 'tisíc', 2000: 'dva tisíce', 3000: 'tři tisíce', 4000: 'čtyři tisíce',
  1000000:'milion/miliony/milionů', 1000000000:'miliarda/miliardy/miliard', 1000000000000:'bilion/biliony/bilionů'};

/*   Function: getPlace
     Return the parsed value of a number in a certain position
     in the target language. For example, if n = 123,
     getPlace(n, 1, 10) will return the equivalent of "twenty"
     in the target language, and getPlace(n, 1, 1) will return
     the equivalent of "two" in the target language. */

function getPlace(n, which, scale) {
  return numbers$3[parseInt(n.toString()[which]) * scale];
}

function parse10s(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$3[n];
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
  return numbers$3[Math.floor(n / 100) * 100] +
    ' ' + parse10s(parseInt(n.toString().substr(1, 2)), true);
}

function parse1000sAndGreater(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else {
      piece = parseNumber$3(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$3[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$3(nStr.substr(0, 3)) + ' ' + numbers$3[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function parseNumber$3(n) {
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
    out = parse1000sAndGreater(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$3.negative + ' ' + out;
  }

  return out.trim();
}

var numbers$4 = {'hasSingle': true, 'conjunction': 'en', 'conjunctionDieresis': 'ën', 'negative': 'min',
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

function getPlace$1(n, which, scale) {
  return numbers$4[parseInt(n.toString()[which]) * scale];
}

function parse10s$1(n, ignore0) {
  var out = '';
  var lastNumber;
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$4[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$1(n, 0, 10);
    } else {
      lastNumber = (String(n).split('')[1]);
      out = getPlace$1(n, 1, 1) +
        ('23'.indexOf(lastNumber) >= 0 ? numbers$4.conjunctionDieresis : numbers$4.conjunction) + getPlace$1(n, 0, 10);
    }
  }
  return out;
}

function parse100s$1(n) {
  var out = '';
  var hundredsName;
  var stringNumber = String(n).split('');
  hundredsName = (stringNumber[0] === '1' ? '' : getPlace$1(n, 0, 1)) + numbers$4[100];

  if (n % 100 === 0) {
    out = hundredsName;
  } else {
    out = hundredsName + (stringNumber[1] === '0' ? numbers$4.conjunction : '') + parse10s$1(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parse1000s(n) {
  var out = '';
  var firstSet = parseInt(n.toString().substr(0, 2));

  if (n % 1000 === 0) {
    out = getPlace$1(n, 0, 1000);
  } else {
    out = (firstSet === 10 ? getPlace$1(n, 0, 1000) : (parse10s$1(firstSet, true) + getPlace$1(1, 0, 100))) + parse10s$1(parseInt(n.toString().substr(2, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo10000(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers$4.hasSingle) {
      piece = andSingle(piece);
    } else {
      piece = parseNumber$4(parseInt(piece));
    }

    out = piece + (ctr >= 3 ? numbers$4[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$4(nStr.substr(0, 3)) + ' ' + numbers$4[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle(n) {
  return numbers$4.conjunction + ' ' + parseNumber$4(n);
}

function parseNumber$4(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$1(n, false);
  } else if (n < 1000) {
    out = parse100s$1(n);
  } else if (n < 9999) {
    out = parse1000s(n);
  } else if (n >= 10000) {
    out = parseGreaterThanOrEqualTo10000(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$4.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
Keycap Emoji Number parser
Author: Vishwesh Anand
Last edited: February 2016
**********************************************************************/

var keycap = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

function parseNumber$5(n) {
  var numberString = n.toString();

  numberString = numberString.replace(/0/g, keycap[0])
    .replace(/1/g, keycap[1])
    .replace(/2/g, keycap[2])
    .replace(/3/g, keycap[3])
    .replace(/4/g, keycap[4])
    .replace(/5/g, keycap[5])
    .replace(/6/g, keycap[6])
    .replace(/7/g, keycap[7])
    .replace(/8/g, keycap[8])
    .replace(/9/g, keycap[9])
    .replace(/-/g, '➖');
  return numberString;
}

/**********************************************************************
English number parser
Author: Tristan Wright
Last edited: March 2014
**********************************************************************/

var numbers$5 = {'hasSingle': true, 'conjunction': 'and', 'negative': 'negative',
  0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five',
  6:'six', 7:'seven', 8:'eight', 9:'nine', 10:'ten',
  11:'eleven', 12:'twelve', 13:'thirteen', 14:'fourteen', 15: 'fifteen',
  16:'sixteen', 17:'seventeen', 18:'eighteen', 19:'nineteen', 20:'twenty',
  30:'thirty', 40:'forty', 50:'fifty', 60:'sixty', 70:'seventy', 80:'eighty', 90:'ninety', 100:'hundred',
  1000: 'thousand', 1000000:'million', 1000000000:'billion', 1000000000000:'trillion', 1000000000000000:'quadrillion'};

/*   Function: getPlace
   Return the parsed value of a number in a certain position
   in the target language. For example, if n = 123,
   getPlace(n, 1, 10) will return the equivalent of "twenty"
   in the target language, and getPlace(n, 1, 1) will return
   the equivalent of "two" in the target language. */

function getPlace$2(n, which, scale) {
  return numbers$5[parseInt(n.toString()[which]) * scale];
}

function parse10s$2(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$5[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$2(n, 0, 10);
    } else {
      out = getPlace$2(n, 0, 10) + ' ' + getPlace$2(n, 1, 1);
    }
  }
  return out;
}

function parse100s$2(n) {
  var out = '';
  if (n % 100 === 0) {
    out = getPlace$2(n, 0, 1) + ' ' + numbers$5[100];
  } else {
    out = getPlace$2(n, 0, 1) + ' ' + numbers$5[100] + ' ' + numbers$5.conjunction + ' ' + parse10s$2(parseInt(n.toString().substr(1, 2)), true);
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
    } else if (piece < 100 && numbers$5.hasSingle) {
      piece = andSingle$1(piece);
    } else {
      piece = parseNumber$6(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$5[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$6(nStr.substr(0, 3)) + ' ' + numbers$5[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle$1(n) {
  return numbers$5.conjunction + ' ' + parseNumber$6(n);
}

function parseNumber$6(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$2(n, false);
  } else if (n < 1000) {
    out = parse100s$2(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$5.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
Estonian number parser
Author: Valentin Châtelet
Last edited: June 2016
**********************************************************************/

var numbers$6 = {'hasSingle': false, 'conjunction': '', 'negative': 'miinus',
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

function getPlace$3(n, which, scale) {
  return numbers$6[parseInt(n.toString()[which]) * scale];
}

function parse10s$3(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$6[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$3(n, 0, 10);
    } else {
      out = getPlace$3(n, 0, 10) + ' ' + getPlace$3(n, 1, 1);
    }
  }
  return out;
}

function parse100s$3(n) {
  var out = '';
  if (n % 100 === 0) {
    out = getPlace$3(n, 0, 1) + ' ' + numbers$6[100];
  } else {
    out = getPlace$3(n, 0, 1) + ' ' + numbers$6[100] + ' ' + numbers$6.conjunction + ' ' + parse10s$3(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$1(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers$6.hasSingle) {
      piece = andSingle$2(piece);
    } else {
      piece = parseNumber$7(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$6[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$7(nStr.substr(0, 3)) + ' ' + numbers$6[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle$2(n) {
  return numbers$6.conjunction + ' ' + parseNumber$7(n);
}

function parseNumber$7(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$3(n, false);
  } else if (n < 1000) {
    out = parse100s$3(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$1(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$6.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
French number parser
Author: Tristan Wright
Last edited: August 2014
**********************************************************************/

var numbers$7 = {'seperator': '-', 'conjunction': 'et', '':'un', 'negative':'moins',
  0:'zéro', 1:'un', 2:'deux', 3:'trois', 4:'quatre', 5:'cinq',
  6:'six', 7:'sept', 8:'huit', 9:'neuf', 10:'dix',
  11:'onze', 12:'douze', 13:'treize', 14:'quatorze', 15: 'quinze',
  16:'seize', 17: 'dix-sept', 18: 'dix-huit', 19: 'dix-neuf',
  20:'vingt', 30:'trenta', 40:'quarante', 50:'cinquante',
  60:'soixante', 70:'soixante-dix', 80:'quatre-vingt', 90:'quatre-vingt-dix',
  100:'cent', 1000: 'mille', 1000000:'million', 1000000000:'milliard', 1000000000000:'billion'};

/*   Function: getPlace
   Return the parsed value of a number in a certain position
   in the target language. For example, if n = 123,
   getPlace(n, 1, 10) will return the equivalent of "twenty"
   in the target language, and getPlace(n, 1, 1) will return
   the equivalent of "two" in the target language. */

function getPlace$4(n, which, scale) {
  return numbers$7[parseInt(n.toString()[which]) * scale];
}

function parse10s$4(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20 || (n % 10 === 0 && n !== 80)) {
    out = numbers$7[n];
  } else if (n % 10 === 1 && Math.floor(n / 10) !== 7 && Math.floor(n / 10) !== 9 && n !== 81) {
    out = numbers$7[Math.floor(n / 10) * 10] + ' ' + numbers$7.conjunction + ' ' + numbers$7[1];
  } else if (n > 20 && n < 60 && n % 10 > 1) {
    out = numbers$7[Math.floor(n / 10) * 10] + numbers$7.seperator + getPlace$4(n, 1, 1);
  } else if (n > 60 && n < 80) {
    out = numbers$7[60] + numbers$7.seperator + numbers$7[n - 60];
  } else if (n === 80) {
    out = numbers$7[80] + 's';
  } else if (n >= 81 && n < 100) {
    out = numbers$7[80] + numbers$7.seperator + numbers$7[n - 80];
  }

  return out;
}

function parse100s$4(n) {
  var out = '';
  if (n === 100) {
    out = numbers$7[100];
  } else if (n === 200 && n < 300) {
    out = numbers$7[2] + ' ' + numbers$7[100] + 's';
  } else if (n % 100 === 0 && Math.floor(n / 100) > 1) {
    out = getPlace$4(n, 0, 1) + ' ' + numbers$7[100];
  } else if (Math.floor(n / 100) > 1) {
    out = getPlace$4(n, 0, 1) + ' ' + numbers$7[100] + ' ' + parse10s$4(parseInt(n.toString().substr(1, 2)), true);
  } else {
    out = numbers$7[100] + ' ' + parse10s$4(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$2(n) {
  var out = '';
  var numberString = n.toString();
  var counter = 0;
  while (numberString.length > 3) {
    var piece = parseInt(numberString.substr(numberString.length - 3, numberString.length - 1));
    var isPlural = Math.floor(piece) > 1 && counter > 3 ? 's ' : ' ';

    if (piece === 0) {
      numberString = numberString.substr(0, numberString.length - 3);
      counter += 3;
      continue;
    } else {
      piece = parseNumber$8(parseInt(piece));
    }

    out = piece + ' ' + (counter >= 3 ? numbers$7[Math.pow(10, counter)] + isPlural : '') + out;

    numberString = numberString.substr(0, numberString.length - 3);
    counter += 3;
  }

  isPlural = parseInt(numberString.substr(0, 3)) > 1 ? 's ' : ' ';
  var suffix = numbers$7[Math.pow(10, counter)] + isPlural;

  // specific: 1000 => mille, 2000 => duex milles
  if (counter === 3 && parseInt(numberString.substr(0, 3)) === 1) {
    out = suffix + out;
  } else {
    var prefix = parseNumber$8(numberString.substr(0, 3));
    out = prefix + ' ' + suffix + out;
  }
  return out;
}

function parseNumber$8(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$4(n, true);
  } else if (n < 1000) {
    out = parse100s$4(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$2(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$7.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
German number parser
Author: Robert Roth
Last edited: October 2014
**********************************************************************/

var exceptions$3 = {1:'eins', 10:'zehn', 11:'elf', 12:'zwölf', 13:'dreizehn', 14:'vierzehn', 15:'fünfzehn', 16:'sechzehn', 17:'siebzehn', 18:'achtzehn', 19:'neunzehn'};
var oneFeminine = 'eine';
var numbers$8 = {'conjunction':'und', 'negative':'minus',
  0: '', 1:'ein', 2:'zwei', 3:'drei', 4:'vier', 5:'fünf', 6:'sechs', 7:'sieben', 8:'acht', 9:'neun',
  10:'zehn', 20:'zwanzig', 30:'dreßig', 40:'vierzig', 50:'fünfzig', 60:'sechzig', 70:'siebzig', 80:'achtzig', 90:'neunzig',
  100:'hundert', 1000:'tausend', 1000000:'Million ', 1000000000:'Millarde ', 1000000000000:'Billion ', 1000000000000000:'Billiarde '};

function rParse$3(n, maxPlace, feminine) {
  if (feminine && n === 1) return oneFeminine;
  if (n in exceptions$3) return exceptions$3[n] + (feminine ? ' ' : '');
  if (n in numbers$8) return numbers$8[n] + (feminine ? ' ' : '');
  if (n < 10) return numbers$8[n];
  if (n < 100) return numbers$8[n % 10] + numbers$8.conjunction + numbers$8[Math.floor(n / 10) * 10] + (feminine ? ' ' : '');
  if (n < 1000) {
    return numbers$8[Math.floor(n / 100)] + numbers$8[100] + rParse$3(n % 100, false) + (feminine ? ' ' : '');
  }
  for (var i = maxPlace; i >= 1000; i /= 1000) {
    var mdivi = Math.floor(n / i);
    if (mdivi > 0) {
      return rParse$3(mdivi, 100, i > 1000) + numbers$8[i] + rParse$3(n % i, i / 1000, false);
    }
  }
}

function parseNumber$9(n) {
  if (n === 0) return 'null';
  if (n > 10000000000000000 - 1) return 'unbound';
  if (n > 1000 && n in numbers$8) return oneFeminine + ' ' + numbers$8[n];
  var out = '';

  if (n < 0) {
    n *= -1;
    out = numbers$8.negative + ' ';
  }
  out = out + rParse$3(n, 1000000000000000, n > 1000);
  return out.trim();
}

/**********************************************************************
Icelandic number parser
Author: Tristan Wright
Last edited: September 2014
**********************************************************************/

var numbers$9 = {'hasSingle': true, 'conjunction': 'og', 'negative': 'neikvæð',
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

function getPlace$5(n, which, scale) {
  return numbers$9[parseInt(n.toString()[which]) * scale];
}

function parse10s$5(n, masc) {
  var out = '';
  if (n === 0) {
    out = numbers$9[0];
  } else if (n < 5 && masc) {
    out = masculineSingles[n];
  } else if (n <= 20) {
    out = numbers$9[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$5(n, 0, 10);
    } else if (n % 10 >= 5) {
      out = getPlace$5(n, 0, 10) + ' ' + numbers$9.conjunction + ' ' + getPlace$5(n, 1, 1);
    } else {
      out = getPlace$5(n, 0, 10) + ' ' + numbers$9.conjunction + ' ' + masculineSingles[n.toString()[1]];
    }
  }
  return out;
}

function parse100s$5(n) {
  var out = '';
  if (n % 100 === 0) {
    out = getPlace$5(n, 0, 1) + ' ' + numbers$9[100];
  } else {
    out = getPlace$5(n, 0, 1) + ' ' + numbers$9[100] + ' ' + numbers$9.conjunction + ' ' + parse10s$5(parseInt(n.toString().substr(1, 2)));
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$3(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers$9.hasSingle) {
      piece = andSingle$3(piece);
    } else {
      piece = parseNumber$10(parseInt(piece), ctr < 3);
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$9[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$10(nStr.substr(0, 3)) + ' ' + numbers$9[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle$3(n) {
  return numbers$9.conjunction + ' ' + parseNumber$10(n, true);
}

function parseNumber$10(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$5(n, true);
  } else if (n < 1000) {
    out = parse100s$5(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$3(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$9.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
italian number parser
Author: Tristan Wright
Last edited: March 2014
**********************************************************************/

var numbers$10 = {'hasSingle': false, 'negative':'negativo',
  0:'zero', 1:'uno', 2:'due', 3:'tre', 4:'quattro', 5:'cinque',
  6:'sei', 7:'sette', 8:'otto', 9:'nove', 10:'dieci',
  11:'undici', 12:'dodici', 13:'tredici', 14:'quattordici', 15: 'quindici',
  16: 'sedici', 17: 'diciassette', 18: 'diciotto', 19: 'diciannove', 20:'venti',
  30:'trenta', 40:'quaranta', 50:'cinquanta', 60:'sessanta',
  70:'settanta', 80:'ottanta', 90:'novanta', 100:'cento',
  1000: 'mille', 1000000:'milione', 1000000000:'miliardo'};

/*   Function: getPlace
   Return the parsed value of a number in a certain position
   in the target language. For example, if n = 123,
   getPlace(n, 1, 10) will return the equivalent of "twenty"
   in the target language, and getPlace(n, 1, 1) will return
   the equivalent of "two" in the target language. */

function getPlace$6(n, which, scale) {
  return numbers$10[parseInt(n.toString()[which]) * scale];
}

function parse10s$6(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$10[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$6(n, 0, 10);
    } else if (n.toString()[1] === '1' || n.toString()[1] === '8') {
      var tens = getPlace$6(n, 0, 10);
      out = tens.substr(0, tens.length - 1) + getPlace$6(n, 1, 1);
    } else {
      out = getPlace$6(n, 0, 10) + getPlace$6(n, 1, 1);
    }
  }
  return out;
}

function parse100s$6(n) {
  var out = '';
  if (n === 100) {
    out = numbers$10[100];
  } else if (n % 100 === 0 && Math.floor(n / 100) > 1) {
    out = getPlace$6(n, 0, 1) + numbers$10[100];
  } else if (Math.floor(n / 100) > 1) {
    out = getPlace$6(n, 0, 1) + numbers$10[100] + parse10s$6(parseInt(n.toString().substr(1, 2)), true);
  } else {
    out = numbers$10[100] + parse10s$6(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$4(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else {
      piece = parseNumber$11(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$10[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$11(nStr.substr(0, 3)) + ' ' + numbers$10[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function parseNumber$11(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$6(n, false);
  } else if (n < 1000) {
    out = parse100s$6(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$4(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$10.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
Japanese Kanji number parser
Author: Warren Bates
Last edited: January 2015
**********************************************************************/

var digits = {
  '1': 'いち',
  '2': 'に',
  '3': 'さん',
  '4': 'よん',
  '5': 'ご',
  '6': 'ろく',
  '7': 'なな',
  '8': 'はち',
  '9': 'きゅう'
};

var minorPowers = {
  '1': 'じゅう', // 10^1 = 10 = jyuu
  '2': 'ひゃく', // 10^2 = 100 = hyaku
  '3': 'せん' // 10^3 = 1 000 = sen
};
var majorPowers = {
  '4': 'まん', // 10^4 = 1 0000 = man
  '8': 'おく', // 10^8 = 1 0000 0000 = oku
  '12': 'ちょう', // 10^12 = 1 0000 0000 0000 = chou
  '16': 'けい', // 10^16 = 1 0000 0000 0000 0000 = kei
  '20': 'がい' // 10^20 = 1 0000 0000 0000 0000 = gai
};

function parseNumber$12(n) {
  var out = '';

  var negative = (n < 0);
  if (negative) {
    n = n * -1;
  }

  // Reverse the numbers so that the index of each char is also the power of 10 of the column it was in
  // i.e. last digit is in units column or 10^0, 2nd to last is in the tens column or 10^1, etc.
  var reversed = n.toString().split('').reverse().join('');
  var requiredChar = ''; // Temp char variables
  var powerChar = ''; // Temp char variables

  // For each digit
  for (var i = 0; i < reversed.length; i++) {
    powerChar = majorPowers[i];
    if (powerChar !== undefined) {
      requiredChar = powerChar;
    } else if (reversed[i] !== '0') {
      powerChar = minorPowers[i % 4];
      if (requiredChar !== '') {
        out = requiredChar + out;
        requiredChar = '';
      }
      if (powerChar !== undefined) {
        out = powerChar + out;
      }
    }
    if (reversed[i] !== '0') {
      if (requiredChar !== '') {
        out = requiredChar + out;
        requiredChar = '';
      }
      if (!((i % 4 !== 0) && (reversed[i] === '1'))) {
        out = digits[reversed[i]] + out;
      }
    }
  }

  // Special cases
  for (var key in majorPowers) {
    out = out.replace(majorPowers[key] + 'せん', majorPowers[key] + 'いっせん');
  }

  out = out.replace('さんひゃく', 'さんびゃく');
  out = out.replace('ろくひゃく', 'ろっぴゃく');
  out = out.replace('はちひゃく', 'はっぴゃく');
  out = out.replace('さんせん', 'さんぜん');
  out = out.replace('はちせん', 'はっせん');
  // ISSENMAN?

  if (negative) {
    out = 'ふ' + out;
  }
  return out.trim();
}

/**********************************************************************
Japanese Kanji number parser
Author: Warren Bates
Last edited: January 2015
**********************************************************************/

var digits$1 = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九'
};

var minorPowers$1 = {
  '1': '十', // 10^1 = 10 = jyuu
  '2': '百', // 10^2 = 100 = hyaku
  '3': '千' // 10^3 = 1 000 = sen
};
var majorPowers$1 = {
  '4': '万', // 10^4 = 1 0000 = man
  '8': '億', // 10^8 = 1 0000 0000 = oku
  '12': '兆', // 10^12 = 1 0000 0000 0000 = chou
  '16': '京', // 10^16 = 1 0000 0000 0000 0000 = kei
  '20': '垓' // 10^20 = 1 0000 0000 0000 0000 = gai
};

function parseNumber$13(n) {
  var out = '';

  var negative = (n < 0);
  if (negative) {
    n = n * -1;
  }

  // Reverse the numbers so that the index of each char is also the power of 10 of the column it was in
  // i.e. last digit is in units column or 10^0, 2nd to last is in the tens column or 10^1, etc.
  var reversed = n.toString().split('').reverse().join('');
  var requiredChar = ''; // Temp char variable
  var powerChar = ''; // Temp char variable

  // For each digit
  for (var i = 0; i < reversed.length; i++) {
    powerChar = majorPowers$1[i];
    if (powerChar !== undefined) {
      requiredChar = powerChar;
    } else if (reversed[i] !== '0') {
      powerChar = minorPowers$1[i % 4];
      if (requiredChar !== '') {
        out = requiredChar + out;
        requiredChar = '';
      }
      if (powerChar !== undefined) {
        out = powerChar + out;
      }
    }
    if (reversed[i] !== '0') {
      if (requiredChar !== '') {
        out = requiredChar + out;
        requiredChar = '';
      }
      if (!((i % 4 !== 0) && (reversed[i] === '1'))) {
        out = digits$1[reversed[i]] + out;
      }
    }
  }

  // Special cases
  for (var key in majorPowers$1) {
    out = out.replace(majorPowers$1[key] + '千', majorPowers$1[key] + '一千');
  }

  if (negative) {
    out = '負' + out;
  }

  return out.trim();
}

/**********************************************************************
Japanese number parser
Author: Gus Schuerger
Last edited: March 2014
**********************************************************************/

var numbers$11 = {'negative': 'minus',
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

function getPlace$7(n, which, scale) {
  return numbers$11[parseInt(n.toString()[which]) * scale];
}

/*   Function: checkForNumber
 Return true if number n is contained in the array list.  */

function checkForNumber(n, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === n) return true;
  }
  return false;
}

function parse10s$7(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 10) {
    out = numbers$11[n];
  } else if (n < 20) {
    out = numbers$11[10] + getPlace$7(n, 1, 1);
  } else {
    out = getPlace$7(n, 0, 1) + numbers$11[10];
    if (n % 10 !== 0) {
      out = out + ' ' + getPlace$7(n, 1, 1);
    }
  }

  return out;
}

function parse100s$7(n) {
  var out = '';
  var hundreds = Math.floor(n / 100);
  var tens = parse10s$7(parseInt(n.toString().substr(1, n.length)), true);
  if (hundreds === 0) {
    out = parse10s$7(n, true);
  } else if (checkForNumber(hundreds, [1, 3, 6, 8])) {
    out = numbers$11[hundreds * 100] + ' ' + tens;
  } else {
    out = numbers$11[hundreds] + numbers$11[100] + ' ' + tens;
  }

  return out;
}

function parse1000s$1(n) {
  var out = '';
  var thousands = Math.floor(n / 1000);
  var hundreds = parse100s$7(parseInt(n.toString().substr(1, n.length)));
  if (thousands === 0) {
    out = parse100s$7(n);
  } else if (checkForNumber(thousands, [1, 3, 8])) {
    out = numbers$11[thousands * 1000] + ' ' + hundreds;
  } else {
    out = numbers$11[thousands] + numbers$11[1000] + ' ' + hundreds;
  }

  return out;
}

function parseLessThanOku(n) {
  var out = '';
  var nStr = n.toString();
  var top = parseInt(nStr.substr(0, nStr.length - 4));
  var thousands = parse1000s$1(parseInt(nStr.substr(nStr.length - 4, nStr.length)));
  out = parseNumber$14(top);
  out = out + ' ' + numbers$11[10000] + ' ' + thousands;

  return out;
}

function parseNumber$14(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$7(n, false);
  } else if (n < 1000) {
    out = parse100s$7(n);
  } else if (n < 10000) {
    out = parse1000s$1(n);
  } else if (n < 100000000) {
    out = parseLessThanOku(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$11.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
Norwegian number parser
Author: Tristan Wright
Last edited: September 2014
**********************************************************************/

var numbers$12 = {'hasSingle': false, 'conjunction': 'og', 'negative': 'negativ',
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

function getPlace$8(n, which, scale) {
  return numbers$12[parseInt(n.toString()[which]) * scale];
}

function parse10s$8(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$12[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$8(n, 0, 10);
    } else {
      out = getPlace$8(n, 0, 10) + getPlace$8(n, 1, 1);
    }
  }
  return out;
}

function parse100s$8(n) {
  var out = '';
  if (n % 100 === 0) {
    out = getPlace$8(n, 0, 1) + ' ' + numbers$12[100];
  } else {
    out = getPlace$8(n, 0, 1) + ' ' + numbers$12[100] + ' ' + numbers$12.conjunction + ' ' + parse10s$8(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$5(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers$12.hasSingle) {
      piece = andSingle$4(piece);
    } else {
      piece = parseNumber$15(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$12[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$15(nStr.substr(0, 3)) + ' ' + numbers$12[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle$4(n) {
  return numbers$12.conjunction + ' ' + parseNumber$15(n);
}

function parseNumber$15(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$8(n, false);
  } else if (n < 1000) {
    out = parse100s$8(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$5(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$12.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
Portuguese number parser
Author: Wagner Leonardi
Last edited: Novemeber 2015
**********************************************************************/

var numbers$13 = {'hasSingle': true, 'conjunction': 'e', '':'um', 'negative':'menos',
  0:'zero', 1:'um', 2:'dois', 3:'três', 4:'quatro', 5:'cinco',
  6:'seis', 7:'sete', 8:'oito', 9:'nove', 10:'dez',
  11:'onze', 12:'doze', 13:'treze', 14:'quatorze', 15: 'quinze', 16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove',
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

function getPlace$9(n, which, scale) {
  return numbers$13[parseInt(n.toString()[which]) * scale];
}

function parse10s$9(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$13[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$9(n, 0, 10);
    } else {
      out = getPlace$9(n, 0, 10) + ' ' + numbers$13.conjunction + ' ' + getPlace$9(n, 1, 1);
    }
  }
  return out;
}

function parse100s$9(n) {
  var out = '';
  if (n === 100) {
    out = numbers$13[100];
  } else if (n % 100 === 0) {
    out = numbers$13[n];
  } else {
    if (inRange(n, 100, 200)) {
      out = numbers$13['100s'] + ' ' + numbers$13.conjunction + ' ' + parse10s$9(parseInt(n.toString().substr(1, 2)), true);
    } else {
      out = numbers$13[Math.floor(n / 100) * 100] + ' ' + numbers$13.conjunction + ' ' + parse10s$9(parseInt(n.toString().substr(1, 2)), true);
    }
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$6(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers$13.hasSingle) {
      piece = andSingle$5(piece);
    } else {
      piece = parseNumber$16(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$13[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$16(nStr.substr(0, 3)) + ' ' + numbers$13[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle$5(n) {
  return numbers$13.conjunction + ' ' + parseNumber$16(n);
}

function inRange(n, lower, upper) {
  return n > lower && n < upper;
}

function parseNumber$16(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$9(n, false);
  } else if (n < 1000) {
    out = parse100s$9(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$6(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$13.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
Russian number parser
Author: Tristan Wright
Last edited: August 2014
**********************************************************************/

var numbers$14 = {'negative':'минус',
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

function getPlace$10(n, which, scale) {
  return numbers$14[parseInt(n.toString()[which]) * scale];
}

function parse10s$10(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$14[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$10(n, 0, 10);
    } else {
      out = getPlace$10(n, 0, 10) + ' ' + getPlace$10(n, 1, 1);
    }
  }
  return out;
}

function parse100s$10(n) {
  return numbers$14[Math.floor(n / 100) * 100] + ' ' + parse10s$10(parseInt(n.toString().substr(1, 2)), true);
}

function parseGreaterThanOrEqualTo1000$7(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else {
      piece = parseNumber$17(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$14[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$17(nStr.substr(0, 3)) + ' ' + numbers$14[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function parseNumber$17(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }
  if (n < 100) {
    out = parse10s$10(n, false);
  } else if (n < 1000) {
    out = parse100s$10(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$7(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$14.negative + ' ' + out;
  }

  return out.trim();
}

/**********************************************************************
Spanish number parser
Author: Tristan Wright
Last edited: March 2014
**********************************************************************/

var numbers$15 = {'hasSingle': true, 'conjunction': 'y', '':'un', 'negative':'menos', 'shortOne': 'un',
  0:'cero', 1:'uno', 2:'dos', 3:'tres', 4:'cuatro', 5:'cinco',
  6:'seis', 7:'siete', 8:'ocho', 9:'nueve', 10:'diez',
  11:'once', 12:'doce', 13:'trece', 14:'catorce', 15: 'quince',
  20:'veinte',
  30:'treinta', 40:'cuarenta', 50:'cincuenta', 60:'sesenta', 70:'setenta', 80:'ochenta', 90:'noventa', 100:'cien',
  500: 'quinientos', 700:'setecientos', 900: 'novecientos',
  1000: 'mil', 1000000:'millón', 1000000000:'millardo', 1000000000000:'billón'};

/*   Function: getPlace
   Return the parsed value of a number in a certain position
   in the target language. For example, if n = 123,
   getPlace(n, 1, 10) will return the equivalent of "twenty"
   in the target language, and getPlace(n, 1, 1) will return
   the equivalent of "two" in the target language. */

function getPlace$11(n, which, scale) {
  return numbers$15[parseInt(n.toString()[which]) * scale];
}

function parse10s$11(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 15) {
    out = numbers$15[n];
  } else if (n > 15 && n < 20) {
    out = numbers$15[10] + ' ' + numbers$15.conjunction + ' ' + getPlace$11(n, 1, 1);
  } else {
    if (n % 10 === 0) {
      out = getPlace$11(n, 0, 10);
    } else {
      out = getPlace$11(n, 0, 10) + ' ' + numbers$15.conjunction + ' ' + getPlace$11(n, 1, 1);
    }
  }
  return out;
}

function parse100s$11(n) {
  var out = '';
  if (n === 100) {
    out = numbers$15[100];
  } else if (n % 100 === 0 && Math.floor(n / 100) > 1) {
    if (n === 500 || n === 700 || n === 900) {
      out = numbers$15[n];
    } else {
      out = getPlace$11(n, 0, 1) + numbers$15[100] + 'tos';
    }
  } else if (Math.floor(n / 100) > 1) {
    if (inRange$1(n, 500, 600) || inRange$1(n, 700, 800) || inRange$1(n, 900, 1000)) {
      out = numbers$15[Math.floor(n / 100) * 100] + ' ' + parse10s$11(parseInt(n.toString().substr(1, 2)), true);
    } else {
      out = getPlace$11(n, 0, 1) + numbers$15[100] + 'tos ' + parse10s$11(parseInt(n.toString().substr(1, 2)), true);
    }
  } else {
    out = numbers$15[100] + 'to ' + parse10s$11(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$8(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers$15.hasSingle) {
      piece = andSingle$6(piece);
    } else {
      piece = parseNumber$18(parseInt(piece));
    }

    out = piece + ' ' + (ctr >= 3 ? numbers$15[Math.pow(10, ctr)] : '') + ' ' + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$18(nStr.substr(0, 3)) + ' ' + numbers$15[Math.pow(10, ctr)] + ' ' + out;
  return out;
}

function andSingle$6(n) {
  return numbers$15.conjunction + ' ' + parseNumber$18(n);
}

function inRange$1(n, lower, upper) {
  return n > lower && n < upper;
}

function parseNumber$18(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$11(n, false);
  } else if (n < 1000) {
    out = parse100s$11(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$8(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$15.negative + ' ' + out;
  }

  return out.trim();
}

var numbers$16 = {'hasSingle': true, 'conjunction': '', 'negative': 'minus',
  0:'noll', 1:'ett', 2:'två', 3:'tre', 4:'fyra', 5:'fem',
  6:'sex', 7:'sju', 8:'åtta', 9:'nio', 10:'tio',
  11:'elva', 12:'tolv', 13:'tretton', 14:'fjorton', 15: 'femton',
  16:'sexton', 17:'sjutton', 18:'arton', 19:'nitton', 20:'tjugo',
  30:'trettio', 40:'fyrtio', 50:'femtio', 60:'sextio', 70:'sjuttio', 80:'åttio', 90:'nittio', 100:'hundra',
  1000: 'tusen', 1000000:'miljon', 1000000000:'miljard', 1000000000000:'biljon', 1000000000000000:'biljard'};

function getPlace$12(n, which, scale) {
  return numbers$16[parseInt(n.toString()[which]) * scale];
}

function parse10s$12(n, ignore0) {
  var out = '';
  if (n === 0 && ignore0) {
    out = '';
  } else if (n <= 20) {
    out = numbers$16[n];
  } else {
    if (n % 10 === 0) {
      out = getPlace$12(n, 0, 10);
    } else {
      out = getPlace$12(n, 0, 10) + getPlace$12(n, 1, 1);
    }
  }
  return out;
}

function parse100s$12(n) {
  var out = '';
  if (n % 100 === 0) {
    out = getPlace$12(n, 0, 1) + numbers$16[100];
  } else {
    out = getPlace$12(n, 0, 1) + numbers$16[100] + numbers$16.conjunction + parse10s$12(parseInt(n.toString().substr(1, 2)), true);
  }

  return out;
}

function parseGreaterThanOrEqualTo1000$9(n) {
  var out = '';
  var nStr = n.toString();
  var ctr = 0;
  while (nStr.length > 3) {
    var piece = parseInt(nStr.substr(nStr.length - 3, nStr.length - 1));

    if (piece === 0) {
      nStr = nStr.substr(0, nStr.length - 3);
      ctr += 3;
      continue;
    } else if (piece < 100 && numbers$16.hasSingle) {
      piece = andSingle$7(piece);
    } else {
      piece = parseNumber$19(parseInt(piece));
    }

    out = piece + (ctr >= 3 ? numbers$16[Math.pow(10, ctr)] : '') + out;

    nStr = nStr.substr(0, nStr.length - 3);
    ctr += 3;
  }
  out = parseNumber$19(nStr.substr(0, 3)) + numbers$16[Math.pow(10, ctr)] + out;
  return out;
}

function andSingle$7(n) {
  return numbers$16.conjunction + parseNumber$19(n);
}

function parseNumber$19(n) {
  var out = '';
  var negative = n < 0;

  if (negative) {
    n *= -1;
  }

  if (n < 100) {
    out = parse10s$12(n, false);
  } else if (n < 1000) {
    out = parse100s$12(n);
  } else if (n >= 1000) {
    out = parseGreaterThanOrEqualTo1000$9(n);
  } else {
    out = 'unbound';
  }

  if (negative) {
    out = numbers$16.negative + ' ' + out;
  }

  return out.trim();
}

var languages = {
  chinesePinyin: parseNumber,
  chineseSimplified: parseNumber$1,
  chineseTraditional: parseNumber$2,
  czech: parseNumber$3,
  dutch: parseNumber$4,
  emoji: parseNumber$5,
  english: parseNumber$6,
  estonian: parseNumber$7,
  french: parseNumber$8,
  german: parseNumber$9,
  icelandic: parseNumber$10,
  italian: parseNumber$11,
  japaneseHiragana: parseNumber$12,
  japaneseKanji: parseNumber$13,
  japaneseRomaji: parseNumber$14,
  norwegian: parseNumber$15,
  portuguese: parseNumber$16,
  russian: parseNumber$17,
  spanish: parseNumber$18,
  swedish: parseNumber$19
};

var Parser = function(n) {
  if (isString(n)) {
    // this result has already been validated to not be NaN
    n = parseInt(n, 10);
  }
  this.n = n;
  this.languages = Object.keys(languages);
};

Parser.prototype.in = function(language) {
  if (!languages.hasOwnProperty(language)) {
    throw new Error(errors.unsupported);
  }
  if (Array.isArray(this.n)) {
    var ret = [];
    for (var i = 0; i < this.n.length; i++) {
      var n = this.n[i];
      ret.push(languages[language](n));
    }
    return ret;
  }
  return languages[language](this.n);
};

var validateNumber = function(n) {
  if (n > Math.pow(10, 15)) {
    throw new Error(errors.numberTooLarge);
  } else if (n < -Math.pow(10, 15)) {
    throw new Error(errors.numberTooSmall);
  }

  if (n === null || n === undefined) {
    throw new Error(errors.noNumber);
  } else if (isNaN(n)) {
    throw new Error(errors.invalidNumber);
  }

  if (isString(n)) {
    n = parseInt(n, 10);
    if (isNaN(n)) {
      throw new Error(errors.invalidNumber);
    }
  }
  if (!isNumber(n)) {
    throw new Error(errors.invalidNumber);
  }
};

function sayThisNumber(n) {
  validateNumber(n);
  return new Parser(n);
}
function sayTheseNumbers(arr) {
  if (arguments.length === 0) {
    throw new Error(errors.noNumber);
  }
  if (!Array.isArray(arr)) {
    var _arr = [];
    for (var i = 0; i < arguments.length; i++) {
      _arr[i] = arguments[i];
    }
    arr = _arr;
  }
  arr.forEach(function(n) { validateNumber(n); });
  return new Parser(arr);
}
function sayThisNumberRange(fromN, toN) {
  var reverse = false;
  validateNumber(fromN);
  validateNumber(toN);
  if (fromN > toN) {
    reverse = true;
    var tmp = fromN;
    fromN = toN;
    toN = tmp;
  }
  var arr = [];
  for (var i = fromN; i <= toN; i++) {
    arr.push(i);
  }
  if (reverse) {
    arr = arr.reverse();
  }
  return sayTheseNumbers(arr);
}

exports.default = sayThisNumber;
exports.sayTheseNumbers = sayTheseNumbers;
exports.sayThisNumberRange = sayThisNumberRange;
