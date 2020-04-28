import { Gender, AgeGroup } from "../types/Character";

// NAME; Gender:%, Gender:%; 
export const HAIR: string[] = [
    // Bald, balding or very short hair styles
    "Bald;Male,Female:20;5,6,7",
    "Top bald;Male:40;5,6,7",
    "Crew cut;Male:40,Female:15;2,3,4,5,6,7",
    
    // Short unisex hair styles
    "Short simple cut;Male:90,Female:30;1,2,3,4,5,6,7",
    "Short ponytail;Male:10,Female;3,4,5,6",
    
    // Long unisex hair styles
    "Long and straight;Male:30,Female:90;1,2,3,4,5,6,7",
    "Long and curly;Male:10,Female:80;1,2,3,4,5,6,7",
    "Long straight ponytail;Male:40,Female:80;3,4,5",
    "Long messy ponytail;Male:10,Female:80;3,4,5",

    // // Male cuts
    "Man bun;Male;3,4,5",

    // // Female cuts
    "Pixie cut;Female;1,2,3,4,5,6,7",
    
    // // Weird ones
    "Mohawk;Male:5,Female:5;3,4,5",
    "Faux Mohawk;Male:7,Female:5;3,4,5",


];

export const FACIALHAIR: string[] = [
    "Mustache;30",
    "Stubble;100",
    "Full beard;50",
    "Goatee;40",
    "Mutton Chops;10",
    "Toothbrush;10",
    "Long Stubble;40",
    "Circle Beard:40",
    "Braided Long Beard;10",
];


export interface HairData {
    name: string;
    forGenders: Gender[];
    likelihood: number[];
    forAgeGroups: AgeGroup[];
}

// "Bald;Male,Famale,Other;25,5,30;0,5,6,7",
// "Top bald;Male,Other;25,30;5,6,7",
// "Receiding;Male,Other;25,30;4,5,6,7",
// "Comb over;Male,Other;15,10;3,4,5",
// "Fade:Male,Female,Other;20,10,20;2,3,4,5",
// "Pompodous:Male,Female,Other;20,10,20;2,3,4,5",
// "Cut:Male,Female,Other;20,10,20;2,3,4,5",
// "Crew Cut:Male,Female,Other;20,10,20;2,3,4,5",
// "Manbun:Male,Other;20,10,20;2,3,4,5",
// "Mohawk:Male,Female,Other;20,10,20;2,3,4,5",
// "Long Ponytail:Male,Female,Other;20,10,20;2,3,4,5",
// "Spiky:Male,Female,Other;20,10,20;2,3,4,5",
// "Short Ponytail:Male,Female,Other;10,20,20;2,3,4,5",
// "Long and curly:Male,Female,Other;20,30,20;2,3,4,5",
// "Short and curly:Male,Female,Other;20,30,20;2,3,4,5",
// "Short and straight:Male,Female,Other;10,30,20;2,3,4,5",
// "Short and wavy:Male,Female,Other;20,30,20;2,3,4,5",
// "Low bun:Female,Other;30,20;2,3,4,5",
// "Pixie cut:Female,Other;10,30,20;2,3,4,5",
// "Bangs:Female,Other;20,30,20;2,3,4,5",
// "Vintage Curls:Female;30;3,4,5,6",
// "French Braid:Male,Female,Other;20,30,20;2,3,4,5",
// "Straight long hair:Male,Female,Other;5,30,20;3,4,5,6",
// "Rastas:Male,Female,Other;10,10,10;2,3,4",
// "Waterfall braids:Female,Other;10,5;2,3,4,5",
// "Undercut:Female,Other;20,30,20;2,3,4,5",

