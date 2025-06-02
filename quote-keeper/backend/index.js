import express from "express";
import { v4 as uuidv4 } from "uuid";
import rateLimit  from "express-rate-limit";
import morgan from "morgan";
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const FILE_PATH = "./quotes.js";
const app = express();

import authRoutes from "./routes/authRoutes.js";
import quotesRoutes from "./routes/quotesRoutes.js";

// Adding Rate limiting middleware to routes
// Set rate limit: 10 request per minute
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // time in milliseconds
    max: 10, // no of requests allowed
    message: "Too many requests, please try again later."
});
// apply rate limiter to all routes
app.use(limiter);

// IP Logging
app.use(morgan("combined"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect routes
app.use("/api/auth", authRoutes)
app.use("/api/quotes", quotesRoutes)

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to the Quote Keeper API!</h1>
        <p>Go to <a href='/api/quotes'>/api/quotes</a> to get a list of quotes.</p>
        <p>Go to <a href='/api/quotes/:id'>/api/quotes/:id</a> to get a quote by id.</p>
        <p>Go to <a href='/api/quotes'>/api/quotes</a> and make a post request to add a quote.</p>
        <p>Go to <a href='/api/quotes/:id'>/api/quotes/:id</a> and make a put request to update a quote.</p>
        <p>Go to <a href='/api/quotes/:id'>/api/quotes/:id</a> and make a delete request to delete a quote.</p>`)
})

app.listen(PORT, () => {
        console.log(`server listening at port ${PORT}`);
    })