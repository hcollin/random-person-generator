import { Gender } from "../types/Character";
import { SettingsNameData } from "../types/Settings";

export function getFirstNames(names: SettingsNameData[], gender?: Gender, race?: string): SettingsNameData[] {
    return names.filter((name: SettingsNameData) => {
        if (name.asFirstName) {
            if (gender === undefined || name.forGenders.includes(gender)) {                
                
                if(race && !name.forRaces.includes(race)) {
                    return false;
                }
                return true;
            }
        }
        return false;
    });
}

export function getLastNames(names: SettingsNameData[], gender?: Gender, race?: string): SettingsNameData[] {
    return names.filter((name: SettingsNameData) => {
        if (name.asLastName) {
            if (gender === undefined || name.forGenders.includes(gender)) {
                if(race && !name.forRaces.includes(race)) {
                    return false;
                }
                return true;
            }
        }
        return false;
    });
}
