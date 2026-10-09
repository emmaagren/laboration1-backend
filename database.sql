-- Laboration 1: Databasbaserat CV
--Skapar tabellen för lagring av kurser

CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL
);