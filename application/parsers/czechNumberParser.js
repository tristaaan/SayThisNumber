/**********************************************************************
Czech number parser
Author: Harrison Gill based on the original work of Tristan Wright
Last edited: October 2014
**********************************************************************/

var czechNumberParser = function(){
	var my = {};

	var numbers = {'negative':'negativní',
		0:'nula', 1:'jeden/jedna/jedno', 2:'dva/dvě', 3:'tři', 4:'čtyři', 
		5:'pět', 6:'šest', 7:'sedm', 8:'osm', 9:'devět', 
		10:'deset', 11:'jedenáct', 12:'dvanáct', 13:'třináct', 14:'čtrnáct', 
		15: 'patnáct', 16: 'šestnáct', 17:'sedmnáct', 18: 'osmnáct', 19: 'devatenáct',
		20:'dvacet', 30:'třicet', 40:'čtyřicet', 50:'padesát', 
		60:'šedesát', 70:'sedmdesát', 80:'osmdesát', 90:'devadesát', 
		100:'sto', 200: 'dvě stě', 300: 'tři sta', 400: 'čtyři sta', 500: 'pět set', 
		600: 'šest set', 700:'sedm set', 800: 'osm set', 900: 'devět set',
		1000: 'tisíc', 2000: 'dva tisíce', 3000: 'tři tisíce', 4000: 'čtyři tisíce', 
		1000000:'milion/miliony/milionů', 1000000000:'miliard/miliardy', 1000000000000:'bilion/biliony/bilionů'};

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

	function parse1000sAndGreater(n){
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
			out = parse1000sAndGreater(n);
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

module.exports = new czechNumberParser;
