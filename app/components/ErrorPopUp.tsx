import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface ErrorPopUpProps {
  setCloseErrorWindow: () => void;
}

export default function ErrorPopUp({ setCloseErrorWindow }: ErrorPopUpProps) {
  return (
    <div className="absolute w-full h-screen top-0 flex items-center justify-center bg-[#1d2b3fda] text-white">
      <div className="w-[80%] relative p-5 text-center bg-[#162130] rounded-lg">
        <div
          onClick={setCloseErrorWindow}
          className="absolute right-0 top-0 cursor-pointer border w-[30px] h-[30px] flex items-center justify-center rounded-2xl"
        >
          <IoCloseSharp size={20} />
        </div>
        ❌ Wrong File Type!
      </div>
    </div>
  );
}
