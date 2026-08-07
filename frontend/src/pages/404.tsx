import { Link } from "react-router";

export default function NotFound() {
  return (
    <main>
      <div className=" -z-10 absolute top-0  h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]"></div>
      <div className="h-screen flex flex-col items-center justify-center text-white  gap-4">
        <h1 className="text-5xl font-semibold  ">Error 404</h1>
        <p className="text-xl">No se pudo acceder a esta pagina {`:(`}</p>
        <Link
          className="border px-3 py-2 bg-white text-black rounded-lg"
          to={"/"}
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
