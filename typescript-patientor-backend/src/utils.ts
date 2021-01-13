import { NewPatientEntry, Gender, NewEntry, EntryType, HealthCheckRating } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    }
    return newEntry
}

export const toNewEntry = (object: any): NewEntry => {
    const parsedBaseEntry = {
        type: parseEntryType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes
    };

    switch (parsedBaseEntry.type) {
        case EntryType.HealthCheck:
            const newHealthCheckEntry = {
                ...parsedBaseEntry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            return newHealthCheckEntry as NewEntry;

        case EntryType.OccupationalHealthCare:
            const newOccupationalHCEntry = {
                ...parsedBaseEntry,
                employerName: parseName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
            return newOccupationalHCEntry as NewEntry;

        case EntryType.Hospital:
            const newHospitalEntry = {
                ...parsedBaseEntry,
                discharge: parseDischarge(object.discharge)
            };
            return newHospitalEntry as NewEntry;
        default:
            return assertNever(parsedBaseEntry.type);
    }
};

const parseEntryType = (entryType: any): EntryType => {
    if (!Object.values(EntryType).includes(entryType)) {
        throw new Error(`Incorrect or missing type: ${entryType || ""}`);
    }
    return entryType;
};

const parseSickLeave = (sickLeave: any): object => {
    if (!sickLeave) {
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    }
    return sickLeave;
};

const parseDischarge = (sickLeave: any): object => {
    if (!sickLeave) {
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    }
    return sickLeave;
};

const parseDescription = (descritpion: any): string => {
    if (!descritpion || !isString(descritpion)) {
        throw new Error('Incorrect or missing description: ' + descritpion);
    }
    return descritpion;
}

const parseDate = (date: any): string => {
    if (!date || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
}

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
}

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
}

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!Object.values(HealthCheckRating).includes(rating)) {
        throw new Error(`Incorrect or missing type: ${rating || ""}`);
    }
    return rating;
}

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
}

const parseDateOfBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
