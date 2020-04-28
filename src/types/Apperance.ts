import { Story, CharacterSetting, Quality, Condition, Gender } from "./Character";
import { Color } from "../utils/colors";


export type bodyPart =
    | "Head"
    | "Torso"
    | "Arms"
    | "Legs"
    | "Feet"
    | "Hands"
    | "Finger"
    | "Neck"
    | "Face"
    | "Waist"
    | "Left Arm"
    | "Right Arm"
    | "Left Leg"
    | "Right Arm";

export enum BodyType {
    ECTOMORPH = "Ectomorph",
    MESOMORPH = "Mesomorph",
    ENDOMORPH = "Endomorph"
};

export interface Appearance {
    body: Body;
    clothes: Outfit;
    wardrobe: Outfit[];
}

export interface Body {
    skinColor: Color;
    hair: Hair;
    bodyType: BodyType;
    height: number;
    weight: number;
    bmi: number;
    baseBmi: number;
    scars: Scar[];
    tattoos: Tattoo[];
    keywords: string[];
    description: string;
}

export interface Face {
    eyeColor: Color;
    eyeShape: string;
    nose: string;
    mouth: string;
    ears: string;
    scars: Scar[];
    tattoos: Tattoo[];
}

export interface Scar {
    type: string;
    size: string;
    location: string;
    story: Story;
}

export interface Tattoo {
    colors: Color[];
    shape: string;
    location: string;
    story: Story;
}

export interface Hair {
    color: Color;
    style: string;
    facialHair?: string;
}

export interface Outfit {
    currentlyWearing: boolean;
    suitableFor: string[];
    clothes: Cloth[];
    dirtyness: number;
}

export interface Cloth {
    name: string;
    type: string;
    setting: CharacterSetting;
    quality: Quality;
    condition: Condition;
    color: Color;
    keywords: string[];
    size: string;
    forGenders: Gender[];
    target: bodyPart[];
}
