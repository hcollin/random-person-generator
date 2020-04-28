import { Character, CharacterDraft, Gender, AgeGroup } from "../types/Character";
import { Stats } from "../types/DnD";
import { rnd } from "../utils/randUtils";
import { BodyType } from "../types/Apperance";
import { getSettingRaceForCharacter } from "./raceGenerator";

export function createDndStats(character: Character | CharacterDraft): Stats {
    const looksKey: string =
        character.appearance?.body.keywords.find((v: string) => v.includes("looks-level")) || "looks-like-5";

    const looksNum: number = Number(looksKey.slice(-1));
    const chaBase = rnd(9, 11);
    const cha = chaBase + (looksNum - 4);
    // console.log(`${looksKey}: ${chaBase} + ${looksNum -4} = ${cha}`);

    const race = getSettingRaceForCharacter(character);

    const min: number = 7;
    const max: number = 14;

    const stats: Stats = {
        strenght: rnd(min, max),
        dexterity: rnd(min, max),
        constitution: rnd(min, max),
        intelligence: rnd(min, max),
        wisdom: rnd(min, max),
        charisma: cha,
    };

    // Body type adjustment
    if (character.appearance?.body.bodyType) {
        switch (character.appearance?.body.bodyType) {
            case BodyType.MESOMORPH:
                adjustStats(stats, [2, 0, 0, 0, 0, 1]);
                break;
            case BodyType.ENDOMORPH:
                adjustStats(stats, [3, -1, 2, 0, 0, -1]);
                break;
            case BodyType.ECTOMORPH:
                adjustStats(stats, [-1, 3, 0, 0, 0, +1]);
                break;
            default:
                break;
        }
    }

    // Race adjustment

    adjustStats(stats, race.stats);

    // Gender adjustment
    switch (character.gender) {
        case Gender.MALE:
            adjustStats(stats, [1, 0, 1, 1, 0, 0]);
            break;
        case Gender.FEMALE:
            adjustStats(stats, [0, 1, 0, 0, 1, 1]);
            break;
        case Gender.OTHER:
            adjustStats(stats, [0, 0, 1, 1, 2, -2]);
            break;
        default:
            break;
    }

    // age adjustment
    if (character.age?.ageGroup) {
        switch (character.age?.ageGroup) {
            case AgeGroup.CHILD:
                adjustStats(stats, [-4, 2, 1, -1, -3, +3]);
                break;
            case AgeGroup.TEEN:
                adjustStats(stats, [-1, -1, -1, 0, -2, +1]);
                break;
            case AgeGroup.YOUNGADULT:
                adjustStats(stats, [0, +1, +1, 0, -1, +2]);
                break;
            case AgeGroup.ADULT:
                adjustStats(stats, [0, 0, 0, +1, 0, 0]);
                break;
            case AgeGroup.MIDDLEAGE:
                adjustStats(stats, [-1, -1, -1, +1, +1, 0]);
                break;
            case AgeGroup.ELDER:
                adjustStats(stats, [-2, -2, -2, +2, +3, -1]);
                break;
            case AgeGroup.ANCIENT:
                adjustStats(stats, [-4, -3, -4, +1, +4, 0]);
                break;
            default:
                break;
        }
    }

    if (character.appearance?.body.keywords) {
        const keys = character.appearance.body.keywords;

        // Weight adjustment
        if (keys.includes("OVERWEIGHT")) {
            adjustStats(stats, [1, -1, 0, 0, 0, 0]);
        }
        if (keys.includes("MASSIVE")) {
            adjustStats(stats, [2, -3, 0, 0, 0, -2]);
        }

        if (keys.includes("THIN")) {
            adjustStats(stats, [0, 1, -1, 0, 0, 0]);
        }
        if (keys.includes("STARVING")) {
            adjustStats(stats, [-1, 1, -3, 0, 0, 0]);
        }

        if (keys.includes("TALL")) {
            adjustStats(stats, [0, -1, 0, 0, 0, 1]);
        }
        if (keys.includes("GIANT")) {
            adjustStats(stats, [2, -2, 0, 0, 0, -1]);
        }
        if (keys.includes("SMALL")) {
            adjustStats(stats, [-1, 1, 0, 0, 0, 0]);
        }
        if (keys.includes("TINY")) {
            adjustStats(stats, [-2, 2, 0, 0, 0, -2]);
        }
    }

    return stats;
}

function adjustStats(stats: Stats, adjustment: [number, number, number, number, number, number]) {
    stats.strenght = stats.strenght + adjustment[0];
    stats.dexterity = stats.dexterity + adjustment[1];
    stats.constitution = stats.constitution + adjustment[2];
    stats.intelligence = stats.intelligence + adjustment[3];
    stats.wisdom = stats.wisdom + adjustment[4];
    stats.charisma = stats.charisma + adjustment[5];
}
