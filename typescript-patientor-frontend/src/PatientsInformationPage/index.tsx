import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { Button, Icon } from 'semantic-ui-react'
import { EntryFormValues, Gender, GenderIcon, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientsInformationPage: React.FC = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
        const fetchPatientInfo = async (id: string) => {
            try {
                const { data: patient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`,
                );
                dispatch(setPatient(patient));
            } catch (e) {
                console.error(e.response.data);
            }
        };
        fetchPatientInfo(id)
    }, [id, dispatch])

    const patient = patients[id]
    const getGenderIcon = (): GenderIcon => {
        switch (patient.gender) {
            case Gender.Female:
                return GenderIcon.Female
            case Gender.Male:
                return GenderIcon.Male
            default:
                return GenderIcon.Other
        }
    }

    const addNewEntry = async (values: EntryFormValues) => {
        console.log(values)
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(setPatient(updatedPatient));

            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    }

    if (patient && diagnoses) {
        return (
            <div>
                <h2>{patient.name}  <Icon name={getGenderIcon()} /></h2>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={addNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <h3>entries </h3>
                <div>
                    <Button onClick={() => openModal()}>Add New Entry</Button>
                </div>
                {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
            </div>
        )
    } else {
        return null
    }
};

export default PatientsInformationPage;