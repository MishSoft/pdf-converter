import React from "react";

interface FileProps {
  file: string | undefined;
  name: File | null;
}

export default function UploadedFile({ file, name }: FileProps) {
  return (
    <div className="w-[50%] p-5 bg-[#1D2B3F] rounded-md flex flex-col gap-5">
      <img className="" src={file} alt="" />
      <span className="text-white text-center mt-5">
        {name?.name || "No file name"}
      </span>
    </div>
  );
}
