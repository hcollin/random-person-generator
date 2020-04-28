import { SettingsNameData, SettingsRaceData, SettingsNationData } from "../types/Settings";
import { Name, Gender } from "../types/Character";

/**
 * Parse raw name string to SettinsNameData objects
 *
 * The form of the name data should have 6 parts, each separated with ;
 *
 * Parts
 * string    - Actual name
 * 0/1       - Can be used as a first name
 * 0/1       - Can be used as a last name
 * string,   - Each race this name is valid for separated with comma (,). Empty if valid for all
 * string,   - Each nationality this name is valid for separated with comma (,). Empty if valid for all
 * M+F+O     - Genders this name is valid; M=Male, F=Female, O=Other
 *
 * Example:
 * John;1;0;Human;England,USA,Canada,Australia;MO
 *
 * @param namesData string
 */
export function nameParser(namesData: string): SettingsNameData[] {
    const names: SettingsNameData[] = [];

    const arr: string[] = namesData.split("\n");

    arr.forEach((line: string) => {
        const parts = line.split(";");
        if (parts.length === 6) {
            const name: SettingsNameData = {
                name: parts[0],
                asFirstName: parts[1] === "1",
                asLastName: parts[2] === "1",
                forRaces: parts[3].split(","),
                forNationalities: parts[4].split(","),
                forGenders: [],
            };

            if (parts[5].includes("M")) name.forGenders.push(Gender.MALE);
            if (parts[5].includes("F")) name.forGenders.push(Gender.FEMALE);
            if (parts[5].includes("O")) name.forGenders.push(Gender.OTHER);

            names.push(name);
        } else {
            if(parts.length > 1) {
                console.warn("Name line has invalid number columns (must be six)", line);
                throw new Error("Error in names string. Invalid amount of columns.");
            }
        }
    });

    return names;
}

/**
 * Race parser for race format
 *
 * Parts
 * string   - actual name
 * number,  - max age for 3 genders
 * number,  - avg height for 3 genders (cm)
 * number,  - avg weight for 3 genders (kg)
 * number,  - variance calculator rules
 * number,  - age of adulthood for 3 genders
 * string,  - keywords separated with ,
 * stats,   - six stat modifiers for D&D style system
 *
 *
 * Keywords
 * NoFacialHair - This race has no facial hair
 *
 * @param raceData
 */
export function raceParser(raceData: string): SettingsRaceData[] {
    const races: SettingsRaceData[] = [];

    const arr: string[] = raceData.split("\n");

    arr.forEach((line: string) => {
        const parts = line.split(";");
        if (parts.length === 8) {
            const sts = parts[7].split(",").map((v: string) => Number(v));
            const stats: [number, number, number, number, number, number] = [
                sts[0],
                sts[1],
                sts[2],
                sts[3],
                sts[4],
                sts[5],
            ];

            const keywords: [string, any][] = parts[6].split(",").map((k: string) => {
                const keywordAndValue = k.trim().split(":");
                return [keywordAndValue[0], keywordAndValue[1]];
                
            });
            const race: SettingsRaceData = {
                name: parts[0],
                ages: parts[1].split(",").map((a: string) => Number(a)),
                height: parts[2].split(",").map((a: string) => Number(a)),
                weight: parts[3].split(",").map((a: string) => Number(a)),
                variance: parts[4].split(",").map((a: string) => Number(a)),
                adulthood: parts[5].split(",").map((a: string) => Number(a)),
                keywords: keywords,
                stats: stats,
            };

            races.push(race);
        }
    });

    return races;
}

export function nationParser(nationData: string): SettingsNationData[] {
    const nations: SettingsNationData[] = [];

    return nations;
}
