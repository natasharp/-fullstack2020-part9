import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
    part: CoursePart
}

const Part: React.FunctionComponent<PartProps> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <h3>
                        {part.name} {part.exerciseCount}
                    </h3>
                    <p>{part.description}</p>
                </div>
            );
        case "Using props to pass data":
            return (
                <div>
                    <h3>
                        {part.name} {part.exerciseCount}
                    </h3>
                    <p>Project count: {part.groupProjectCount}</p>
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <h3>
                        {part.name} {part.exerciseCount}
                    </h3>
                    <p>{part.description}</p>
                    <p>Subbmition link: {part.exerciseSubmissionLink}</p>
                </div>
            );
        case "Master types":
            return (
                <div>
                    <h3>
                        {part.name} {part.exerciseCount}
                    </h3>
                    <p>{part.description}</p>
                    <p>Project example: {part.projectExampleLink}</p>
                </div>
            );
        default:
            return assertNever(part)
    }
};

export default Part