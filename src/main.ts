import Gender from "./types/Gender";
import { Person as FinnishPerson } from "./types/Person";
import { randomPerson, randomPersonOptions, birthdayObject, randomBirthday } from "./randomPerson";
import { Address, getRandomAddress } from "./addressGenerator";
import { getRandomFinnishName, RandomFinnishNameOptions, FinnishNameObject } from "./nameGenerator";
import { validateHetu } from "./socialSecurityNumber";

function randomFinnishPerson(options?: randomPersonOptions): FinnishPerson {
    if (options !== undefined) {
        return randomPerson(options);
    }
    return randomPerson({});
}

function randomFinnishMale(): FinnishPerson {
    return randomPerson({ gender: Gender.MALE });
}

function randomFinnishFemale(): FinnishPerson {
    return randomPerson({ gender: Gender.FEMALE });
}

// TODO
function validateFinnishSocialSecurityNumber(ssn: string):boolean {
	return validateHetu(ssn);
}

function randomFinnishAddress(): Address {
	return getRandomAddress();
}

function getRandomBirthday(minAge?: number, maxAge?:number): birthdayObject {

	const min = minAge || 0;
	const max = maxAge || minAge || 100;

	return randomBirthday(min, max);
}

/**
 * Return a random Finnish name
 * 
 * @param nameOptions RandomFinnishNameOptions
 */
function randomFinnishName(nameOptions: RandomFinnishNameOptions): FinnishNameObject {
	
	return getRandomFinnishName(nameOptions);
}


module.exports = {
	randomFinnishPerson,
	randomFinnishMale,
	randomFinnishFemale,
	randomFinnishName,
	randomFinnishAddress,
	randomBirthday: getRandomBirthday,

	validateFinnishSocialSecurityNumber,

}