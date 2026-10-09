const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Öppna databasen och skapa tabelllen om den inte finns
async function initDatabase() {
    const db = await open({
        filename: "./courses.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coursecode TEXT NOT NULL,
        coursename TEXT NOT NULL,
        syllabus TEXT NOT NULL,
        progression TEXT NOT NULL
        )
    `);

    return db;
}

module.exports = initDatabase;