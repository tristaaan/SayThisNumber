var numberDictionary = (function(){
	var parsers = {english: require('./parsers/englishNumberParser')};

	this.parseNumberForLanguage = function(n,l){
		return parsers[l].parseNumber(n);
	}

	return this;
})()

module.exports = numberDictionary;