import { Character, Race, CharacterDraft } from "../types/Character";
import { loadSetting } from "../settings/Settings";
import { SettingsRaceData } from "../types/Settings";
import { arnd } from "../utils/randUtils";



export function raceGenerator(character: Character|CharacterDraft, predefinedRace?: string): Race {

    const settingsApi = loadSetting(character.characterSetting);
    const races = settingsApi.getRaces().map((r: SettingsRaceData) => r.name);
    


    const race: string = predefinedRace && races.includes(predefinedRace) ? predefinedRace : arnd(races);

    return {
        name: race
    };


}

export function getSettingRaceForCharacter(character: Character|CharacterDraft): SettingsRaceData {

    if(character.race) {
        const settingsApi = loadSetting(character.characterSetting);
        const races = settingsApi.getRaces();
        const race = races.find((r: SettingsRaceData) => r.name === character?.race?.name);
        if(race) {
            return race;    
        }
    }

    throw new Error(`Could not load race for characeter as the race is missing from the object`);    
}

export function raceHasKeyword(race: SettingsRaceData, keyword: string): boolean {
    return race.keywords.findIndex((raceKeyword:[string, any]) => {
        return raceKeyword[0] === keyword;
    }) > -1;
}

export function getRaceKeyword(race: SettingsRaceData, keyword: string, defaultValue: any): [string, any] {
    const val = race.keywords.find((raceKeyword:[string, any]) => {
        return raceKeyword[0] === keyword;
    });
    if(val) return val;

    return [keyword, defaultValue];
}

export function getRaceKeywordWithNumber(race: SettingsRaceData, keyword: string, defaultValue: number): [string, number] {
    const val = race.keywords.find((raceKeyword:[string, string]) => {
        return raceKeyword[0] === keyword;
    });

    if(val){
        return [keyword, Number(val[1])];
    } 

    return [keyword, defaultValue];
}