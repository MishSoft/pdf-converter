"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import UploadFiles from "./components/UploadFiles";
import UploadedFile from "./components/UploadedFile";
import { createWorker } from "tesseract.js";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function Home() {
  const [fileResponse, setFileResponse] = useState<string | undefined>("");
  const [isFile, setIsFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>("kat");
  const [isActiveLang, setIsActiveLang] = useState<boolean>(false);

  const getFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsFile(file);
      setFileResponse(URL.createObjectURL(file));
    }
  };

  const generateWordDocument = async (language: string) => {
    if (!isFile) return;

    try {
      const worker = await createWorker();
      await worker.load();
      await worker.loadLanguage(language);
      await worker.initialize(language);
      const {
        data: { text },
      } = await worker.recognize(isFile);
      await worker.terminate();

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: text.split("\n").map(
              (line) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                      font: {
                        name: "Arial",
                      },
                      size: 12,
                    }),
                  ],
                })
            ),
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "example.docx");
    } catch (error) {
      console.error("Error processing document:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (isFile && fileResponse) {
        URL.revokeObjectURL(fileResponse);
      }
    };
  }, [isFile, fileResponse]);

  return (
    <main className="flex bg-[#172232] min-h-screen flex-col items-center justify-between p-24">
      <UploadFiles
        setIsActiveLang={setIsActiveLang}
        isActiveLang={isActiveLang}
        setLanguage = {setLanguage}
        getFile={getFileHandler}
        language = {language}
      />
      {isFile && <UploadedFile file={fileResponse} name={isFile} />}
      {isFile && (
        <button
          onClick={() => generateWordDocument(language)}
          className="w-[100%] h-[60px] bg-[#1D2B3F] text-white text-[20px] rounded-md border-gray-100 border"
        >
          Generate
        </button>
      )}
    </main>
  );
}
