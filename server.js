const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Använd EJS som view engine
app.set("view engine", "ejs");

// Hantera formulärdata
app.use(express.urlencoded({ extended: true }));

// Gör CSS och andra statiska filer tillgängliga
app.use(express.static(path.join(__dirname, "public")));

// Startsida
app.get("/", (req, res) => {
    res.render("index");
});

// Lägg till kurs
app.get("/add", (req, res) => {
    res.render("add");
});

// Om sidan
app.get("/about", (req, res) => {
    res.render("about");
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});