const express = require('express');
const sqlite = require('better-sqlite3');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
const db = new sqlite('tietokanta.db')

app.get('/api/players', (req, res) => {
    const players = db.prepare(
        'SELECT * FROM players ORDER BY kills DESC LIMIT 5'
    ).all();

    res.json(players);

});

app.get('/api/lb', (req, res) => {
    const players = db.prepare(
        'SELECT * FROM players ORDER BY kills DESC'
    ).all();
    res.json(players);
});

app.get('/api/mr', (req, res) => {
    const players = db.prepare(
        'SELECT COUNT(*) FROM players'
    ).all();
    res.json(players);
});


app.listen(3000, () => {
    console.log('Servu pystyssä!');
});
