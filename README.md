# Laboration 1 - Databaserat CV

## Beskrivning
Detta projekt är skapat som en del av kursen Beckend-baserad webbutveckling.

Webbplatsen fungerar som ett digitalt CV där användaren kan visa, lägga till och radera kurser. Kursinformationen lagras i en databas.

## Publicerad webbplats
Webbplatsen finns publicerad på Render:
[Besök webbplatsen](https://laboration-1-cv.onrender.com/)

## Tekniker
- Node.js
- Express
- EJS
- SQLite
- HTML och CSS

## Funktioner
- Visa kurser från databasen
- Lägga till nya kurser via formulär
- Radera befintliga kurser
- Validering av formulärdata på serversidan
- Responsiv design
- Informationssida om projektet

## Installation

1. Klona projektet från GitHub.
2. Öppna projektmappen i terminalen.
3. Installera beroenden:

```bash
npm install
```
4. Starta servern:

```bash
node server.js
```

5. Öppna http://localhost:3000 i webbläsaren.

SQLite-databasen och tabellen `courses` skapas automatiskt vid första starten.

## Databas

Projektet använder SQLite och innehåller tabellen `courses` med följande kolumner:

- `id` - primärnyckel
- `coursecode` - kurskod
- `coursename` - kursnamn
- `syllabus` - länk till kursplan
- `progression` - progression (A, B eller C)

Databasens struktur finns även i `database.sql` och illustreras i `er-diagram.png`.

## Författare

Emma Ågren