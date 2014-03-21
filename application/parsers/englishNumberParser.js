var englishNumberParser = function(){

	var my = {};

	var numbers = {'hasSingle': true, 'conjunction': 'and', 'negative': 'negative',
		0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five',
		6:'six', 7:'seven', 8:'eight', 9:'nine', 10:'ten',
		11:'eleven', 12:'twelve', 13:'thirteen', 14:'fourteen', 15: 'fifteen',
		16:'sixteen', 17:'seventeen', 18:'eighteen', 19:'nineteen', 20:'twenty',
		30:'thirty', 40:'forty', 50:'fifty', 60:'sixty', 70:'seventy', 80:'eighty', 90:'ninety', 100:'hundred',
		1000: 'thousand', 1000000:'million', 1000000000:'billion', 1000000000000:'trillion', 1000000000000000:'quadrillion'};

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
		var out = '';
		if (n % 100 == 0){
			out = getPlace(n, 0, 1) + ' ' + numbers[100];
		}
		else{
			out = getPlace(n, 0, 1) + ' ' + numbers[100] + ' ' +numbers.conjunction+ ' ' + parse10s(parseInt(n.toString().substr(1,2)), true);
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
				piece = my.parseNumber(parseInt(piece));
			}

			out = piece + ' ' + (ctr >= 3 ? numbers[Math.pow(10,ctr)]:'') + ' ' + out;

			nStr = nStr.substr(0,nStr.length-3);
			ctr += 3;
		}
		out = my.parseNumber(nStr.substr(0,3)) + ' ' + numbers[Math.pow(10, ctr)] + ' ' + out;
		return out;
	}

	function andSingle(n){
		return numbers.conjunction+ ' ' + my.parseNumber(n);
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

module.exports = new englishNumberParser;
