import { Hono } from "hono";
import { cors } from "hono/cors";
import { InferenceClient } from "@huggingface/inference";

const app = new Hono();

const client = new InferenceClient(process.env.HF_TOKEN);

app.use(cors({ origin: "http://localhost:5173" }));

const STYLE_SUFFIXES: Record<string, string> = {
  cyberpunk:
    "cyberpunk anime style, neon lights, rain, dark city, masterpiece, best quality",
  chibi:
    "chibi style, kawaii, pastel colors, big head, cute, soft shading, best quality",
  ghibli:
    "Studio Ghibli style, watercolor, soft lighting, nature, Miyazaki, best quality",
  manga:
    "manga style, black and white, ink lines, no color, shonen manga, best quality",
};

app.post("/api/generate", async (c) => {
  const { prompt, style } = await c.req.json();

  if (!prompt || !style) {
    return c.json({ error: "Faltan campos: prompt y style" }, 400);
  }

  const styleSuffix = STYLE_SUFFIXES[style] ?? STYLE_SUFFIXES.cyberpunk;
  const fullPrompt = `${prompt}, ${styleSuffix}`;

  const imageBlob = await client.textToImage({
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: fullPrompt,
    parameters: { num_inference_steps: 4 },
  });

  //@ts-ignore
  const arrayBuffer = await imageBlob.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return c.json({
    image: `data:image/jpeg;base64,${base64}`,
    prompt: fullPrompt,
  });
});
export default app;
