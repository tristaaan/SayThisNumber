/**********************************************************************
Keycap Emoji Number parser
Author: Vishwesh Anand
Last edited: February 2016
**********************************************************************/

var keycapEmojiParser = function(){
  var my = {};
  var keycap = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
  my.parseNumber = function(n){
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

  return my;
}

module.exports = new keycapEmojiParser;
