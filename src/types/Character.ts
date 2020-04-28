import { Color } from "../utils/colors";
import { Appearance } from "./Apperance";
import { Stats } from "./DnD";
import { Personality } from "./Personality";


export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
};

export enum CharacterSetting {
    EARTH = "Earth",
    FANTASY = "Fantasy",
    SCIFI = "Scifi",
    PATHFINDER = "Pathfinder",
};

export enum AgeGroup {
    BABY,
    CHILD,
    TEEN,
    YOUNGADULT,
    ADULT,
    MIDDLEAGE,
    ELDER,
    ANCIENT
}


export interface Character {
    id: string;
    name: Name;
    gender: Gender;
    characterSetting: CharacterSetting;
    age: Age;

    race: Race;
    // nationality: Nationality;

    appearance: Appearance;
    personality: Personality;

    stats: Stats;
}

export interface CharacterDraft {
    id: string;
    name: Name;
    gender: Gender;
    characterSetting: CharacterSetting;
    age?: Age;

    // These are generated after 
    race?: Race;
    nationality?: Nationality;

    // Optional information
    appearance?: Appearance;
    personality?: Personality;

    // Dnd info
    stats?: Stats;
}

export interface Name {
    firstNames: string[];
    lastName: string;
    previousNames: string[];
    nickNames: string[];
    fullName: string;
}

export interface Age {
    years: number;
    ageGroup: AgeGroup;
    ageGroupTxt: string;
    birthday?: string|Date;
}

export interface Race {
    name: string;
}

export interface Nationality {
    name: string;
}

export interface Story {
    story: string;
    when: number|string;
    personsRelated: string[];
}



export interface GenderOptionsLibrary {
    [Gender.MALE]: string[],
    [Gender.FEMALE]: string[],
    [Gender.OTHER]: string[]
}


// Adjective types

export type Quality = "Abysmal" | "Very Poor" | "Poor" | "Avarage" | "Good" | "Great" | "Masterclass";
export type Condition =
    | "Broken"
    | "Disrepair"
    | "Rough"
    | "Used"
    | "Good"
    | "Near mint"
    | "Excellet"
    | "New"
    | "Flawless";


