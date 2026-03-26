import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { auth } from "./auth";

const app = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.on(["GET", "POST"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get("/", (c) => c.json({ status: "ok" }));

const port = Number(process.env.PORT) || 3000;
serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
