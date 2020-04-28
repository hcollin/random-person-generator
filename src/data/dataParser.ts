import { Gender, AgeGroup } from "../types/Character";

export function parseGenderDataString(dataString: string, separator = ","): Gender[] {
    const strData: string[] = dataString.split(separator);
    return strData.map(
        (s: string): Gender => {
            if (s.toLowerCase() === "male") return Gender.MALE;
            if (s.toLowerCase() === "female") return Gender.FEMALE;
            return Gender.OTHER;
        }
    );
}

export function parseNumberDataString(dataString: string, separator = ","): number[] {
    const strData: string[] = dataString.split(separator);
    return strData.map((s: string): number => Number(s));
}

export function parseAgeGroupDataString(dataString: string, separator = ","): AgeGroup[] {
    const strData: string[] = dataString.split(separator);
    return strData.map(
        (s: string): AgeGroup => {
            const sl = s.toLowerCase().trim().replace(" ", "");
            if (s === "0" || s === "baby") return AgeGroup.BABY;
            if (s === "1" || s === "child") return AgeGroup.CHILD;
            if (s === "2" || s === "teen") return AgeGroup.TEEN;
            if (s === "3" || s === "youngadult") return AgeGroup.YOUNGADULT;
            if (s === "4" || s === "adult") return AgeGroup.ADULT;
            if (s === "5" || s === "middleage") return AgeGroup.MIDDLEAGE;
            if (s === "6" || s === "old" || s ==="elder") return AgeGroup.ELDER;
            if (s === "7" || s === "ancient") return AgeGroup.ANCIENT;
            return AgeGroup.ADULT;
        }
    );
}
