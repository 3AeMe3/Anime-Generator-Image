import { useState } from "react";
import { useImageGen } from "../hooks/useImageGen";
import { STYLES } from "../lib/const/styles";

import { useNavigate } from "react-router";

export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<
    "cyberpunk" | "chibi" | "ghibli" | "manga"
  >("cyberpunk");
  const { generate, error, loading, data } = useImageGen();
  const navigate = useNavigate();

  if (data !== null) {
    navigate("/image", { state: { data, style } });
    return;
  }
  return (
    <main className=" text-white h-screen">
      <div className=" -z-10 absolute top-0  h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]"></div>
      <section className="h-full xl:max-w-3/6 mx-auto">
        <div className="flex flex-col gap-5 xl:gap-15 justify-center items-center h-full  ">
          <div className="flex flex-col items-center justify-center  gap-2">
            <h1 className="text-5xl  md:text-6xl font-bold text-white  ">
              IMAGIZEN
            </h1>
            <p className="text-xl text-white/60 font-semibold md:text-3xl w-full text-center   ">
              Convierte Tus Ideas en Imagenes
            </p>
          </div>

          <textarea
            className="border border-white/40 w-full max-w-3/4 md:max-w-3/6 py-3 px-4 rounded-2xl  focus:outline-1 focus:outline-white prompt-font"
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Un Mundo con 3 lunas..."
          />

          <button
            className={`${prompt.length <= 3 ? "border-white/20 text-white/20 cursor-default pointer-events-none " : "pointer-events-auto transition-all duration-300 ease-in-out bg-white text-black  "} border border-white  font-bold px-4 py-1 rounded-xl cursor-pointer text-xl`}
            onClick={() => generate(prompt, style)}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>

          <div className="flex flex-row  gap-3  ">
            {STYLES.map((s) => {
              return (
                <button
                  onClick={() => setStyle(s.id)}
                  key={s.id}
                  className={`${style === s.id ? "font-semibold   animate-pulsing animate-duration-400 animate-fill-mode-both  " : "opacity-60 font-normal text-white/50  hover:scale-95"}  rounded-xl  transition-transform duration-300 cursor-pointer flex flex-col gap-2  items-center `}
                >
                  <img
                    src={`/typesImage/${s.id}.webp`}
                    className="h-20 w-20 md:h-40 md:w-40"
                  />
                  <p>{s.label}</p>
                </button>
              );
            })}
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </section>
    </main>
  );
}
