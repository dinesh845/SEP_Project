import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Basic Content Security Policy to allow local assets and common CDNs used by the frontend.
// This is permissive enough for local development; tighten it for production.
app.use((req, res, next) => {
	// Stricter CSP for production-ready posture while keeping inline handlers for now.
	// NOTE: For an even stronger policy remove 'unsafe-inline' for scripts and
	// replace inline handlers with externally loaded scripts using nonces or hashes.
	const port = process.env.PORT || 5000;
	const csp = [
		"default-src 'self' data: blob: https:",
		// Keep 'unsafe-inline' temporarily to support inline onclick handlers in the static HTML.
		"script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
		"style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
		// Restrict fonts to the known hosts used by the frontend
		"font-src 'self' https://r2cdn.perplexity.ai https://cdnjs.cloudflare.com data:",
		"img-src 'self' data: https:",
		`connect-src 'self' http://localhost:${port} https:`,
		"frame-ancestors 'self'",
		"base-uri 'self'",
		"object-src 'none'"
	].join('; ');

	res.setHeader('Content-Security-Policy', csp);
	// Additional security headers (recommended)
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-Frame-Options', 'DENY');
	next();
});

app.use("/api/users", userRoutes);

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files from ../frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Fallback: for non-API routes, serve index.html (useful for SPA and direct navigation)
app.get("*", (req, res) => {
	if (req.path.startsWith("/api")) return res.status(404).json({ message: "API route not found" });
	res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
