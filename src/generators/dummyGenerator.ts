import { arnd, rnd } from "../utils/randUtils";

export interface Options {
    columns: ColumnOptions[];
}

export interface ColumnOptions {
    type: ColumnGeneratorType;
    key: string;
    params?: GeneratorParams;
}

export enum ColumnGeneratorType {
    UUID = "UniqueId",
    NAME = "Name",
    PRICE = "Price",
    FLOAT = "Float",
    NUMBER = "Number",
    CUSTOM = "Custom",
    ARRAY = "Array",
    OPTIONS = "Options",
    DATE = "Date",
    TIME = "Time",
    DATETIME = "Datetime",
    TIMESTAMP = "Timestamp",
    OBJECT = "Object",
}

export interface DummyResults {
    [key: string]: any;
}

export interface GeneratorParams {
    min?: number;
    max?: number;
    digits?: number;
    subValueType?: ColumnOptions;
    subObject?: ColumnOptions[];
    options?: any[];
    from?: Date;
    to?: Date;
    locale?: string;
    fn?: () => DummyGeneratorValue;
    [key: string]: any;
}
export type DummyGeneratorValue = any;

export default function dummyGenerator(columns: ColumnOptions[], amount: number): DummyResults[] {
    const values: DummyResults[] = [];
    
    for (let i = 0; i < amount; i++) {
        const obj: DummyResults = {};
        console.log("Columns:", columns);
        columns.forEach((opts: ColumnOptions) => {
            obj[opts.key] = generateDummyValue(opts);
        });
        // console.log(`${i}:`, obj);

        values.push(obj);
    }

    return values;
}

function generateDummyValue(opts: ColumnOptions): DummyGeneratorValue {
    switch (opts.type) {
        case ColumnGeneratorType.NAME:
            return nameGenerator(opts.params);
        case ColumnGeneratorType.NUMBER:
            return numberGenerator(opts.params);
        case ColumnGeneratorType.CUSTOM:
            return customGenerator(opts.params);
        case ColumnGeneratorType.ARRAY:
            return arrayGenerator(opts.params);
        case ColumnGeneratorType.FLOAT:
            return floatGenerator(opts.params);
        case ColumnGeneratorType.OPTIONS:
            return optionsGenerator(opts.params);
        case ColumnGeneratorType.DATE:
            return dateGenerator(opts.params);
        case ColumnGeneratorType.TIME:
            return timeGenerator(opts.params);
        case ColumnGeneratorType.DATETIME:
            return datetimeGenerator(opts.params);
        case ColumnGeneratorType.TIMESTAMP:
            return timestampGenerator(opts.params);
        case ColumnGeneratorType.OBJECT:
            return objectGenerator(opts.params);
        default:
            return;
    }
}

function numberGenerator(params?: GeneratorParams): number {
    const min = params && typeof params.min === "number" ? params.min : 1;
    const max = params && typeof params.max === "number" ? params.max : 100;
    return rnd(min, max);
}

function nameGenerator(params?: GeneratorParams): string {
    return arnd(["Antti", "Pekka", "Matti", "Kalle", "Henrik", "Tommi", "Niklas", "Tero", "Jami"]);
}

function arrayGenerator(params?: GeneratorParams): DummyGeneratorValue[] {
    if (params && typeof params.amount === "number") {
        const arr: DummyGeneratorValue[] = [];

        for (let i = 0; i < params.amount; i++) {
            if (params.subValueType) {
                const val = generateDummyValue(params.subValueType);
                arr.push(val);
            }
        }
        return arr;
    }
    return [];
}

function floatGenerator(params?: GeneratorParams): DummyGeneratorValue {
    let digitsMultiplier: number = 100;
    if (params?.digits) {
        digitsMultiplier = Number(`1${"0".repeat(params?.digits)}`);
    }
    let min = params && params.min ? params.min * digitsMultiplier : 1 * digitsMultiplier;
    let max = params && params.max ? params.max * digitsMultiplier : 100 * digitsMultiplier;

    return rnd(min, max) / digitsMultiplier;
}

function customGenerator(params?: GeneratorParams): any {
    if (params && typeof params.fn === "function") {
        return params.fn();
    }

    return null;
}

function optionsGenerator(params?: GeneratorParams): DummyGeneratorValue {
    if (params && params.options && Array.isArray(params.options)) {
        return arnd(params.options);
    }
    return null;
}

function dateGenerator(params?: GeneratorParams): DummyGeneratorValue {
    const from = params && params.from ? params.from : new Date(1970, 1, 1);
    const to = params && params.to ? params.to : new Date();

    const target = rnd(from.getTime(), to.getTime());
    const locale = params && params.locale ? params.locale : "fi-FI";

    return new Date(target).toLocaleDateString(locale);
}

function timeGenerator(params?: GeneratorParams): DummyGeneratorValue {
    const from = params && params.from ? params.from : new Date(1970, 1, 1);
    const to = params && params.to ? params.to : new Date();

    const target = rnd(from.getTime(), to.getTime());
    const locale = params && params.locale ? params.locale : "fi-FI";

    return new Date(target).toLocaleTimeString(locale);
}

function datetimeGenerator(params?: GeneratorParams): DummyGeneratorValue {
    const from = params && params.from ? params.from : new Date(1970, 1, 1);
    const to = params && params.to ? params.to : new Date();

    const target = rnd(from.getTime(), to.getTime());
    const locale = params && params.locale ? params.locale : "fi-FI";

    return new Date(target).toLocaleString(locale);
}

function timestampGenerator(params?: GeneratorParams): DummyGeneratorValue {
    const from = params && params.from ? params.from : new Date(1970, 1, 1);
    const to = params && params.to ? params.to : new Date();

    const target = rnd(from.getTime(), to.getTime());

    return new Date(target).getTime();
}

function objectGenerator(params?: GeneratorParams): DummyGeneratorValue {
    console.log("OBJECT GENERATOR", params?.subObject);
    if (params !== undefined && params.subObject !== undefined) {
        console.log("SubObject", params.subObject);
        if(Array.isArray(params.subObject)) {
            const obj = dummyGenerator(params.subOject, 1);
            console.log("Obj", obj);
            return obj;
        } else {
            console.warn("Params.subObject is not an array");
        }
        
        
    }
}1
