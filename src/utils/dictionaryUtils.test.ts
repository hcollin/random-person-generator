
import { createWord, createWordCollection } from './dictionaryUtils';
import { DictionaryWord, WordType, WordCollection } from '../types/Dictionary';


describe("Dictionary", () => {

    describe("DictionaryWord", () => {

        it("Create a simple adjective Word", () => {
            const word: DictionaryWord = createWord("Good", [WordType.ADJECTIVE], ["adj:good"]);

            expect(word.word).toBe("Good");
            expect(word.aAnThe).toBe("a");
            expect(word.types).toContain(WordType.ADJECTIVE);
            expect(word.categories).toContain("adj:good");
        });

        it("Create a plural word automatically", () => {
            const word: DictionaryWord = createWord("Cars", [WordType.NOUN], ["sub:car"]);

            expect(word.word).toBe("Cars");
            expect(word.aAnThe).toBe("a");
            expect(word.types).toContain(WordType.NOUN);
            expect(word.types).toContain(WordType.PLURAL);
            expect(word.categories).toContain("sub:car");
        });

        it("Capture a/an", () => {
            const car: DictionaryWord = createWord("a car", [WordType.NOUN], ["sub:car"]);
            const honor: DictionaryWord = createWord("an honor", [WordType.NOUN], ["sub:car"]);
            const house: DictionaryWord = createWord("the house", [WordType.NOUN], ["noun:house"]);

            expect(car.aAnThe).toBe("a");
            expect(car.word).toBe("car");
            expect(honor.aAnThe).toBe("an");
            expect(honor.word).toBe("honor");
            expect(house.aAnThe).toBe("the");
            expect(house.word).toBe("house");
        });

    });

    describe("WordCollection", () => {

        it("Create a word collection", () => {
            const words: WordCollection = createWordCollection(["Good", "Nice"], [WordType.ADJECTIVE], ["adj:good"]);
            expect(words.words.length).toBe(2);
        });

        it("Return random value", () => {
            const words: WordCollection = createWordCollection(["Good"], [WordType.ADJECTIVE], ["adj:good"]);
            expect(words.words.length).toBe(1);
            expect(words.rnd().word).toBe("Good");
            expect(words.rndString()).toBe("Good");
        });

        it("Get multiple random values", () => {
            const words: WordCollection = createWordCollection(["Good", "Nice", "Splendid"], [WordType.ADJECTIVE], ["adj:good"]);
            expect(words.words.length).toBe(3);

            const anyTwo: DictionaryWord[] = words.rnds(2);
            expect(anyTwo.length).toBe(2);

            const uniqueThree = words.rndsString(3, true);
            expect(uniqueThree.length).toBe(3);
            expect(uniqueThree).toContain("Good");
            expect(uniqueThree).toContain("Nice");
            expect(uniqueThree).toContain("Splendid");
        });

    });
    
});
