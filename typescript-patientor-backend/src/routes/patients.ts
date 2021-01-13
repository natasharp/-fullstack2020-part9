import express from 'express';
import patientService from '../services/patientService'
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientEntries());
})

router.get('/:id', (_req, res) => {
    res.send(patientService.getPatientById(_req.params.id));
})

router.post('/', (_req, res) => {
    try {
        const newPatient = toNewPatientEntry(_req.body);
        const addedEntry = patientService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/:id/entries', (_req, res) => {
    try {
        const newEntry = toNewEntry(_req.body)
        const id = _req.params.id
        const addedEntry = patientService.addEntry(id, newEntry)
        addedEntry ? res.json(addedEntry) : res.status(404)
    } catch (e) {
        res.status(400).send(e.message);
    }
})

export default router;