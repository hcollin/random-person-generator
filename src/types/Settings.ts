import { CharacterSetting, Name, Gender } from "./Character";
import { WordCollection, KeyedWordCollections } from "./Dictionary";

export interface SettingsApi {
    getMeta: () => SettingsMetadata;
    getRaces: () => SettingsRaceData[];
    getNations: () => SettingsNationData[];
    getNames: () => SettingsNameData[];
}

export interface SettingsData {
    id: string;
    meta: SettingsMetadata;
    names: SettingsNameData[];
    races: SettingsRaceData[];
    nations: SettingsNationData[];
}

export interface SettingsMetadata {
    id: string;
    type: CharacterSetting;
    name: string;
    author: string;
    version: string;
}

export interface SettingsNameData {
    name: string;
    asFirstName: boolean;
    asLastName: boolean;
    forRaces: string[];
    forNationalities: string[];
    forGenders: Gender[];
}

export interface SettingsRaceData {
    name: string;
    ages: number[];         // Typical ages for different Genders
    height: number[];       // Typical heights for different Genders
    weight: number[];       // Typical weights for different Genders
    variance: number[];       // Variance from typical age and height in percentage
    adulthood: number[];      // Age when adulthood statistics are reached for each gender
    keywords: [string, any][];
    stats: [number, number, number, number, number, number];
}

export interface SettingsComplexRace {
    name: string;
    generalAppearance: SettingsRaceAppearance;
    appearancesPerGender: SettingsRaceAppearanceByGender[];
    statModifiers: SettingsStats|SettingsStatsFunction;
}

export interface SettingsRaceAppearance {
    gender?: Gender[];
    avgHeight: number;
    avgWeight: number;
    heightVariance: number;
    weightVariance: number;
    maxAge: number;
    adulthood: number;
    skinColors: string[];
    hairColors: string[];
    appearanceKeywords: [string, number|undefined, string|undefined][];
    
    firstNames: string[];
    lastNames: string[];
    numberOfFirstNames: [number, number];

    heightDescriptionWords: KeyedWordCollections;
    weightDescriptionWords: KeyedWordCollections;
};


export interface SettingsRaceAppearanceByGender {
    gender: Gender;
    avgHeight?: number;
    avgWeight?: number;
    heightVariance?: number;
    weightVariance?: number;
    maxAge?: number;
    adulthood?: number;
    skinColors?: string[];
    hairColors?: string[];
    appearanceKeywords?: [string, number|undefined, string|undefined][];
    
    firstNames?: string[];
    lastNames?: string[];
    numberOfFirstNames?: [number, number];

    heightDescriptionWords?: KeyedWordCollections;
    weightDescriptionWords?: KeyedWordCollections;
}


export interface SettingsStats {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export type SettingsStatsFunction = () => SettingsStats;

export interface SettingsNationData {
    name: string;
    capital: SettingsCityData;
}

export interface SettingsCityData {
    name: string;
}
