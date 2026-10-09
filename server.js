const express = require("express");
const path = require("path");
const initDatabase = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

// Använd EJS som view engine
app.set("view engine", "ejs");

// Hantera formulärdata
app.use(express.urlencoded({ extended: true }));

// Gör CSS och andra statiska filer tillgängliga
app.use(express.static(path.join(__dirname, "public")));

// Startsida - hämta alla kurser från databasen
app.get("/", async (req, res) => {
    try {
        const db = req.app.locals.db;

        // Hämta alla kurser, sorterade efter kurskod
        const courses = await db.all(
            "SELECT * FROM courses ORDER BY coursecode"
        );

        // Skicka kurserna till EJS
        res.render("index", { courses });
    } catch (error) {
        console.error("Fel vid hämtning av kurser:", error);
        res.status(500).send("Kunde inte hämta kurserna.");
    }
});


// Visa formuläret för att lägga till kurs
app.get("/add", (req, res) => {
    res.render("add", { error: null });
});

// Ta emot och spara en ny kurs
app.post("/add", async (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;

    // Kontrollera att alla fält är ifyllda
    if (
        !coursecode?.trim() ||
        !coursename?.trim() ||
        !syllabus?.trim() ||
        !["A", "B", "C"].includes(progression)
    ) {
        return res.status(400).render("add", {
            error: "Alla fält måste fyllas i korrekt."
        });
    }

    // Kontrollera att kursplanen är en giltig webbadress
    try {
        const url = new URL(syllabus);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Ogiltigt protokoll");

        }
    } catch {
        return res.status(400).render("add", {
            error: "Ange en giltig webbadress till kursplanen."
        });
    }


    try {
        const db = req.app.locals.db;

        // Spara kursen i databasen
        await db.run(
            `INSERT INTO courses
        (coursecode, coursename, syllabus, progression)
        VALUES (?, ?, ?, ?)`,
            [
                coursecode.trim(),
                coursename.trim(),
                syllabus.trim(),
                progression
            ]
        );

        // Gå tillbaka till startsidan
        res.redirect("/");

    } catch (error) {
        console.error("Fel vid lagring av kurs:", error);

        res.status(500).render("add", {
            error: "Kursen kunde inte sparas. Försök igen."
        });
    }

});

// Radera en kurs från databasen
app.post("/delete/:id", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const id = Number(req.params.id);

        // Kontrollera att kursens ID är giltigt
        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).send("Ogiltigt kurs-ID");
        }

        // Radera kursen med angivet ID
        await db.run(
            "DELETE FROM courses WHERE id = ?",
            [id]
        );

        // Gå tillbaka till startsidan
        res.redirect("/");

    } catch (error) {
        console.error("Fel vid radering av kurs:", error);
        res.status(500).send("Kursen kunde inte raderas.");
    }
});


// Visa Om-sidan
app.get("/about", (req, res) => {
    res.render("about");
});

// Starta databasen innan servern
async function startServer() {
    try {
        const db = await initDatabase();
        app.locals.db = db;

        app.listen(PORT, () => {
            console.log(`Servern körs på http://localhost:${PORT}`);
            console.log("Databasen är ansluten!");
        });
    } catch (error) {
        console.error("Kunde inte starta servern:", error);
    }
}

startServer();