const express = require('express');
const sqlite = require('better-sqlite3');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = new sqlite('tietokanta.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        creation_date TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

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


app.post('/api/register', async (req, res) => {
    const { mail, uname, psw } = req.body;

    if (!mail || !uname || !psw) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (psw.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    try {
        const hash = await bcrypt.hash(psw, 12);

        db.prepare(
            'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)'
        ).run(mail.trim().toLowerCase(), uname.trim(), hash);

        res.status(201).json({ message: 'Account created.' });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: 'Email or username already in use.' });
        }
        console.error(err);
        res.status(500).json({ error: 'Server error.' });
    }
});

app.listen(3000, () => {
    console.log('Servu pystyssä!');
});
