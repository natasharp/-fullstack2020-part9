interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface MultiplyValues {
    list: Array<number>;
    target: number;
}

export const validateArguments = (dailyExercises: Array<string>, target: number): boolean => {
    const isDailyExerciseEntryNan = dailyExercises.map(entry => isNaN(Number(entry)))
    if (!isDailyExerciseEntryNan.includes(true) && !isNaN(Number(target))) {
        return true
    } else {
        return false
    }
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    args.shift();
    args.shift();
    const target = args.shift();
    const isNanList = args.map(item => isNaN(Number(item)));

    if (!isNanList.includes(true) && !isNaN(Number(target))) {
        return {
            list: args.map(n => Number(n)),
            target: Number(target)
        };
    } else {
        throw new Error('Invalid arguments!');
    }
};

export const calculateExercise = (hoursByDays: Array<number>, targetHoursByDay: number): Result => {
    const sumOfHours = hoursByDays.reduce((sum, dayHours) => {
        return sum + dayHours;
    }, 0);
    const average = sumOfHours / hoursByDays.length;

    const getRating = (average: number): number => {
        const rating = average - targetHoursByDay;
        if (rating >= 0)
            return 3;
        else if (rating < 0 && rating > -0.5)
            return 2;
        else
            return 1;
    };

    const rating = getRating(average);
    const getRatingDescription = (rating: number): string => {
        switch (rating) {
            case 1:
                return 'not so good';
            case 2:
                return 'not too bad but could be better';
            case 3:
                return 'great';
            default:
                throw new Error('Error, something bad happened');
        }
    };

    return {
        periodLength: hoursByDays.length,
        trainingDays: hoursByDays.filter(day => day !== 0).length,
        success: average < targetHoursByDay ? false : true,
        rating,
        ratingDescription: getRatingDescription(rating),
        target: targetHoursByDay,
        average
    };
};

try {
    const { list, target } = parseArguments(process.argv);
    calculateExercise(list, target);
} catch (e) {
    console.log('Error, something bad happened, message: ', e);
}
