import { Name, CharacterSetting, Gender } from "../types/Character";
import { loadSetting } from "../settings/Settings";
import { getFirstNames, getLastNames } from "../settings/helpers";
import { arnd, rnd, arnds } from "../utils/randUtils";
import { SettingsNameData } from "../types/Settings";

export function createName(setting: CharacterSetting, gender: Gender, style?: string): Name {
    const settingApi = loadSetting(setting);

    const names = settingApi.getNames();

    const fNameCount = rnd(1, 3);

    const fNames = getFirstNames(names, gender, style);
    const lNames = getLastNames(names, gender, style);

    // if (style === "Dwarf") {

    //     const namesForDwarves: string = names
    //     .map((n: SettingsNameData) => {
    //         return `${n.name}:${n.forRaces.join(",")}`;
    //     })
    //     .join(";");
    //     console.log(
    //         "FIRSTNAMES FOR ",
    //         style,
    //         fNames,
    //         namesForDwarves
    //     );
    // }

    const firstNames = arnds(fNames, fNameCount);
    const lastName = arnd(lNames);

    const fullName = `${firstNames.map((n: SettingsNameData) => n.name).join(" ")} ${lastName.name}`;

    const name: Name = {
        firstNames: firstNames.map((n: SettingsNameData) => n.name),
        lastName: lastName.name,
        nickNames: ["Testman"],
        previousNames: [],
        fullName: fullName,
    };

    return name;
}
