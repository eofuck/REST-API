require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentsRouter = require('./routes/students');

app.use(express.json());
//anything that wil come after /students will be
//taken care of by studentsRouter
app.use('/students', studentsRouter);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('Connected to Database'))
  .catch((err) => console.log(err));

const db = mongoose.connection;

app.listen(3000, () => console.log('Server started'));
