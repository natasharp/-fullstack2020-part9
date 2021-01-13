interface Measures {
    height: number;
    weight: number;
}

const parse = (args: Array<string>): Measures => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Invalid arguments!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const result = weight / (height * height * 0.0001);
    if (result < 18.5) {
        return 'Underweight';
    } else if (result > 18.5 && result < 25) {
        return 'Normal, healthy weight';
    } else if (result >= 25 && result < 30) {
        return 'Owerweight';
    } else {
        return 'Obesity';
    }
};

try {
    const { height, weight } = parse(process.argv);
    calculateBmi(height, weight);
} catch (e) {
    console.log('Error, something bad happened, message: ', e); 
}

