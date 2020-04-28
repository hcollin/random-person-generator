import { Gender } from "../types/Character";


export function stringToGender(genderString: string): Gender {
    const gl = genderString.toLowerCase().trim();
    if(gl === "male") return Gender.MALE;
    if(gl === "female") return Gender.FEMALE;
    return Gender.OTHER;
}