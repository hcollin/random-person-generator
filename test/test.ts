import { roll, grnd, reps, rnd, arnd } from "../src/utils/randUtils";
import { createCharacter } from "../src/characterGenerator";
import { CharacterSetting, Gender, AgeGroup, Character } from "../src/types/Character";
import { getPersonalityDescription } from "../src/generators/personalityGenerator";


function getEarthCharacter() {
    return createCharacter({ setting: CharacterSetting.EARTH, gender: Gender.MALE });
}

function getPathfinderCharacter() {
    return createCharacter({ setting: CharacterSetting.PATHFINDER});
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

reps(8, () => {
    printCharacter(getPathfinderCharacter());
});
