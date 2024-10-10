const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome to root URL of the server');
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.log('Error occured server cannot connect', err);
    }
})