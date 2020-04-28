import { SettingsApi } from "../../types/Settings";
import metaData from "./metaData";

import { NAMES } from "./names";
import { RACES } from './races';
import { NATIONS } from './nations';

import { nameParser, raceParser, nationParser } from "../parsers";

const EarthApi: SettingsApi = {
    getMeta: () => metaData,
    getNames: () => nameParser(NAMES),
    getNations: () => nationParser(NATIONS),
    getRaces: () => raceParser(RACES),
};

export default EarthApi;
