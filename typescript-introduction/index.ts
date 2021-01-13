import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, validateArguments } from './exerciseCalculator';
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
  if (!isNaN(Number(_req.query.height)) && !isNaN(Number(_req.query.weight))) {
    const bmi = calculateBmi(Number(_req.query.height), Number(_req.query.weight));
    res.send({ weight: _req.query.weight, height: _req.query.height, bmi });
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (_req, res) => {
  if (!_req.body.daily_exercises || !_req.body.target) {
    res.json({error: "parameters missing"})
  }
  const validatedArguments = validateArguments(_req.body.daily_exercises, _req.body.target)
  if (!validatedArguments) {
    res.json({error: "invalid parameters"})
  }
  const {daily_exercises, target}  = _req.body
  const exerciseCalculation = calculateExercise(daily_exercises, target)
  res.json(exerciseCalculation)
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});