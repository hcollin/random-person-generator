import Gender from "./types/Gender";
import { rnd, prnd } from "./utils/randUtils";

const hetumarc = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
];

export function createFinnishHetu(day: number, month: number, year: number, gender: Gender): string {
    const part = `${prnd(0, 99)}${gender === Gender.FEMALE ? rnd(0, 4) * 2 : rnd(1, 5) * 2 - 1}`;

    const ageStrs = {
        day: day.toString().padStart(2, "0"),
        month: month.toString().padStart(2, "0"),
        year: year.toString().slice(2, 4),
    };

    const secChar = hetumarc[Number(`${ageStrs.day}${ageStrs.month}${ageStrs.year}${part}`) % 31];

    const hetu = `${ageStrs.day}${ageStrs.month}${ageStrs.year}${year < 2000 ? "-" : "A"}${part}${secChar}`;

    return hetu;
}

/**
 * Validate Finnish Social Security Number
 *
 * @param hetu
 */
export function validateHetu(hetu: string): boolean {
    const ssnNumber = Number(`${hetu.slice(0, 6)}${hetu.slice(7, 10)}`);

    const secNum = ssnNumber % 31;
    const secChar = hetumarc[secNum];

    return secChar === hetu.slice(10, 11);
}
