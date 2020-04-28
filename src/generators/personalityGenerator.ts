import { Character, CharacterDraft, Gender } from "../types/Character";
import { Personality, GeneralPersonalityTrait, Trait } from "../types/Personality";
import { arnds, rnd, arnd, roll } from "../utils/randUtils";
import { POSITIVETRAITS, NEGATIVETRAITS } from "../data/Traits";

export function createPersonality(character: Character | CharacterDraft): Personality {
    const generalPersonality = createGeneralPersonalities(character);
    const positiveTraits = createPositiveTraits(character, generalPersonality);
    const negativeTraits = createNegativeTraits(character, generalPersonality);

    const personality: Personality = {
        generalPersonality: generalPersonality,
        positiveTraits: positiveTraits,
        negativeTraits: negativeTraits,
        mentalIllnesses: [],
    };

    personality.mentalIllnesses = createMentalIllness(character, personality);

    return personality;
}

export function getPersonalityDescription(character: Character | CharacterDraft): string {
    const adjectives: string[][] = [
        [""],
        ["very", "deeply", "profoundly", "uncommonly", "highly", "extremely"],
        ["quite", "fairly", "rather", "pretty"],
        ["a little", "a bit", "moderately", "slightly"],
        [""],
        ["a little", "a bit", "moderately", "slightly"],
        ["quite", "fairly", "rather", "pretty"],
        ["very", "deeply", "profoundly", "uncommonly", "highly", "extremely"],
    ];

    const strs: string[] = [];
    if (character.personality) {
        const pers: string[] = character.personality?.generalPersonality.reduce(
            (tot: string[], cur: GeneralPersonalityTrait): string[] => {
                if (cur.value === 4) return tot;
                const name = cur.value < 4 ? cur.nameA : cur.nameB;
                const adj: string = arnd(adjectives[cur.value]);
                tot.push(`${adj} ${name.toLowerCase()}`);
                return tot;
            },
            []
        );

        if (pers.length > 0) {
            const lastTrait = pers.pop();
            if (pers.length > 0) {
                const str = `${character.name.firstNames[0]} is ${pers.join(", ")} and ${lastTrait}.`;
                strs.push(str);
            } else {
                const str = `${character.name.firstNames[0]} is ${lastTrait}.`;
                strs.push(str);
            }
        }
    }

    const posTraits = character.personality?.positiveTraits || [];
    const negTraits = character.personality?.negativeTraits || [];

    if (posTraits.length > 0 || negTraits.length > 0) {
        const tstrs: string[] = [];

        if (posTraits.length > 0) {
            const posNames: string[] = posTraits.map((t: Trait) => t.name);
            tstrs.push(createTextList(posNames));
        }

        if (negTraits.length > 0) {
            const negNames: string[] = negTraits.map((t: Trait) => t.name);
            if (posTraits.length > 0) {
                tstrs.push("but also");
            }
            tstrs.push(createTextList(negNames));
        }

        if (tstrs.length > 0) {
            const txt: string = `${character.gender === Gender.MALE ? "He" : "She"} is ${arnd([
                "considered",
                "thought",
                "rumoured",
                "told",
            ])} to be ${tstrs.join(" ").toLowerCase()}.`;
            strs.push(txt);
        }
    }

    if (character.personality && character.personality.mentalIllnesses.length > 0) {
        strs.push(
            `${arnd(["Unfortunately", "Alas", "Regretfully"])} ${character.gender === Gender.MALE ? "he" : "she"} is suffering from ${createTextList(
                character.personality.mentalIllnesses
            )}.`
        );
    }

    if (strs.length === 0) {
        strs.push(
            `${character.name.firstNames[0]} ${arnd([
                "is extremely average",
                "is the very definition of a wall flower",
                "is completely forgettable",
                "is a nobody",
            ])}.`
        );
    }

    return strs.join(" ");
}

function createGeneralPersonalities(character: Character | CharacterDraft): GeneralPersonalityTrait[] {
    const traits: GeneralPersonalityTrait[] = [];
    const genTraits: string[][] = [
        ["Curious", "Cautious"],
        ["Organized", "Careless"],
        ["Introvert", "Extrovert"],
        ["Friendly", "Challenging"],
        ["Nervous", "Confident"],
    ];

    genTraits.forEach(([nameA, nameB]) => {
        if (roll(60)) {
            traits.push({ nameA: nameA, nameB: nameB, value: rnd(1, 7) });
        } else {
            traits.push({ nameA: nameA, nameB: nameB, value: 4 });
        }
    });

    // traits.push({ nameA: "Curious", nameB: "Cautious", value: rnd(1, 7) });
    // traits.push({ nameA: "Organized", nameB: "Careless", value: rnd(1, 7) });
    // traits.push({ nameA: "Introvert", nameB: "Extrovert", value: rnd(1, 7) });
    // traits.push({ nameA: "Friendly", nameB: "Challenging", value: rnd(1, 7) });
    // traits.push({ nameA: "Nervous", nameB: "Confident", value: rnd(1, 7) });

    return traits;
}

