import React from "react";
import { FiFilePlus } from "react-icons/fi";
import { IoCamera } from "react-icons/io5";

interface GetFileProps {
  getFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadFiles({ getFile }: GetFileProps) {
  return (
    <div className="flex items-center w-[300px] flex-col gap-10">
      <div className="flex justify-around text-[30px] items-center text-[#3C5E92] w-[90%] h-[100px] bg-[#1D2B3F] rounded-xl">
        <IoCamera size={50} />
        Camera
      </div>
      <div className="relative flex items-center rounded-xl w-[90%] h-[100px] bg-[#1D2B3F]">
        <label
          htmlFor="uploadFile"
          className="aboslute flex items-center w-full h-full justify-around text-[30px] cursor-pointer text-[#3C5E92]"
        >
          <FiFilePlus size={50} />
          Upload File
        </label>
        <input onChange={getFile} id="uploadFile" type="file" hidden />
      </div>
    </div>
  );
}
