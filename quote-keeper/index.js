const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

let quotes = [
    { id: 1, text: "The only limit to our realization of tomorrow is our doubts of today." },
    { id: 2, text: "The future belongs to those who believe in the beauty of their dreams." },
    { id: 3, text: "It does not matter how slowly you go as long as you do not stop." },
    { id: 4, text: "Success is not final, failure is not fatal: It is the courage to continue that counts." },
    { id: 5, text: "Believe you can and you're halfway there." },
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to the Quote Keeper API!</h1>
        <p>Go to <a href='/quotes'>/quotes</a> to get a list of quotes.</p>
        <p>Go to <a href='/quotes/1'>/quotes/1</a> to get a quote by id.</p>
        <p>Go to <a href='/quotes'>/quotes</a> and make a post request to add a quote.</p>
        <p>Go to <a href='/quotes/:id'>/quotes/:id</a> and make a delete request to delete a quote.</p>`)
})

// Create quote
app.post("/quotes", (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    const newQuote = { id: quotes.length + 1, text };
    quotes.push(newQuote);
    res.status(201).json(newQuote);
})

// Read quotes
app.get("/quotes", (req, res) => {
    res.json(quotes);
})

// Read a quote by id
app.get("/quotes/:id", (req, res) => {
    let id = parseInt(req.params.id)
    if (isNaN(id))
        return res.status(400).json({error: "Invalid id"});
    const quote = quotes.find(q => q.id === id)
    if (!quote)
        return res.status(404).json({error: "Quote not found"});
    res.json(quote)
})
// Update quote
app.put("/quotes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const index = quotes.findIndex(quote => quote.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Quote not found" });
    }
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    quotes[index].text = text;
    res.status(200).json(quotes[index]);
})

// Delete quote
app.delete("/quotes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
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