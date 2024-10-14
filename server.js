const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');
const branchRoutes = require('./routes/branchRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const marksRoutes = require('./routes/marksRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the root URL of the server');
});

app.use('/api/students', studentRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/marks', marksRoutes)

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.log('Error occurred: server cannot connect', err);
    }
});

// Connect to the database
connectDB();