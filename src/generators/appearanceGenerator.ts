import {
    Character,
    CharacterDraft,
    Story,
    Condition,
    Quality,
    Gender,
    CharacterSetting,
    AgeGroup,
    GenderOptionsLibrary,
} from "../types/Character";
import { Appearance, Body, Tattoo, Hair, Outfit, Cloth, BodyType } from "../types/Apperance";
import { COLORS, findColors } from "../utils/colors";
import { arnd, grnd, rnd, roll } from "../utils/randUtils";
import { getSettingRaceForCharacter, getRaceKeyword, getRaceKeywordWithNumber } from "./raceGenerator";
import { SettingsRaceData } from "../types/Settings";
import { HairData, HAIR, FACIALHAIR } from "../data/HairData";
import { parseGenderDataString, parseNumberDataString, parseAgeGroupDataString } from "../data/dataParser";
import { stringToGender } from "../utils/converters";

export default function appearanceGenerator(character: Character | CharacterDraft): Appearance {
    const appearance: Appearance = {
        body: createBody(character),
        clothes: createOutfit(character),
        wardrobe: [],
    };

    return appearance;
}

function createBody(character: Character | CharacterDraft): Body {
    const skinColors = findColors([
        "ivory",
        "sienna",
        "sand",
        "chocolate",
        "bronze",
        "amber",
        "beige",
        "golden",
        "espresso",
        "umber",
        "limestone",
    ]);

    const isMale: boolean = character.gender === Gender.MALE;
    const isFemale: boolean = character.gender === Gender.FEMALE;

    const race = getSettingRaceForCharacter(character);
    const index = isMale ? 0 : isFemale ? 1 : 2;

    const bodyType: BodyType = arnd([BodyType.ECTOMORPH, BodyType.MESOMORPH, BodyType.ENDOMORPH]);

    // Create Height
    let heightMultiplier = 1;
    let weightMultiplier = 1;
    if (character.age) {
        if (character.age.ageGroup === AgeGroup.CHILD) {
            heightMultiplier = character.age.years / race.adulthood[index];
        }

        if (character.age.ageGroup === AgeGroup.TEEN) {
            heightMultiplier = character.age.years / race.adulthood[index];
            weightMultiplier = 0.85;
        }

        if (character.age.ageGroup === AgeGroup.YOUNGADULT) {
            weightMultiplier = 0.95;
        }

        if (character.age.ageGroup === AgeGroup.ADULT) {
        }

        if (character.age.ageGroup === AgeGroup.MIDDLEAGE) {
            weightMultiplier = 1.1;
        }

        if (character.age.ageGroup === AgeGroup.ELDER) {
            heightMultiplier = 0.99;
            weightMultiplier = 0.95;
        }
        if (character.age.ageGroup === AgeGroup.ANCIENT) {
            heightMultiplier = 0.97;
            weightMultiplier = 0.8;
        }
    }
    const raceHeightVariance = race.variance[0] || 20;
    const raceHeightDepth = race.variance[1] || 4;
    const adultHeight = Math.round(
        grnd(race.height[index], isMale ? raceHeightVariance : raceHeightVariance - 2, raceHeightDepth) +
            (bodyType === BodyType.ECTOMORPH ? 3 : 0)
    );
    const height = Math.round(adultHeight / 2 + (adultHeight / 2) * heightMultiplier);

    // Weight calculator
    let baseBmi =
        (race.weight[index] / ((race.height[index] / 100) * (race.height[index] / 100))) *
        weightMultiplier *
        (bodyType === BodyType.ECTOMORPH ? 0.8 : bodyType === BodyType.ENDOMORPH ? 1.1 : 1);

    let baseVariations = [bodyType === BodyType.MESOMORPH ? 24 : 20, bodyType === BodyType.ECTOMORPH ? 8 : 10];

    const bmi = grnd(baseBmi * 10, baseVariations[0], baseVariations[1]) / 10;
    // const bmi = Math.floor(Math.random() * (character.gender === Gender.MALE ? 25 : 20)) + 15;

    const weight = Math.round(bmi * ((height / 100) * (height / 100)) * 10) / 10;
    // console.log(`Height: ${height}\nWeight: ${weight}\nBMI: ${baseBmi} / ${bmi}`);
    // console.log("H:", height,  "Base:", baseBmi, "BMI:", bmi, "W:", weight);

    const body: Body = {
        bodyType: bodyType,
        height: height,
        weight: weight,
        keywords: [],
        tattoos: [],
        scars: [],
        skinColor: arnd(skinColors),
        hair: createHair(character),
        description: "",
        bmi: Math.round(bmi * 1000) / 1000,
        baseBmi: Math.round(baseBmi * 1000) / 1000,
    };

    const [keys, descr] = createBodyDescriptionKeyword(character, body, bmi, baseBmi, race);
    body.keywords = keys;
    body.description = descr;

    return body;
}

