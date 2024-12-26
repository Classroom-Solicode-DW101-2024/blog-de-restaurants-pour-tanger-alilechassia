const express = require('express'); 
const fs = require('fs'); 
const app = express(); 
const cors = require('cors');
app.use(cors());

const port = 3000; 
function readData() {
    const data = fs.readFileSync('restaurants.json'); 
    return JSON.parse(data); 
}


app.get('/restaurants', (req, res) => {
    const restaurants = readData(); 
    res.json(restaurants); 
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); 
});