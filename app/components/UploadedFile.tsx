import React from "react";

interface FileProps {
  file: string | undefined;
  name: File | null;
}

export default function UploadedFile({ file, name }: FileProps) {
  return (
    <div className="w-[300px] h-[300px]  p-5 bg-[#1D2B3F] rounded-md flex flex-col gap-5">
      <img className="w-full h-full" src={file} alt="Image" />
      <span className="text-white  text-center mt-5">
        {name?.name || "No file name"}
      </span>
    </div>
  );
}