function createHair(character: Character | CharacterDraft): Hair {
    const colorSchemes: string[] = ["brown", "carrot"];

    const race = getSettingRaceForCharacter(character);

    if (character.age) {
        if (
            character.age.ageGroup === AgeGroup.MIDDLEAGE ||
            character.age.ageGroup === AgeGroup.ELDER ||
            character.age.ageGroup === AgeGroup.ANCIENT
        ) {
            colorSchemes.push("gray");
        }
        if (character.age.ageGroup === AgeGroup.ELDER || character.age.ageGroup === AgeGroup.ANCIENT) {
            colorSchemes.push("white");
        }
    }

    let hairColors = findColors(colorSchemes);

    const currentAgeGroup: number = character.age ? character.age.ageGroup : 4;

    // Parse hairstyles from data
    const hairStyles: string[] = HAIR.reduce((styles: string[], h: string): string[] => {
        const ar = h.split(";");
        if (ar.length === 3) {
            // console.log(ar);

            const gInfo: [Gender, number][] = ar[1].split(",").map((gs: string) => {
                const gSplit: string[] = gs.split(":");
                const gen: Gender = stringToGender(gSplit[0]);
                const likelihood: number = Number(gSplit[1]) || 100;
                return [gen, likelihood];
            });

            const myGender: [Gender, number] | undefined = gInfo.find(
                (v: [Gender, number]) => v[0] === character.gender
            );
            if (!myGender) {
                return styles;
            }

            const ageGroups: AgeGroup[] = parseAgeGroupDataString(ar[2]);

            let asMainTargetGroup = false;
            if (character.age) {
                asMainTargetGroup = ageGroups.includes(character.age.ageGroup);
            }

            const modifier: number = asMainTargetGroup ? 30 : 0;
            if (!roll(myGender[1] + modifier)) {
                return styles;
            }

            styles.push(ar[0]);
        }
        return styles;
    }, []);
  
    const hair: Hair = {
        color: arnd(hairColors),
        style: arnd(hairStyles),
    };

    const facialHairKeyword: [string, number] = character.gender === Gender.MALE ? getRaceKeywordWithNumber(race, "FacialHair", 50) : getRaceKeywordWithNumber(race, "WomanFacialHair", 0);
    
    if(character.gender === Gender.MALE && roll(facialHairKeyword[1]) ) {
        
        const facialHairs: string[] = FACIALHAIR.reduce((fh: string[], fstr: string): string[] => {

            const [name, likelihood] = fstr.split(";");
            if(roll(Number(likelihood))) {
                fh.push(name)
            }
            
            return fh;
        }, []);
        
        hair.facialHair = arnd(facialHairs);
    }

    return hair;
}

function createTattoo(): Tattoo {
    const tattooStory: Story = {
        personsRelated: [],
        story: "",
        when: Date.now(),
    };

    const tattoo: Tattoo = {
        location: "anywhere",
        shape: "Tribal",
        story: tattooStory,
        colors: [],
    };

    return tattoo;
}

function createOutfit(character: Character | CharacterDraft): Outfit {
    const outfit: Outfit = {
        clothes: [],
        currentlyWearing: false,
        dirtyness: 3,
        suitableFor: ["Ballroom"],
    };

    return outfit;
}

function createCloth(): Cloth {
    const cloth: Cloth = {
        condition: "New",
        quality: "Great",
        keywords: [],
        name: "Nice hat for exploration",
        color: findColors("blue")[0],
        forGenders: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
        setting: CharacterSetting.EARTH,
        size: "Too big",
        target: [],
        type: "Hat",
    };

    return cloth;
}

