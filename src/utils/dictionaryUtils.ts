import { WordType, DictionaryWord, WordCollection, Dictionary } from "../types/Dictionary";
import { arnd, arnds } from "./randUtils";


export function createWord(word: string, types: WordType[], categories?: string[]): DictionaryWord {

    if (types.includes(WordType.NOUN) && word.charAt(word.length - 1).toLowerCase() === "s" && !types.includes(WordType.PLURAL)) {
        types.push(WordType.PLURAL);
    }

    const [wordChecked, wovel] = getaAnThe(word);

    const dictionaryWord: DictionaryWord = {
        word: wordChecked,
        types: types,
        categories: categories ? categories : [],
        aAnThe: wovel
    };

    if (types.includes(WordType.PROPER)) {
        dictionaryWord.aAnThe = "the";
    }

    return dictionaryWord;

};

function getaAnThe(word: string): [string, "a" | "an" | "the"] {

    if (word.substring(0, 2).toLowerCase() === "a ") {
        return [word.substring(2), "a"];
    }

    if (word.substring(0, 3).toLowerCase() === "an ") {
        return [word.substring(3), "an"];
    }

    if (word.substring(0, 4).toLowerCase() === "the ") {
        return [word.substring(4), "the"];
    }

    return [word, "a"];
}

export function createWordCollection(words: string[], types: WordType[], categories?: string[]): WordCollection {

    const dictionaryWords: DictionaryWord[] = words.map((word: string) => {
        return createWord(word, types, categories);
    });

    const collection: WordCollection = {
        words: dictionaryWords,

        rnd: () => arnd(dictionaryWords),
        rndString: () => arnd(dictionaryWords).word,

        rnds: (amount: number, unique?: boolean) => arnds(dictionaryWords, amount, unique),
        rndsString: (amount: number, unique?: boolean) => arnds(dictionaryWords, amount, unique).map((w: DictionaryWord) => w.word),

    }
    return collection;
}

export function createDictionary(keys: string[], words: DictionaryWord[]) {

    if(keys.length !== words.length) {
        throw new Error("Array lengths of keys and words must be equal when creating a new Dictionary");
    }

    const wordMap = new Map<string, DictionaryWord>();

    const klen = keys.length;
    for(let i = 0; i < klen; i++) {
        wordMap.set(keys[i], words[i]);
    }

    function word(key: string): DictionaryWord|undefined {
        if(wordMap.has(key)) {
            return wordMap.get(key)
        }
    }

    function add(key: string, word: DictionaryWord): void {
        wordMap.set(key, word);
    }

    function rem(key: string): void {
        wordMap.delete(key)
    }

    const dictionary: Dictionary = {
        words: wordMap,
        word,
        add,
        rem
    };

    return dictionary;
}

