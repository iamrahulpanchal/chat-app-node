const express = require('express');
const path = require('path');

const app = express();

const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`Hello Chat`)
})

app.listen(PORT, () => {
    console.log(`Server is up on Port : ${PORT}`);
});