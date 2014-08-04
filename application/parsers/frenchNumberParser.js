/**********************************************************************
French number parser
Author: Tristan Wright
Last edited: August 2014
**********************************************************************/

var frenchNumberParser = function(){
	var my = {};

	var numbers = {'seperator': '-', 'conjunction': 'et', '':'un', 'negative':'moins',
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

	function getPlace(n, which, scale){
		return numbers[parseInt(n.toString()[which])*scale];
	}

	function parse10s(n, ignore0){
		var out = '';
		if (n == 0 && ignore0){
			out = '';
		}
		else if (n <= 20 || n % 10 == 0){
			out = numbers[n];
		}
    else if (n % 10 == 1 && Math.floor(n/10) != 7 && Math.floor(n/10) != 9){
      out = numbers[Math.floor(n/10)*10] + ' ' + numbers.conjunction + ' ' + numbers[1];
    }
		else if (n > 20 && n < 60 && n % 10 > 1){
			out = numbers[Math.floor(n/10)*10] + numbers.seperator + getPlace(n,1,1);
		}
    else if (n > 60 && n < 80){
      out = numbers[60] + numbers.seperator + numbers[n-60];
    }
    else if (n >= 80 && n < 100){
      out = numbers[80] + numbers.seperator + numbers[n-80];
    }

		return out;
	}

	function parse100s(n){
		var out = '';
		if (n == 100){
			out = numbers[100];
		}
		else if (n % 100 == 0 && Math.floor(n/100) > 1){
			out = getPlace(n, 0, 1) + ' ' + numbers[100];
		}
		else if (Math.floor(n/100) > 1){
			out = getPlace(n, 0, 1) + ' ' + numbers[100] + ' ' + parse10s(parseInt(n.toString().substr(1,2)), true);
  	}
		else {
			out = numbers[100] + ' ' + parse10s(parseInt(n.toString().substr(1,2)), true);
		}

		return out;
	}

	function parseGreaterThanOrEqualTo1000(n){
		var out = '';
		var numberString = n.toString();
		var counter = 0;
		while (numberString.length > 3){
			var piece = parseInt(numberString.substr(numberString.length-3, numberString.length-1));
      var isPlural = Math.floor(piece) > 1 && counter > 3 ? 's ' : ' ';

			if (piece == 0){
				numberString = numberString.substr(0,numberString.length-3)
				counter += 3;
				continue;
			}
			else{
				piece = my.parseNumber(parseInt(piece));
			}

			out = piece + ' ' + (counter >= 3 ? numbers[Math.pow(10,counter)] + isPlural : '') + out;

			numberString = numberString.substr(0,numberString.length-3);
			counter += 3;
      console.log(out);
		}
    var isPlural = parseInt(numberString.substr(0,3)) > 1 ? 's ' : ' ';
		out = my.parseNumber(numberString.substr(0,3)) + ' ' + numbers[Math.pow(10, counter)] + isPlural + out;
    console.log(out);
		return out;
	}

	my.parseNumber = function(n){
		var out = '';
		var negative = n < 0;

		if (negative){
			n *= -1;
		}

		if (n < 100){
			out = parse10s(n, true);
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

module.exports = new frenchNumberParser;
