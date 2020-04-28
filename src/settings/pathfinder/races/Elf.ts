import { SettingsComplexRace, SettingsRaceAppearance, SettingsRaceAppearanceByGender } from "../../../types/Settings";
import { rnd } from "../../../utils/randUtils";
import { createWordCollection } from "../../../utils/dictionaryUtils";
import { WordType } from "../../../types/Dictionary";
import { Gender } from "../../../types/Character";

const genericAppearance: SettingsRaceAppearance = {
    avgHeight: 180,
    heightVariance: 25,
    avgWeight: 75,
    weightVariance: 40,
    maxAge: 800,
    adulthood: 110,
    firstNames: [],
    lastNames: ["Jumlond", "Jonalm", "Illa", "Mvulam", "Macosh", "Smith", "Nerbell", "Tillel", "Uhru", "Fensa", "Akej", "Grethur", "Zissash"],
    numberOfFirstNames: [1, 1],
    heightDescriptionWords: {
        average: createWordCollection(["medium sized", "normal sized"], [WordType.ADJECTIVE], []),
    },
    weightDescriptionWords: {
        average: createWordCollection(["medium sized", "normal sized"], [WordType.ADJECTIVE], []),
    },
    appearanceKeywords: [],
    hairColors: ["black", "brown"],
    skinColors: ["ivory",
        "sienna",
        "sand",
        "chocolate",
        "bronze",
        "amber",
        "beige",
        "golden",
        "espresso",
        "umber",
        "limestone"]
};

const maleAppearance: SettingsRaceAppearanceByGender = {
    gender: Gender.MALE,
    avgHeight: 182,
    heightVariance: 25,
    avgWeight: 61,
    weightVariance: 30,
    maxAge: 800,
    firstNames:  ["Caladrel", "Heldalel, Lanliss, Meirdrarel, Seldlon, Talathel, Variel, Zordlon"],
};

const femaleAppearance: SettingsRaceAppearanceByGender = {
    gender: Gender.FEMALE,
    avgHeight: 177,
    heightVariance: 25,
    avgWeight: 49,
    weightVariance: 20,
    maxAge: 850,
    firstNames: ["Amrunelara", "Dardlara", "Faunra", "Jathal", "Merisiel", "Oparal", "Soumral", "Tessara", "Yalandlara"],
};

export const Elf: SettingsComplexRace = {
    name: "Elf",
    generalAppearance: genericAppearance,
    appearancesPerGender: [
        maleAppearance,
        femaleAppearance
    ],
    statModifiers: {
            strength: 0,
            dexterity: 2,
            constitution: -2,
            intelligence: 2,
            wisdom: 0,
            charisma: 0
    }
}