function createPositiveTraits(character: Character | CharacterDraft, general: GeneralPersonalityTrait[]): Trait[] {
    const posTraits: Trait[] = POSITIVETRAITS.map((t: string) => {
        const ar: string[] = t.split(";");
        return {
            name: ar[0],
            attachedTo: ar[1],
            likelihood: Number(ar[2]),
            opposite: ar[3],
        };
    });

    const charactersPositiveTraits: Trait[] = [];

    general.forEach((genTrait: GeneralPersonalityTrait) => {
        if (genTrait.value !== 4) {
            const tVal = Math.abs(genTrait.value - 4);
            const gName: string | null = genTrait.value < 4 ? genTrait.nameA : genTrait.nameB;

            const targetTraits: Trait[] = posTraits.filter((t: Trait) => {
                return t.attachedTo === gName;
            });
            for (let i = 0; i < tVal; i++) {
                if (roll(i * 10 * 3)) {
                    const newTrait: Trait = arnd(targetTraits);
                    if (!charactersPositiveTraits.includes(newTrait)) {
                        charactersPositiveTraits.push(newTrait);
                    }
                }
            }
        }
    });

    return charactersPositiveTraits;
}

function createNegativeTraits(character: Character | CharacterDraft, general: GeneralPersonalityTrait[]): Trait[] {
    const posTraits: Trait[] = NEGATIVETRAITS.map((t: string) => {
        const ar: string[] = t.split(";");
        return {
            name: ar[0],
            attachedTo: ar[1],
            likelihood: Number(ar[2]),
            opposite: ar[3],
        };
    });

    const characterNegativeTraits: Trait[] = [];

    general.forEach((genTrait: GeneralPersonalityTrait) => {
        if (genTrait.value !== 4) {
            const tVal = Math.abs(genTrait.value - 4);
            const gName: string | null = genTrait.value < 4 ? genTrait.nameA : genTrait.nameB;

            const targetTraits: Trait[] = posTraits.filter((t: Trait) => {
                return t.attachedTo === gName;
            });
            if (roll(tVal * 30)) {
                const newTrait: Trait = arnd(targetTraits);
                characterNegativeTraits.push(newTrait);
            }
        }
    });

    return characterNegativeTraits;
}

function createMentalIllness(character: Character | CharacterDraft, personality: Personality): string[] {
    const tVals: number[] = [];
    const score: number = personality.generalPersonality.reduce((score, gtrait): number => {
        const tVal = Math.abs(gtrait.value - 4);

        tVals.push(tVal);
        return score + tVal * tVal;
    }, 0);

    const maxAmountOfDiagnosis = Math.floor((score * score) / 100);

    const eatingDisorder: string =
        character.appearance &&
        (character.appearance.body.keywords.includes("STARVING") || character.appearance.body.keywords.includes("THIN"))
            ? "Anorexia Nervosa"
            : "Bulimia Nervosa";
    const sleepingDisorder: string = arnd(["Insomnia", "Narcolepsy"]);
    const phobia = arnd(["Achluophobia", "Acrophobia","Aerophobia","Arachnophobia","Astraphobia","Autophobia","Claustrophobia","Hemophobia", "Hydrophobia", "Ophidiophobia","Zoophobia"]);
    const mentalIllnesses: string[] = [
        "ADHD",
        "Autism",
        "Stutter",
        "Bipolar Disorder",
        "Depression",
        phobia,
        "Panic Disorder",
        "Post-traumatic stress disorder",
        "Dissociative Amnesia",
        eatingDisorder,
        sleepingDisorder,
        "Kleptomania",
        "Pyromania",
        "Delirium",
        "Schizophrenia",
        "Obsessive-Compulsive disorder",
        "Borderline personality disorder",
        "Paranoid",
        "Antisocial personality disorder",
    ];

    const suffering: string[] = [];
    for (let i = 0; i < maxAmountOfDiagnosis; i++) {
        const chance: number = 20 + score - suffering.length * 10;

        if (chance > 0 && roll(chance)) {
            const disorder = arnd(mentalIllnesses);
            if (!suffering.includes(disorder)) {
                suffering.push(disorder);
            }
        }
    }

    return suffering;
}

function createTextList(arr: string[]): string {
    if (arr.length === 0) return "";
    if (arr.length === 1) {
        return arr[0];
    }

    const last = arr.pop();
    return `${arr.join(", ")} and ${last}`;
}
