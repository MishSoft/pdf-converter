"use client";
import { useEffect, useState } from "react";
import UploadFiles from "./components/UploadFiles";
import UploadedFile from "./components/UploadedFile";
import { createWorker } from "tesseract.js";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import ErrorPopUp from "./components/ErrorPopUp";

export default function Home() {
  const [fileResponse, setFileResponse] = useState<string | undefined>("");
  const [isFile, setIsFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>("eng");
  const [isActiveLang, setIsActiveLang] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (validImageTypes.includes(file.type)) {
        setIsFile(file);
        setFileResponse(URL.createObjectURL(file));
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000); // Reset error state after 3 seconds
      }
    }
  };

  const generateWordDocument = async (language: string) => {
    if (!isFile) return;

    setLoading(true);

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
      console.log(typeof doc);
    } catch (error) {
      console.error("Error processing document:", error);
    } finally {
      setLoading(false);
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
    <main className="flex gap-20 bg-[#172232] min-h-screen flex-col items-center justify-between p-24">
      <UploadFiles
        setIsActiveLang={setIsActiveLang}
        isActiveLang={isActiveLang}
        setLanguage={setLanguage}
        getFile={getFileHandler}
        language={language}
      />
      {isFile && <UploadedFile file={fileResponse} name={isFile} />}
      {isFile && (
        <button
          onClick={() => generateWordDocument(language)}
          className="w-[100%] md:w-[30%] mt-20 h-[60px] bg-[#1D2B3F] text-white text-[20px] rounded-md border-gray-100 border"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>Generate</>
          )}
        </button>
      )}
      {isError && <ErrorPopUp setCloseErrorWindow={() => setIsError(false)} />}
    </main>
  );
}
