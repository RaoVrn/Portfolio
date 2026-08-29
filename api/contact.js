/**
 * Vercel serverless function — POST /api/contact.
 * Delegates to the same shared handler the local dev server uses.
 */
import { handleContact } from "../server/contact.js";

export default handleContact;