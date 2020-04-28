import { SettingsComplexRace, SettingsRaceAppearance, SettingsRaceAppearanceByGender } from "../../../types/Settings";
import { rnd } from "../../../utils/randUtils";
import { createWordCollection } from "../../../utils/dictionaryUtils";
import { WordType } from "../../../types/Dictionary";
import { Gender } from "../../../types/Character";

const genericAppearance: SettingsRaceAppearance = {
    avgHeight: 175,
    heightVariance: 25,
    avgWeight: 75,
    weightVariance: 40,
    maxAge: 80,
    adulthood: 18,
    firstNames: [],
    lastNames: ["Jumlond", "Jonalm", "Illa", "Mvulam", "Macosh", "Smith", "Nerbell", "Tillel", "Uhru", "Fensa", "Akej", "Grethur", "Zissash"],
    numberOfFirstNames: [1, 3],
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
    avgHeight: 177,
    heightVariance: 30,
    avgWeight: 77,
    weightVariance: 40,
    maxAge: 80,
    firstNames: ["Aakif", "Andrezi", "Arasmes", "Bahram", "Baolo", "Barid", "Batsaikhan", "Belor", "Budi", "Darvan", "Dolok", "Eilif", "Garidan", "Gellius", "Hadzi", "Hamengku", "Harisko", "Iacobus", "Jaali", "Jianguo", "Kjell", "Kousei", "Kronug", "Menas", "Mitabu", "Narsius", "Nonek", "Pateba", "Pratavh", "Qorchi", "Ragnar", "Rubani", "Seckor", "Shokamb", "Shuo", "Sunaki", "Suryo", "Tabansi", "Teruawa", "Thanh Liem", "Toan Hao", "Tomorbataar", "Tuong Kinh", "Ursion", "Vachedi", "Viorec", "Yekskya", "Zaiho", "Zhen"],
};

const femaleAppearance: SettingsRaceAppearanceByGender = {
    gender: Gender.FEMALE,
    avgHeight: 165,
    heightVariance: 28,
    avgWeight: 61,
    weightVariance: 30,
    maxAge: 85,
    firstNames: ["Alerdene", "Alinza", "Aula", "Bach Hien", "Belka", "Beshkee", "Chammady", "Chao", "Do Quyen", "Eshe", "Eudomia", "Gerda", "Hiriko", "Ilinica", "Indah", "Ingirt", "Izora", "Jalket", "Jayazi", "Kaede", "Kalizama", "Kamshi", "Lestari", "Leyli", "Marisan", "Me’amesa", "Meilin", "Mirelinda", "Mpaandi", "Nalmida", "Nanya", "Narantuyaa", "Ntisi", "Pasara", "Pontia", "Que Xuan", "Revhi", "Runa", "Sahba", "Shirin", "Shivkah", "Sinkitah", "Surenchinua", "Udara", "Umie", "Valki", "Waajida", "Xemne", "Xue", "Zalika", "Zova"],
};

export const Human: SettingsComplexRace = {
    name: "Human",
    generalAppearance: genericAppearance,
    appearancesPerGender: [
        maleAppearance,
        femaleAppearance
    ],
    statModifiers: () => {
        const mods = [0, 0, 0, 0, 0, 0];
        mods[rnd(0, 5)] = 2;
        return {
            strength: mods[0],
            dexterity: mods[0],
            constitution: mods[0],
            intelligence: mods[0],
            wisdom: mods[0],
            charisma: mods[0]
        };
    }
}




