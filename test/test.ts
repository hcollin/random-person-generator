import { roll, grnd, reps, rnd, arnd } from "../src/utils/randUtils";
import { getRandomAddress } from "../src/addressGenerator";
import { findColors } from "../src/utils/colors";
import { createAppearance } from "../src/metaGenerators/appearance";
import { createCharacter } from "../src/characterGenerator";
import { CharacterSetting, Gender, AgeGroup, Character } from "../src/types/Character";
import { getPersonalityDescription } from "../src/generators/personalityGenerator";
import dummyGenerator, { ColumnOptions, ColumnGeneratorType } from "../src/generators/dummyGenerator";

const assert = require("assert");
const {
    randomFinnishPerson,
    randomFinnishMale,
    randomFinnishFemale,
    randomFinnishAddress,
    randomBirthday,
    randomFinnishName,
    validateFinnishSocialSecurityNumber,
} = require("..");

function gaussianRandTest(
    avg?: number,
    repeats?: number,
    strength?: number,
    min?: number,
    max?: number,
    showAll?: boolean
) {
    interface resp {
        [key: number]: number;
    }

    const res: number[] = [];
    const m = avg || 50;
    const s = repeats || 20;
    const d = strength || 2;
    const times = 100000;
    for (let i = 0; i < times; i++) {
        const r = grnd(m, s, d, min, max);

        if (res[r] === undefined) {
            res[r] = 0;
        }

        res[r]++;
    }

    const dlmin = typeof min === "number" && showAll !== true ? min + 1 : m - s * d;
    const dlmax = typeof max === "number" && showAll !== true ? max + 1 : m + s * d;
    for (let i = dlmin; i < dlmax; i++) {
        const v = res[i] || 0;

        const per = Math.round((v / times) * 100);
        const viz = Math.round((v / times) * 500);

        console.log(`${String(i).padEnd(4, " ")}: ${String(v).padEnd(6, " ")} ${per}% \t ${"=".repeat(viz)}`);
    }
}

function getEarthCharacter() {
    return createCharacter({ setting: CharacterSetting.EARTH, gender: Gender.MALE });
}

function getPathfinderCharacter() {
    return createCharacter({ setting: CharacterSetting.PATHFINDER, race: "Dwarf"});
}

function printCharacter(char: Character) {
    try {
        console.log(
            `${char.name.fullName} is a ${
                char.age.years
            } years old ${char.age.ageGroupTxt.toLocaleLowerCase()} ${char.race.name.toLocaleLowerCase()} ${char.gender.toLocaleLowerCase()}. \n${
                char.appearance.body.description
            }`
        );
        console.log(getPersonalityDescription(char), "\n");
        // console.log(`STR: ${char.stats.strenght} DEX: ${char.stats.dexterity} CON: ${char.stats.constitution} INT: ${char.stats.intelligence} WIS: ${char.stats.wisdom} CHA: ${char.stats.charisma}`);
        // console.log(`Height: ${char.appearance.body.height} Weight: ${char.appearance.body.weight} BMI: ${char.appearance.body.bmi} BODY: ${char.appearance.body.bodyType}`);

        // console.log("\n\n");
    } catch (e) {
        console.error(e);
        console.log(char);
        throw "DIE";
    }
}

function dummyGeneratorTest() {
    const columns: ColumnOptions[] = [
        {
            type: ColumnGeneratorType.NAME,
            key: "name",
        },
        {
            type: ColumnGeneratorType.ARRAY,
            key: "stats",
            params: {
                amount: 6,
                subValueType: {
                    type: ColumnGeneratorType.NUMBER,
                    key: "",
                    params: {
                        min: 3,
                        max: 18,
                    },
                },
            },
        },
        {
            type: ColumnGeneratorType.FLOAT,
            key: "fl",
            params: {
                digits: 5,
                min: 50,
            },
        },
        {
            type: ColumnGeneratorType.TIMESTAMP,
            key: "bday",
            params: {
                from: new Date(1978, 1, 1),
                to: new Date(1979, 1, 1),
                locale: "fi-FI",
            },
        },
        {
            type: ColumnGeneratorType.OPTIONS,
            key: "cclass",
            params: {
                options: ["Fighter", "Wizard", "Ranger", "Priest", "Sorcerer", "Bard", "Barbarian"],
            },
        },
        {
            type: ColumnGeneratorType.OBJECT,
            key: "address",
            params: {
                subObject: [
                    {
                        type: ColumnGeneratorType.OPTIONS,
                        key: "street",
                        params: {
                            options: ["Katu 1", "Tie 2", "Polku 3"],
                        },
                    },
                    {
                        type: ColumnGeneratorType.NUMBER,
                        key: "zip",
                        params: {
                            min: 10000,
                            max: 99999,
                        },
                    },
                ],
            },
        },
    ];

    const results = dummyGenerator(columns, 5);

    interface Hahmo {
        name: string;
        stats: [number, number, number, number, number, number];
        cclass: string;
    }

    const hahmo = <Hahmo>results[0];
    console.log("CHAR:", hahmo);
}

// dummyGeneratorTest();

reps(8, () => {
    printCharacter(getPathfinderCharacter());
});

// console.log(getEarthCharacter());

// gaussianRandTest(50, 20, 5, 0, 100);
// gaussianRandTest(175, 10, 3);

// reps(30, () => console.log(grnd(50, 10, 2)));

// for (let i = 0; i < 30; i++) {
// const character = createCharacter({setting: CharacterSetting.EARTH});
// console.log(`${character.race.name} ${character.gender}\t ${character.name.fullName} `);

// console.log(character);
// }

// for (let i = 0; i < 100; i++) {
//     // console.log(randomFinnishAddress().oneLine);
//     console.log(randomFinnishName({ gender: 1, firstNameCount: 3, twoPartLastName: true }).name);
// }

// console.log(randomBirthday());

// console.log(randomFinnishName({gender: 1}));

// const person = randomFinnishPerson({gender: 0, age: 41, height: 186});

// const targetColor = ["yellow", "tangerine"];
// const results = findColors(targetColor, true)
// console.log(`${targetColor} (${results.length}): `, results);

// const person = randomFinnishPerson();
// console.log(person);

// console.log(createAppearance(person));

// const male = randomFinnishMale();
// console.table(male);

// assert.equal(male.gender, 0);
// assert.equal(Number(male.hetu.slice(9,10)) % 2, 1);

// const female = randomFinnishFemale();
// console.table(female);
// assert.equal(female.gender, 1);
// assert.equal(Number(female.hetu.slice(9,10)) % 2, 0);
