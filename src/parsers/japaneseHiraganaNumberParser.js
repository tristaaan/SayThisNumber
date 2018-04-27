/**********************************************************************
Japanese Kanji number parser
Author: Warren Bates
Last edited: January 2015
**********************************************************************/

var digits = {
  "1": "いち",
  "2": "に",
  "3": "さん",
  "4": "よん",
  "5": "ご",
  "6": "ろく",
  "7": "なな",
  "8": "はち",
  "9": "きゅう",
}

var minorPowers = {
  "1": "じゅう",  // 10^1 = 10 = jyuu
  "2": "ひゃく",  // 10^2 = 100 = hyaku
  "3": "せん",  // 10^3 = 1 000 = sen
}
var majorPowers = {
  "4": "まん",  // 10^4 = 1 0000 = man
  "8": "おく",  // 10^8 = 1 0000 0000 = oku
  "12": "ちょう",  // 10^12 = 1 0000 0000 0000 = chou
  "16": "けい", // 10^16 = 1 0000 0000 0000 0000 = kei
  "20": "がい", // 10^20 = 1 0000 0000 0000 0000 = gai
}

export default function parseNumber(n){
  var out = "";
  var out = "";

  var negative = (n < 0);
  if (negative) {
    n = n * -1;
  }

  // Reverse the numbers so that the index of each char is also the power of 10 of the column it was in
  // i.e. last digit is in units column or 10^0, 2nd to last is in the tens column or 10^1, etc.
  var reversed = n.toString().split("").reverse().join("");
  var requiredChar = "", powerChar = ""; // Temp char variables

  // For each digit
  for (var i = 0; i < reversed.length; i++) {
    powerChar = majorPowers[i];
    if (powerChar != undefined) {
      requiredChar = powerChar;
    } else if (reversed[i] != "0") {
      powerChar = minorPowers[i % 4];
      if (requiredChar != "") {
        out = requiredChar + out;
        requiredChar = "";
      }
      if (powerChar != undefined) {
        out = powerChar + out;
      }
    }
    if (reversed[i] != "0") {
      if (requiredChar != "") {
        out = requiredChar + out;
        requiredChar = "";
      }
      if (!((i % 4 != 0) && (reversed[i] == "1"))) {
        out = digits[reversed[i]] + out;
      }
    }
  }

  // Special cases
  for (var key in majorPowers) {
    out = out.replace(majorPowers[key] + "せん", majorPowers[key] + "いっせん");
  }

  out = out.replace("さんひゃく", "さんびゃく");
  out = out.replace("ろくひゃく", "ろっぴゃく");
  out = out.replace("はちひゃく", "はっぴゃく");
  out = out.replace("さんせん", "さんぜん");
  out = out.replace("はちせん", "はっせん");
  //ISSENMAN?

  if (negative) {
    out = "ふ" + out;
  }
  return out.trim();
}
