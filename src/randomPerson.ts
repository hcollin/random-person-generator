import { lastNames } from "./data/lastnames_fi";
import { maleFirstNames } from "./data/malefirstnames_fi";
import { femaleFirstNames } from "./data/femalefirstnames_fi";

import Gender from "./types/Gender";

import { Person } from "./types/Person";
import { rnd } from "./utils/randUtils";
import { createFinnishHetu } from "./socialSecurityNumber";
import { Address, getRandomAddress } from "./addressGenerator";
import { getRandomFinnishNameString } from "./nameGenerator";

export interface randomPersonOptions {
    gender?: Gender;
    age?: number;
    minAge?: number;
    maxAge?: number;
    name?: string;
    height?: number;
    weight?: number;
    birthday?: [number, number, number];
    address?: Address;
}

export function randomPerson(personOptions: randomPersonOptions|undefined): Person {
    const options: randomPersonOptions = personOptions !== undefined ? personOptions : {};
    const gender =
        options.gender !== undefined
            ? options.gender
            : Math.floor(Math.random() * 2) === 1
            ? Gender.MALE
            : Gender.FEMALE;

    const name = options.name || getRandomFinnishNameString(gender);

    const minAge = options.minAge || options.age || 15;
    const maxAge = options.maxAge ? options.maxAge : options.age ? options.age : gender === Gender.MALE ? 80 : 90;

    const ageObj = randomBirthday(minAge, maxAge);

    const age = ageObj.age;
    const height = options.height || Math.floor(Math.random() * 50) + (gender === Gender.MALE ? 155 : 140);
    const bmi = Math.floor(Math.random() * (gender === Gender.MALE ? 25 : 20)) + 15;

    const weight = options.weight || Math.round(bmi * ((height / 100) * (height / 100)) * 10) / 10;

    const hetu = createFinnishHetu(ageObj.day, ageObj.month, ageObj.year, gender);

    const person: Person = {
        name: name,
        hetu: hetu,
        age: age,
        birthday: `${ageObj.day}.${ageObj.month}.${ageObj.year}`,
        gender: gender,
        height: height,
        weight: weight,
        bmi: bmi,
        address: getRandomAddress(),
    };

    return person;
}

export interface birthdayObject {
    day: number;
    month: number;
    year: number;
    age: number;
}

export function randomBirthday(minAge: number, maxAge: number): birthdayObject {
    const month = rnd(1, 12);
    const day = rnd(1, month === 2 ? 28 : month % 2 === 0 ? 30 : 31);

    const age = rnd(minAge, maxAge);
    const year = new Date().getFullYear() - age;

    const ageInMs = age * 525600000 * 60;
    const bDate = new Date(year, month - 1, day);

    const notYet = bDate.valueOf() + ageInMs > Date.now();

    return {
        day: day,
        month: month,
        year: notYet ? year - 1 : year,
        age: age,
    };
}
