import express from 'express';
const app = express();
import patientsRouter from './src/routes/patients';
import diagnosesRouter from './src/routes/diagnoses';
const cors = require('cors')
app.use(express.json());
app.use(cors())

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});