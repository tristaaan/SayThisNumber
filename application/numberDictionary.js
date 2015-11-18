var errors = require('./errors');
var numberDictionary = (function(){
    var parsers = {
        english:              require('./parsers/englishNumberParser'),
        czech:                require('./parsers/czechNumberParser'),
        french:               require('./parsers/frenchNumberParser'),
        icelandic:            require('./parsers/icelandicNumberParser'),
        italian:              require('./parsers/italianNumberParser'),
        japaneseHiragana:     require('./parsers/japaneseHiraganaNumberParser'),
        japaneseKanji:        require('./parsers/japaneseKanjiNumberParser'),
        japaneseRomaji:       require('./parsers/japaneseRomajiNumberParser'),
        norwegian:            require('./parsers/norwegianNumberParser'),
        russian:              require('./parsers/russianNumberParser'),
        spanish:              require('./parsers/spanishNumberParser'),
        swedish:              require('./parsers/swedishNumberParser'),
        german:               require('./parsers/germanNumberParser'),
        chineseSimplified:    require('./parsers/chineseNumeralsSimplifiedNumberParser'),
        chineseTraditional:   require('./parsers/chineseNumeralsTraditionalNumberParser'),
        chinesePinyin:        require('./parsers/chinesePinyinNumberParser'),
        dutch:                require('./parsers/dutchNumberParser'),
        portuguese:                require('./parsers/portugueseNumberParser')
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