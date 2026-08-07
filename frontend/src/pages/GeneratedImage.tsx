import { useLocation, useNavigate } from "react-router";
import DownloadButton from "../components/download-button";
import { Undo2 } from "lucide-react";
export default function GeneratedImage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, style } = location.state;

  return (
    <main className="text-white h-screen">
      <div className=" -z-10 absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <button className="absolute mt-5 mx-5 hover:scale-95 transition-all duration-300 cursor-pointer">
        <Undo2 size={30} onClick={() => navigate("/")} />
      </button>
      <div className=" h-full flex justify-center flex-col items-center gap-5 max-w-3/4 mx-auto">
        <h1 className="text-3xl font-semibold ">style: {style}</h1>
        <img src={data.image} alt="imagen generada" className=" max-h-3/4  " />
        <DownloadButton style={style} data={data} />
      </div>
    </main>
  );
}
