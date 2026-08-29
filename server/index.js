/**
 * Local API server for development.
 * Runs on http://localhost:3001; the Vite dev server proxies
 * /api to this port (see vite.config.ts).
 */
import express from "express";
import { handleContact } from "./contact.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json({ limit: "10kb" }));
app.post("/api/contact", handleContact);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});