import { Person } from "../types/Person";
import { Color, findColors } from "../utils/colors";
import { arnd, rnd, roll } from "../utils/randUtils";
import Gender from "../types/Gender";

export interface personAppearance {
    hairColor: Color;
    hairStyle: string;
    facialHair?: string;
    skinColor: Color;
    glasses: boolean;
    bodyType: string;
}

export function createAppearance(person: Person): personAppearance {
    const maleHairStyles: string[] = [
        "Bald",
        "Fade",
        "Pompadour",
        "Comb Over",
        "Faux Hawk",
        "Spiky",
        "Crew Cut",
        "Man Bun",
        "Shoulder Length",
        "Long Straight",
        "French Crop",
        "Fringe",
        "Afro",
        "Top Bald",
        "Mohawk",
        "Long Ponytail",
        "Messy Ponytail",
    ];

    const facialHairStyles: string[] = [
        "Stubble",
        "Long Stubble",
        "Full Beard",
        "French Fork",
        "Ducktail",
        "Verdi",
        "Garibaldi",
        "Bandholz",
        "Soul Patch",
        "Goatee",
        "Chin Curtain",
        "Extended Goatee",
        "Circle Beard",
        "Anchor",
        "Balbo",
        "Van Dyke",
        "Imperial",
        "Side Whiskers",
        "Mutton Chops",
        "Hulihee",
        "Horseshoe",
        "Zappa",
        "Walrus",
        "Painter's brush",
        "Chevron",
        "Handlebar",
        "Pencil",
        "Toothbrush",
        "Lampshade",
        "Zorro",
        "Villain",
        "Fu Manchu",
        "English",
        "Dali",
    ];

    const appearance: personAppearance = {
        hairColor: arnd(findColors(["brown"])),
        hairStyle: arnd(maleHairStyles),
        skinColor: arnd(findColors(["russet", "peru", "fawn", "apricot", "navajo", "ebony", "pale"])),
        glasses: arnd([true, false, false]),
        bodyType: "unknown"
    }

    if(person.gender === Gender.MALE) {
        if(roll(60)) {
            appearance.facialHair = arnd(facialHairStyles);
        }
    }

    return appearance;
}
