import { db } from "../db/db.js";
import { v4 as uuidv4 } from "uuid";

const getQuotes = async (req, res) => {
    await db.read();
    const quotes = db.data.quotes;
    res.status(200).json(quotes);
}

const getMyQuotes = async (req, res) => {
    const author = req.params.author;
    if (!author) return res.status(400).json({ error: "Author is required" });
    if (author !== req.user.username) return res.status(403).json({ error: `${req.user.username} You are not authorized to view this quote` });

    await db.read();
    let quotes = db.data.quotes
    if (!quotes) {
        return res.status(404).json({ error: `${req.user.username} No quotes found` });
    }
    quotes = quotes.filter(q => q.author === req.user.username);
    res.status(200).json(quotes);
}

const createQuotes  = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const quote = {
        id: uuidv4(),
        quote: text,
        author: req.user.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    const quotes = db.data.quotes;
    const quoteInDB = quotes.map(q => q.quote === quote.quote)
    if (quoteInDB) {
        return res.status(400).json({ error: "Quote already exists" });
    }
    const newQuote = quotes.push(quote);
    await db.write();
    res.status(201).json(`Quote for ${req.user.username} created:`, newQuote);
}

const getQuotesById = async (req, res) => {
    const id = req.params.id;
    await db.read();
    const quote = db.data.quotes.find(q => q.id === id);
    if (!quote) return res.status(404).json({ error: "Quote not found" });
    if (quote.author !== req.user.username) {
        return res.status(403).json({ error: "You are not authorized to view this quote" });
    }
    res.status(200).json(quote);
}

const updateQuote = async (req, res) => {
    await db.read();
    const id = req.params.id;

    const quote = db.data.quotes.find(q => q.id === id);
    if (!quote) return res.status(404).json({ error: "Quote not found" });
    if (quote.author !== req.user.username) return res.status(403).json({ error: `${req.user.username} You are not authorized to update this quote` });

    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    if (quote.quote === text) return res.status(400).json({ error: "Quote already exists" });

    quote.quote = text;
    quote.updatedAt = new Date().toISOString();
    await db.write();
    res.status(200).json({ message: `Quote for ${req.user.username} updated:`, quote });
}

const deleteQuote = async (req, res) => {
    await db.read();
    const id = req.params.id;
    const index = db.data.quotes.findIndex(q => q.id === id);
    if (index === -1) return res.status(404).json({ error: "Quote not found" });
    if (db.data.quotes[index].author !== req.user.username) return res.status(403).json({ error: `${req.user.username} You are not authorized to delete this quote` });

    db.data.quotes.splice(index, 1);
    await db.write();
    res.status(200).json({ message: `Quote for ${req.user.username} deleted successfully` });
}

export {
    getQuotes,
    getMyQuotes,
    createQuotes,
    getQuotesById,
    updateQuote,
    deleteQuote
};