/**********************************************************************
Keycap Emoji Number parser
Author: Vishwesh Anand
Last edited: February 2016
**********************************************************************/

var keycapEmojiParser = function(){

	var my = {};
	my.parseNumber = function(n){
		var numberString = n + "";

		numberString = numberString.replace(/0/g, keycap[0]);
		numberString = numberString.replace(/1/g, keycap[1]);
		numberString = numberString.replace(/2/g, keycap[2]);
		numberString = numberString.replace(/3/g, keycap[3]);
		numberString = numberString.replace(/4/g, keycap[4]);
		numberString = numberString.replace(/5/g, keycap[5]);
		numberString = numberString.replace(/6/g, keycap[6]);
		numberString = numberString.replace(/7/g, keycap[7]);
		numberString = numberString.replace(/8/g, keycap[8]);
		numberString = numberString.replace(/9/g, keycap[9]);
		return numberString;
	}

	return my;

}

module.exports = new keycapEmojiParser;
keycap = ["0⃣️", "1⃣", "2⃣", "3⃣️", "4⃣", "5⃣️", "6⃣️" ,"7⃣", "8⃣", "9⃣️"];
