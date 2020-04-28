import Gender from "./types/Gender";
import { lastNames } from "./data/lastnames_fi";
import { maleFirstNames } from "./data/malefirstnames_fi";
import { femaleFirstNames } from "./data/femalefirstnames_fi";
import { arnd, rnd } from "./utils/randUtils";

export function getRandomFinnishNameString(gender: Gender): string {
    const lName = arnd(lastNames);
    const fName = gender === Gender.MALE ? arnd(maleFirstNames) : arnd(femaleFirstNames);
    return `${fName} ${lName}`;
}

export interface RandomFinnishNameOptions {
    gender?: Gender;
    firstNameCount?: number;
    twoPartLastName?: boolean;
}

export interface FinnishNameObject {
    firstNames: string[];
    lastNames: string[];
    gender: Gender;
    name: string;
}

export function getRandomFinnishName(options: RandomFinnishNameOptions): FinnishNameObject {
    
    const opts = options || {};

    const g =  opts.gender ? opts.gender : rnd(0, 1);

    const fCount = opts.firstNameCount || 1;
    const lCount = opts.twoPartLastName === true ? 2 : 1;

    const personFirstNames = [];
    for (let i = 0; i < fCount; i++) {
        personFirstNames.push(g === Gender.MALE ? arnd(maleFirstNames) : arnd(femaleFirstNames));
    }

    const personLastNames = [];
    for (let i = 0; i < lCount; i++) {
        personLastNames.push(arnd(lastNames));
    }

    const oneLineName = `${personFirstNames.join(" ")} ${personLastNames.join("-")}`;

    return {
        firstNames: personFirstNames,
        lastNames: personLastNames,
        gender: g,
        name: oneLineName,
    };
}
