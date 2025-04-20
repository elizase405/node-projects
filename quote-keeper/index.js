const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const FILE_PATH = "./quotes.js";
const app = express();

// Load quotes from file
const loadQuotes = () => {
    try {
        if (!fs.existsSync(FILE_PATH)) return [];
        const data = fs.readFileSync(FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading quotes file:", err);
        return [];
    }
}
// Save quotes to file
const saveQuotes = (quotes) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(quotes, null, 2));
    } catch (err) {
        console.error("Error saving quotes:", err);
    }
}

let quotes = loadQuotes();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to the Quote Keeper API!</h1>
        <p>Go to <a href='/quotes'>/quotes</a> to get a list of quotes.</p>
        <p>Go to <a href='/quotes/:id'>/quotes/:id</a> to get a quote by id.</p>
        <p>Go to <a href='/quotes'>/quotes</a> and make a post request to add a quote.</p>
        <p>Go to <a href='/quotes/:id'>/quotes/:id</a> and make a put request to update a quote.</p>
        <p>Go to <a href='/quotes/:id'>/quotes/:id</a> and make a delete request to delete a quote.</p>`)
})

// Create quote
app.post("/quotes", (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    const newQuote = { id: uuidv4(), text, createdAt: new Date(), updatedAt: new Date() };
    quotes.push(newQuote);
    saveQuotes(quotes)
    res.status(201).json(newQuote);
})

// Read quotes
app.get("/quotes", (req, res) => {
    res.json(quotes);
})

// Read a quote by id
app.get("/quotes/:id", (req, res) => {
    let id = req.params.id
    const quote = quotes.find(q => q.id === id)
    if (!quote)
        return res.status(404).json({error: "Quote not found"});
    res.json(quote)
})

// Update quote
app.put("/quotes/:id", (req, res) => {
    const id = req.params.id;
    const index = quotes.findIndex(quote => quote.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Quote not found" });
    }
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    quotes[index].text = text;
    quotes[index].updatedAt = new Date()
    res.status(200).json(quotes[index]);
})

// Delete quote
app.delete("/quotes/:id", (req, res) => {
    const id = req.params.id;
    const index = quotes.findIndex(quote => quote.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Quote not found" });
    }
    quotes.splice(index, 1);
    res.status(200).json({ message: "Quote deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`);
})