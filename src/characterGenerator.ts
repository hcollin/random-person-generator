import { Character, CharacterSetting, Gender, CharacterDraft, Age, AgeGroup } from "./types/Character";
import { rnd, arnd } from "./utils/randUtils";
import { createName } from "./generators/nameGenerator";
import { loadSetting } from "./settings/Settings";
import { SettingsRaceData } from "./types/Settings";
import { raceGenerator, getSettingRaceForCharacter } from "./generators/raceGenerator";
import appearanceGenerator from "./generators/appearanceGenerator";
import { createDndStats } from "./generators/dndStatsGenerator";
import { createPersonality } from "./generators/personalityGenerator";

interface createCharacterOptions {
    setting?: CharacterSetting;
    race?: string;
    gender?: Gender;
    ageGroup?: AgeGroup;
}

export function createCharacter(options: createCharacterOptions): Character {
    const settingKey =
        options.setting || arnd([CharacterSetting.EARTH, CharacterSetting.FANTASY, CharacterSetting.SCIFI]);

    const settingsApi = loadSetting(settingKey);

    const raceNames: string[] = settingsApi.getRaces().map((r: SettingsRaceData) => r.name);

    const gender =
        options.gender || arnd([Gender.MALE, Gender.FEMALE, Gender.MALE, Gender.FEMALE, Gender.MALE, Gender.FEMALE]); // , Gender.OTHER

    const id = `char-${settingKey}-${rnd(100000, 999999)}-${Date.now()}`;
    const char: CharacterDraft = {
        id: id,
        name: createName(settingKey, gender),
        gender: gender,
        characterSetting: settingKey,
    };

    char.race = raceGenerator(char, options.race);
    char.age = calculateAge(char, options.ageGroup);
    char.appearance = appearanceGenerator(char);
    char.personality = createPersonality(char);
    char.stats = createDndStats(char);

    const raceName = char.race?.name || undefined;
    console.log("RACE NAME", raceName);
    char.name = createName(settingKey, gender, raceName);
    const character = <Character>char;

    return character;
}

function calculateAge(character: Character | CharacterDraft, targetAgeGroup?: AgeGroup): Age {
    const ageGroup: AgeGroup =
        targetAgeGroup !== undefined
            ? targetAgeGroup
            : arnd([
                  AgeGroup.CHILD,
                  AgeGroup.TEEN,
                  AgeGroup.TEEN,
                  AgeGroup.YOUNGADULT,
                  AgeGroup.YOUNGADULT,
                  AgeGroup.YOUNGADULT,
                  AgeGroup.YOUNGADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.ADULT,
                  AgeGroup.MIDDLEAGE,
                  AgeGroup.MIDDLEAGE,
                  AgeGroup.MIDDLEAGE,
                  AgeGroup.MIDDLEAGE,
                  AgeGroup.MIDDLEAGE,
                  AgeGroup.ELDER,
                  AgeGroup.ELDER,
                  AgeGroup.ANCIENT,
              ]);

    const race = getSettingRaceForCharacter(character);

    const index = character.gender === Gender.MALE ? 0 : character.gender === Gender.FEMALE ? 1 : 2;

    const avgLifeSpan = race.ages[index];
    const adulthood = race.adulthood[index];

    const ageGroupText: string[] = ["Baby", "Child", "Teen", "Young adult", "Adult", "Middle Age", "Elder", "Ancient"];

    const ageLimits = [
        1,
        Math.floor(adulthood * 0.4),
        Math.floor(adulthood * 0.7),
        adulthood,
        Math.floor(adulthood + (avgLifeSpan - adulthood) * 0.15),
        Math.floor(avgLifeSpan * 0.5),
        Math.floor(avgLifeSpan * 0.81),
        Math.floor(avgLifeSpan * 1.05),
        Math.floor(avgLifeSpan * 1.3),
    ];

    const age: Age = {
        years: rnd(ageLimits[ageGroup], ageLimits[ageGroup + 1]),
        ageGroup: ageGroup,
        ageGroupTxt: ageGroupText[ageGroup],
    };

    return age;
}
