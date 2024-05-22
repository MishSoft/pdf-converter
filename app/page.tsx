"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import UploadFiles from "./components/UploadFiles";
import UploadedFile from "./components/UploadedFile";

export default function Home() {
  const [fileResponce, serFileResponce] = useState<String | undefined>(
    undefined
  );
  const [isFile, setIsFile] = useState<File | null>(null);

  const getFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsFile(file);
      serFileResponce(URL.createObjectURL(file));
    }
  };

  return (
    <main className="flex bg-[#172232] min-h-screen flex-col items-center justify-between p-24">
      <UploadFiles getFile={getFileHandler} />
      {isFile && <UploadedFile file={fileResponce} name={isFile} />}
      {isFile && <button className="w-80">Generate</button>}
    </main>
  );
}
