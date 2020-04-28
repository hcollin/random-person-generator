import { CharacterSetting } from "../types/Character";
import { SettingsApi } from "../types/Settings";
import EarthApi from "./earth/EarthApi";
import PathfinderApi from "./pathfinder/PathfinderApi";

export function loadSetting(setting: CharacterSetting): SettingsApi {
    switch (setting) {
        case CharacterSetting.EARTH:
            return EarthApi;
        case CharacterSetting.PATHFINDER:
            return PathfinderApi;
        default:
            break;
    }

    throw new Error(`Invalid setting provided could not load setting ${setting}`);
}
