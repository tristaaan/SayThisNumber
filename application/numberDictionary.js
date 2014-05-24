var numberDictionary = (function(){
	var parsers = {english: require('./parsers/englishNumberParser'),
				   spanish: require('./parsers/spanishNumberParser'),
				   japanese: require('./parsers/japaneseNumberParser')};

	this.parseNumberForLanguage = function(n,l){
		console.log(n, l);
		if (hasLanguage(l))
			return parsers[l].parseNumber(n);
		else
			return 'language unsupported.'
	}
	
	function hasLanguage(l){
		return Object.keys(parsers).indexOf(l) >= 0;
	}	

	this.supportedLanguages = function(){
		return Object.keys(parsers);
	}

	this.numberOfSupportedLanguages = function(){
		return Object.keys(parsers).length;
	}

	return this;
})()

module.exports = numberDictionary;
