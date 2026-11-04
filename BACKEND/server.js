const express = require('express');
const tietokanta = require('better-sqlite3');
const polku = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
const db = new tietokanta('tietokanta.db')

app.get('/api/players', (req, res) => {
    const players = db.prepare(
        'SELECT * FROM players ORDER BY kills DESC LIMIT 5'
    ).all();

    res.json(players);

});

app.listen(3000, () => {
    console.log('Servu pystyssä!');
});
