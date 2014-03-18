var numberDictionary = (function(){
	var parsers = {english: require('./parsers/englishNumberParser')};

	this.parseNumberForLanguage = function(n,l){
		return parsers[l].parseNumber(n);
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