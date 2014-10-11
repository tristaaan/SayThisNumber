var numberDictionary = (function(){
	var parsers = {
		english:   require('./parsers/englishNumberParser'),
		czech:     require('./parsers/czechNumberParser')
    french:    require('./parsers/frenchNumberParser'),
    icelandic: require('./parsers/icelandicNumberParser'),
    italian:   require('./parsers/italianNumberParser'),
    japanese:  require('./parsers/japaneseNumberParser'),
    norwegian: require('./parsers/norwegianNumberParser'),
    russian:   require('./parsers/russianNumberParser'),
    spanish:   require('./parsers/spanishNumberParser'),
    swedish:   require('./parsers/swedishNumberParser')
	};

	this.parseNumberForLanguage = function(n,l){
		console.log(n, l);
		if (this.hasLanguage(l))
			return parsers[l].parseNumber(n);
		else
			return 'language unsupported'
	}
	
	this.hasLanguage = function(l){
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
