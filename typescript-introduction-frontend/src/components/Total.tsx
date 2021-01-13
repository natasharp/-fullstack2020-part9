import React from "react";
import { CoursePart } from "../types";

interface TotalProps {
    courseParts: Array<CoursePart>
}

const Total: React.FunctionComponent<TotalProps> = ({ courseParts }) => {
    return (
        <h2>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </h2>)
};

export default Total

