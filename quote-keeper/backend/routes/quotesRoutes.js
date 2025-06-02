import { getQuotes, getMyQuotes, createQuotes, getQuotesById, updateQuote, deleteQuote } from '../controllers/quotesController.js';
import requireAuth from "../middlewares/authMiddleware.js";
import express from 'express';
const router = express.Router()


router.get("/", getQuotes)
router.get("/:author", requireAuth, getMyQuotes)
router.post("/", requireAuth, createQuotes)
router.get("/:id", requireAuth, getQuotesById)
router.put("/:id", requireAuth, updateQuote)
router.delete("/:id", requireAuth, deleteQuote)

export default router;