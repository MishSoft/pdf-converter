import React from "react";
import { FiFilePlus } from "react-icons/fi";
import { IoCamera } from "react-icons/io5";

interface GetFileProps {
  getFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isActiveLang: boolean;
  setIsActiveLang: (e: boolean) => void;
  setLanguage: (lang: string) => void;
  language: string;
}

export default function UploadFiles({
  getFile,
  isActiveLang,
  setIsActiveLang,
  setLanguage,
  language,
}: GetFileProps) {
  const handleLang = (lang: string) => {
    setLanguage(lang);
    setIsActiveLang(false);
  };
  return (
    <div className="flex   items-center md:items-start w-[300px] xl:flex-row md:w-full  flex-col gap-5">
      <div className="relative flex  items-center rounded-xl w-[90%] ">
        <label
          htmlFor="uploadFile"
          className="aboslute flex items-center bg-[#1D2B3F] w-full p-2 rounded-xl md:rounded-md justify-around text-[30px] cursor-pointer text-[#3C5E92] md:w-[50%] border"
        >
          <FiFilePlus size={50} />
          Upload File
        </label>
        <input onChange={getFile} id="uploadFile" type="file" hidden />
      </div>
      <div className="w-full rounded-xl bg-[#273b56] md:w-[50%] border">
        <div
          onClick={() => setIsActiveLang(!isActiveLang)}
          className=" relative  cursor-pointer flex items-center justify-center gap-5 text-center p-2 rounded-md text-[20px] text-white"
        >
          Choose language:{" "}
          <h2 className="bg-[#1D2B3F] p-2 rounded-md border">{language}</h2>
        </div>
        <div
          className={`bg-[#1D2B3F] ${
            isActiveLang ? "flex" : "hidden"
          } p-2 m-2 text-[20px]  text-white flex-col gap-5 text-center rounded-md`}
        >
          <div
            onClick={() => handleLang("eng")}
            className="cursor-pointer border p-2 hover:bg-[#2c415f] rounded-md"
          >
            Eng
          </div>
          <div
            onClick={() => handleLang("kat")}
            className="cursor-pointer border p-2 hover:bg-[#2c415f] rounded-md"
          >
            Ka
          </div>
          <div
            onClick={() => handleLang("rus")}
            className="cursor-pointer border p-2 hover:bg-[#2c415f] rounded-md"
          >
            Rus
          </div>
        </div>
      </div>
    </div>
  );
}