function createBodyDescriptionKeyword(
    character: Character | CharacterDraft,
    body: Body,
    bmi: number,
    avgBmi: number,
    race: SettingsRaceData
): [string[], string] {
    const keys: string[] = [];

    const isMale: boolean = character.gender === Gender.MALE;
    const isFemale: boolean = character.gender === Gender.FEMALE;

    const index = character.gender === Gender.MALE ? 0 : character.gender === Gender.FEMALE ? 1 : 2;
    const avgHeight = race.height[index];

    const heights: number[] = [avgHeight * 0.9, avgHeight * 0.98, avgHeight * 1.04, avgHeight * 1.1];

    const raceCharismaAdjust = race.stats[5];

    let weightKey: string =
        bmi < avgBmi * 0.6
            ? "STARVING"
            : bmi < avgBmi * 0.8
            ? "THIN"
            : bmi < avgBmi
            ? "AVERAGE"
            : bmi < avgBmi * 1.3
            ? "OVERWEIGHT"
            : "MASSIVE";
    let heightKey: string =
        body.height < heights[0]
            ? "TINY"
            : body.height < heights[1]
            ? "SMALL"
            : body.height <= heights[2]
            ? "NORMAL"
            : body.height < heights[3]
            ? "TALL"
            : "GIANT";

    keys.push(weightKey);
    keys.push(heightKey);

    // he/she looks like a [wDescr], [hDescr] [typeWord].

    interface DescrLib {
        [key: string]: string[];
    }

    interface DescrLibOpts {
        [key: string]: string[][];
    }

    function bodyTypeOpts(bt: BodyType, meso: string, ecto: string, endo: string): string {
        if (bt === BodyType.MESOMORPH) return meso;
        if (bt === BodyType.ECTOMORPH) return ecto;
        return endo;
    }

    let looksMin = raceCharismaAdjust > 0 ? raceCharismaAdjust : 0;
    let looksMax = raceCharismaAdjust < 0 ? 9 + raceCharismaAdjust : 9;

    if (body.bodyType === BodyType.MESOMORPH) {
        looksMin++;
        if (character.gender === Gender.MALE) {
            looksMin++;
        }
    }

    if (body.keywords.includes("TALL")) {
        looksMin++;
    }

    if (body.keywords.includes("THIN")) {
        looksMin++;
        if (character.gender === Gender.FEMALE) {
            looksMin++;
        }
    }

    if (body.keywords.includes("OVERWEIGHT") || body.keywords.includes("STARVING")) {
        looksMax--;
    }

    if (body.keywords.includes("GIANT")) {
        looksMax--;
    }

    if (body.keywords.includes("MASSIVE")) {
        looksMax = looksMax - 2;
    }

    if (body.keywords.includes("TINY")) {
        looksMax = looksMax - 2;
    }

    // const looksLevel = rnd(looksMin, looksMax);
    const looksLevel = grnd(5, 3, 2, looksMin, looksMax);

    const looksDescr: DescrLibOpts = {
        Male: [
            ["unsightly"],
            ["hideous", "repelling", "awful"],
            ["ugly", "gross"],
            ["passable", "off"],
            ["unremarkable"],
            ["okay", "average", "normal"],
            ["nice", "pleasant"],
            ["good", "handsome"],
            ["attractive"],
            ["super star", "divine"],
        ],
        Female: [
            ["revolting"],
            ["awful", "repelling", "hideous"],
            ["uncomely", "gross", "ugly"],
            ["so-so", "off", "passable"],
            ["humdrum", "unremarkable"],
            ["okay", "average", "normal"],
            ["fair", "pleasant", "nice"],
            ["lovely", "good"],
            ["beautiful", "gorgeous", "alluring"],
            ["super model", "divine"],
        ],
        Other: [
            ["monstrous"],
            ["beastly"],
            ["bizarre"],
            ["weird"],
            ["strange"],
            ["okay"],
            ["rare"],
            ["precious"],
            ["ethereal"],
            ["godlike"],
        ],
    };

    const wDescr: DescrLib = {
        STARVING: ["starving", "seethrough", "skeletal", "fragile", "skinny"],
        THIN: [
            "thin",
            "lean",
            "slender",
            "nimble",
            bodyTypeOpts(body.bodyType, "thin", "graceful", "wiry"),
            bodyTypeOpts(body.bodyType, "slim", "delicate", "skinny"),
        ],
        AVERAGE: ["typical", "ordinary", "regular", "common", "fair"],
        OVERWEIGHT: [
            "overweight",
            "thick",
            "heavy",
            "weightly",
            bodyTypeOpts(body.bodyType, "strong", "pear-shaped", "tough"),
            bodyTypeOpts(body.bodyType, "muscular", "pot-bellied", "bulky"),
        ],
        MASSIVE: ["blobby", "fat", "massive", "huge", "round", "obese", "pudgy", "corpulent"],
    };

    const hDescr: DescrLib = {
        TINY: ["teeny", "diminutively", "puny", "shrunk"],
        SMALL: ["small", "short", "petite", bodyTypeOpts(body.bodyType, "squat", "petite", "compact")],
        NORMAL: ["medium height", "normal height", "standard sized", "medium sized", "normy"],
        TALL: ["tall", "large", bodyTypeOpts(body.bodyType, "towering", "high", "big")],
        GIANT: ["giant", "colossal", "huge", "immense"],
    };

    const tWord: DescrLib = {
        MALE: ["man", "man", "man", "fellow", "bro", "guy", "chum", "mate", "buddy", "lord"],
        FEMALE: ["woman", "woman", "woman", "lady", "lass", "damsel", "missy"],
        OTHER: ["fellow", "oddball", "comrade", "thing", "bipedal"],
        CHILD: ["kid", "child", "rascal", "darling"],
    };

    const gKey = character.age?.ageGroup === AgeGroup.CHILD ? "CHILD" : isMale ? "MALE" : isFemale ? "FEMALE" : "OTHER";

    let description: string = "";
    const looksStr: string = arnd(looksDescr[character.gender][looksLevel]);

    const raceName = ""; //character.race?.name || "";

    if (weightKey === "AVERAGE" && heightKey === "NORMAL") {
        description = `${isMale ? "He" : isFemale ? "She" : "It"} is a ${arnd([
            "average",
            "typically",
            "medium",
            "ordinary",
        ])} sized ${looksStr} looking ${arnd(tWord[gKey])}.`;
    }

    if (weightKey !== "AVERAGE" && heightKey !== "NORMAL") {
        description = `${isMale ? "He" : isFemale ? "She" : "It"} is a ${arnd(wDescr[weightKey])} and ${arnd(
            hDescr[heightKey]
        )} ${looksStr} looking ${arnd(tWord[gKey])}.`;
    }

    if (weightKey === "AVERAGE" && heightKey !== "NORMAL") {
        description = `${isMale ? "He" : isFemale ? "She" : "It"} is a ${arnd(
            hDescr[heightKey]
        )} ${looksStr} looking ${arnd(tWord[gKey])}.`;
    }

    if (weightKey !== "AVERAGE" && heightKey === "NORMAL") {
        description = `${isMale ? "He" : isFemale ? "She" : "It"} is a ${arnd(
            wDescr[weightKey]
        )} ${looksStr} looking ${arnd(tWord[gKey])}.`;
    }

    const skinDescription = `${character.name.firstNames[0]} has ${body.skinColor.name.toLowerCase()} coloured skin`; // and ${isMale ? "his" : isFemale ? "her" : "it"}`
    
    const facialHair: string|null = body.hair.facialHair !== undefined ? body.hair.facialHair.toLowerCase() : null;

    const hairDescription =
        character.appearance?.body.hair.style === "Bald"
            ? `${isMale ? "He" : isFemale ? "She" : "It"} is bald${facialHair !== null ? ` with a ${body.hair.color.name} ${facialHair}` : ""}.`
            : `${
                  isMale ? "his" : isFemale ? "her" : "its"
              } hair is ${body.hair.color.name.toLowerCase()} and ${body.hair.style.toLowerCase()}${facialHair !== null ? ` with a ${facialHair}` : ""}.`;
    description = `${description} ${skinDescription} and ${hairDescription} `;

    keys.push(`looks-level-${looksLevel}`);

    // console.log("Body keys:", keys, avgHeight, heights, "\n", description, "\n");

    return [keys, description];
}
