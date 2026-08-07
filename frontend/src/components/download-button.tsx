import { useEffect, useRef } from "react";

export default function DownloadButton({
  style,
  data,
}: {
  style: string;
  data: { image: string; prompt: string } | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (data) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [data]);

  const handleDownload = () => {
    if (!data) return;
    const a = document.createElement("a");
    a.href = data.image;
    a.download = `imagizen-${style}-${Date.now()}.jpg`;
    a.click();
  };

  return (
    <>
      {data && (
        <button
          className="border bg-white text-black rounded-lg px-3 py-1 hover:scale-95 font-semibold  transition-all duration-300 hover:text-white hover:bg-black cursor-pointer"
          onClick={handleDownload}
        >
          Descargar
        </button>
      )}
    </>
  );
}
