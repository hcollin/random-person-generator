import Gender from "./Gender";



export interface Person {
    name: string;
    gender: Gender;
    age: number;
    height: number;
    weight: number;
    hetu: string;
    bmi: number;
    [key: string]: any;
}
