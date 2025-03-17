import { useLanguage } from "@/core/context/LanguageContext";
import { useState } from "react";

export default function DragZone(props: {
  file: File | null;
  setFile: (value: File | null) => void;
}) {
  const { file, setFile } = props;
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useLanguage();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files[0];
    setFile(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${
        isDragging
          ? "border-blue-500 bg-blue-100"
          : "border-[hsl(var(--foreground))]"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
      <p className="text-gray-500">{t("general.import.drag_file")}</p>
      {file && (
        <div className="mt-4 text-sm text-gray-700">
          <p>{t("general.import.file_choosen")}</p>
          {file.name}
        </div>
      )}
    </div>
  );
}
