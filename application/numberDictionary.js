var errors = require('./errors');
var numberDictionary = (function(){
    var parsers = {
        chineseSimplified:    require('./parsers/chineseNumeralsSimplifiedNumberParser'),
        chineseTraditional:   require('./parsers/chineseNumeralsTraditionalNumberParser'),
        chinesePinyin:        require('./parsers/chinesePinyinNumberParser'),
        czech:                require('./parsers/czechNumberParser'),
        dutch:                require('./parsers/dutchNumberParser'),
        english:              require('./parsers/englishNumberParser'),
        french:               require('./parsers/frenchNumberParser'),
        german:               require('./parsers/germanNumberParser'),
        icelandic:            require('./parsers/icelandicNumberParser'),
        italian:              require('./parsers/italianNumberParser'),
        japaneseHiragana:     require('./parsers/japaneseHiraganaNumberParser'),
        japaneseKanji:        require('./parsers/japaneseKanjiNumberParser'),
        japaneseRomaji:       require('./parsers/japaneseRomajiNumberParser'),
				latin:								require('./parsers/latinNumberParser'),
        norwegian:            require('./parsers/norwegianNumberParser'),
        portuguese:           require('./parsers/portugueseNumberParser'),
        russian:              require('./parsers/russianNumberParser'),
        spanish:              require('./parsers/spanishNumberParser'),
        swedish:              require('./parsers/swedishNumberParser')
    };

    this.parseNumberForLanguage = function(n,l){
        console.log(n, l);
        if (!this.hasLanguage(l)){
            return errors.unsupported;
        }
        else if (n > Math.pow(10, 15)){
            return errors.numberTooLarge;
        }
        else if (n < -Math.pow(10, 15)){
            return errors.numberTooSmall;
        }
        else {
            return parsers[l].parseNumber(n);   
        }
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
})();

module.exports = numberDictionary;