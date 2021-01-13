import patientsData from '../../data/patientsExtended'
import { NewPatientEntry, Patient, NonSensitiveInfoOfPatient, NewEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientsData
const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatientEntries = (): NonSensitiveInfoOfPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>
        ({ id, name, dateOfBirth, gender, occupation, entries }));
};

const getPatientById = (id: string): Patient | undefined=> {
    return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv4(),
        entries: [],
        ...entry
    }
    patients.push(newPatientEntry)
    return newPatientEntry
}

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
    const patient = patients.find(patient => patient.id == id)
    if (patient) {
        const newEntry = {
            id: uuidv4(),
            ...entry
        }
        patient.entries.push(newEntry)
    }
    return patient;
}

export default {
    getPatients,
    getNonSensitivePatientEntries,
    addPatient,
    getPatientById,
    addEntry
};