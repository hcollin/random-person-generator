

export interface Personality {
    generalPersonality: GeneralPersonalityTrait[];
    positiveTraits: Trait[];
    negativeTraits: Trait[];
    mentalIllnesses: string[];
}

export interface GeneralPersonalityTrait {
    nameA: string;
    nameB: string;
    value: number;
}

export interface Trait {
    name: string;
    attachedTo: string;
    likelihood: number;
    opposite: string;
}