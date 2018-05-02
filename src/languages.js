import chinesePinyin      from './parsers/chinesePinyinNumberParser';
import chineseSimplified  from './parsers/chineseNumeralsSimplifiedNumberParser';
import chineseTraditional from './parsers/chineseNumeralsTraditionalNumberParser';
import czech              from './parsers/czechNumberParser';
import dutch              from './parsers/dutchNumberParser';
import emoji              from './parsers/keycapEmojiParser';
import english            from './parsers/englishNumberParser';
import estonian           from './parsers/estonianNumberParser';
import french             from './parsers/frenchNumberParser';
import german             from './parsers/germanNumberParser';
import icelandic          from './parsers/icelandicNumberParser';
import italian            from './parsers/italianNumberParser';
import japaneseHiragana   from './parsers/japaneseHiraganaNumberParser';
import japaneseKanji      from './parsers/japaneseKanjiNumberParser';
import japaneseRomaji     from './parsers/japaneseRomajiNumberParser';
import norwegian          from './parsers/norwegianNumberParser';
import portuguese         from './parsers/portugueseNumberParser';
import russian            from './parsers/russianNumberParser';
import spanish            from './parsers/spanishNumberParser';
import swedish            from './parsers/swedishNumberParser';

export default {
  chinese: {
    default: 'simplified',
    simplified: chineseSimplified,
    traditional: chineseTraditional,
    pinyin: chinesePinyin
  },
  czech,
  dutch,
  emoji,
  english,
  estonian,
  french,
  german,
  icelandic,
  italian,
  japanese: {
    default: 'kanji',
    kanji: japaneseKanji,
    hiragana: japaneseHiragana,
    romanji: japaneseRomaji
  },
  norwegian,
  portuguese,
  russian,
  spanish,
  swedish
};
