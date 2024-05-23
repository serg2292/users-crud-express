const sqlite3 = require('sqlite3').verbose();

const usersDB = new sqlite3.Database('db/users.db', (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

function createUsersTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT
        )
    `;

    usersDB.run(sql, (err) => {
        if (err) {
            console.error('Database table creation error: ' + err.message);
        } else {
            console.log('Table "users" created or already existed.');
        }
    });
}

module.exports = { createUsersTable, usersDB };
