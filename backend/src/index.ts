import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";

//figure out how to use  the env with hono
const ai = new GoogleGenAI({});

const app = new Hono();

app.post("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
