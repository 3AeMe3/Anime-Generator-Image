import { useState } from "react";

type Style = "cyberpunk" | "chibi" | "ghibli" | "manga";

interface GenerateResult {
  image: string;
  prompt: string;
}

export function useImageGen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GenerateResult | null>(null);

  const generate = async (prompt: string, style: Style) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });

      if (!res.ok) throw new Error("Error en el servidor");

      const data = await res.json();
      setData(data);
    } catch (_) {
      setError(" No se puede generar la imagen. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, data, error };
}
