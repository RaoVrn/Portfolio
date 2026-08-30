/**
 * Vercel serverless function — GET /api/github.
 * Delegates to the same shared handler the local dev server uses.
 */
import { handleGithub } from "../server/github.js";

export default handleGithub;