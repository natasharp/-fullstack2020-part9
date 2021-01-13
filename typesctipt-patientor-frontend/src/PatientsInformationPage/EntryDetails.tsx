import React from "react";
import { Icon, Card, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry, HealthCheckEntry, HealthCheckRating, HealthCheckRatingIcon, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { assertNever } from "../utils";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        case undefined:
            return null;
        default:
            return assertNever(entry);
    }
}

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header> {entry.date} <Icon name="h square" size="big" /> </Card.Header>
                <Card.Meta>
                    <i>{entry.description}</i>
                    <div>Discharged {entry.discharge.date}, {entry.discharge.criteria}</div>
                    <Codes entry={entry} />
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header> {entry.date} <Icon name="stethoscope" size="big" />{entry.employerName}</Card.Header>
                <Card.Meta>
                    <i>{entry.description}</i>
                    <Codes entry={entry} />
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const getHeartIcon = (): HealthCheckRatingIcon => {
        switch (entry.healthCheckRating) {
            case HealthCheckRating.Healthy:
                return HealthCheckRatingIcon.Healthy
            case HealthCheckRating.LowRisk:
                return HealthCheckRatingIcon.LowRisk
            case HealthCheckRating.HighRisk:
                return HealthCheckRatingIcon.HighRisk
            default:
                return HealthCheckRatingIcon.CriticalRisk
        }
    }
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header> {entry.date} <Icon name="doctor" size="big" /> </Card.Header>
                <Card.Meta><i>{entry.description}</i></Card.Meta>
                <Icon name="heart" color={getHeartIcon()} />
                <Card.Meta><Codes entry={entry} /> </Card.Meta>
            </Card.Content>
        </Card>
    )
}

const Codes: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();
    return (<List bulleted>{entry.diagnosisCodes?.map(
        (code) => <List.Item key={code}>{code} {diagnoses[code]?.name}</List.Item>)}</List>
    )
}

export default EntryDetails