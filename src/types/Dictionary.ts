
export enum WordType {
    ADJECTIVE = "Adjective",
    NOUN = "Noun",
    OBJECTIVE = "Objective",
    VERB = "Objective",
    ADVERB = "Adverb",
    PROPER = "Proper",
    SINGULAR = "Singular",
    PLURAL = "Plural",
};

export interface DictionaryWord {
    word: string;
    categories: string[];
    types: WordType[];
    aAnThe: "a"|"an"|"the";
};

export interface WordCollection {
    rnd: () => DictionaryWord;
    rndString: () => string;
    
    rnds: (amount: number, unique?: boolean) => DictionaryWord[];
    rndsString: (amount: number, unique?: boolean) => string[];
    
    words: DictionaryWord[];
}

export interface Dictionary {
    word: (key: string) => DictionaryWord|undefined;
    add: (key:string, word: DictionaryWord) => void;
    rem: (key: string) => void;

    words: Map<string, DictionaryWord>;
};

