const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');
const branchRoutes = require('./routes/branchRoutes');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome to root URL of the server');
});

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/branch', branchRoutes);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.log('Error occurred: server cannot connect', err);
    }
});

// Connect to the database
connectDB();