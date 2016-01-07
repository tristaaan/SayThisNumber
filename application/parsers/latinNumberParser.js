/**********************************************************************
Latin number parser (Cardinal Numbers in Masculine Nominative)
Author: Vishwesh Anand
Last edited: January 2016
**********************************************************************/

var latinNumberParser = function(){

	var my = {};

	var numbers = {0:'nullum', 1:'ūnus', 2:'duo', 3:'trēs', 4:'quattuor', 5:'quīnque	',
		6:'sex', 7:'septem', 8:'octō', 9:'novem', 10:'decem',
		11:'ūndecim', 12:'duodecim', 13:'tredecim', 14:'quattuordecim', 15: 'quīndecim',
		16:'sēdecim', 17:'septendecim', 18:'duodēvīgintī', 19:'ūndēvīgintī', 20:'vīgintī',
		30:'trīgintā', 40:'quadrāgintā', 50:'quīnquāgintā', 60:'sexāgintā', 70:'septuāgintā', 80:'octōgintā', 90:'nōnāgintā', 100:'centum',
		200:'ducentī', 300:'trecentī', 400:'quadringentī', 500:'quīngentī', 600:'sescentī', 700:'septingentī', 800:'octingentī', 900:'nōngentī', 1000: 'mīlia'};

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
			else{ //1-7 additive, 8-9 subtractive
				//out = getPlace(n,0,10) + ' ' + getPlace(n,1,1);
				if (n%10 < 8){
					out = getPlace(n,0,10) + " " + getPlace(n,1,1);
				}
				else if (n%10 == 8){
					out = "duodē" + getPlace(n+10,0,10);
				}
				else {
					out = "ūndē" + getPlace(n+10,0,10);
				}
			}
		}
		return out;
	}

	function parse100s(n){
		var out = '';
		if (n % 100 == 0){
			out = getPlace(n,0,100);
		}
		else{
			out = getPlace(n,0,100) + " " + parse10s(parseInt(n.toString().substr(1,2)), true);
		}

		return out;
	}

	function parse1000s(n){
		var out = '';
		if (n % 1000 == 0){
			if (n%1000>1){
				out = getPlace(n,0,1000);
			}
			else {
				out = 'mīlle';
			}
		}
		else{
			out = getPlace(n,0,1000) + " " + parse100s(parseInt(n.toString().substr(1,3)), true);
		}
		return out;
	}

	my.parseNumber = function(n){
		var out = '';
		var negative = n < 0;

		if (negative){
			out = 'numeri absurdi'; //The Romans and Medieval Europeans regarded negative numbers as absurd
			//This terminology was used by Michael Stifel 1544
		}

		else if (n < 100){
			out = parse10s(n, false);
		}
		else if (n < 1000){
			out = parse100s(n);
		}
		else if (n < 10000){
			out = parse1000s(n);
		}
		else{
			out = 'Mea Culpa, Nimium Magna!'; //numbers over 9999 not known
		}

		return out.trim();
	}

	return my;
}

module.exports = new latinNumberParser;
