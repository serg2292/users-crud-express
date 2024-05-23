const { usersDB } = require("../database/usersDB");

class UsersRepository {
    async getAllUsers() {
        const sql = 'SELECT * FROM users';
        const params = [];
        return new Promise((resolve, reject) => {
            usersDB.all(sql, params, (err, rows) => {
                if (err) {
                    console.error('Error running sql: ' + sql);
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    async addUser(user) {
        const { name, email, password } = user
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const params = [name, email, password];
        const lastId = await new Promise((resolve, reject) => {
            usersDB.run(sql, params, function (err) {
                if (err) {
                    console.error('Error running sql: ' + sql);
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });

        return { id: lastId, ...user }
    }
    async findUserById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const params = [id];
        const user = await new Promise((resolve, reject) => {
            usersDB.get(sql, params, function (err, result) {
                if (err) {
                    console.error('Error running sql: ' + sql);
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return user
    }
    async updateUser({ name, email, password, id }) {
        const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
        const params = [name, email, password, id];
        const changes = await new Promise((resolve, reject) => {
            usersDB.run(sql, params, function (err) {
                if (err) {
                    console.error('Error running sql: ' + sql);
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(this.changes)
                }
            });
        });

        if (changes === 0) {
            return null
        }

        return this.findUserById(id)
    }
    async deleteUser(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const params = [id];
        const changes = await new Promise((resolve, reject) => {
            usersDB.run(sql, params, function (err) {
                if (err) {
                    console.error('Error running sql: ' + sql);
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(this.changes)
                }
            });
        });


        return changes > 0
    }

};

module.exports = new UsersRepository();
