"use client";

import { use, useState } from "react";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import DragZone from "@/components/layout/DragZone";
import WrapperContent from "@/components/layout/WrapperContent";
import withMyTask from "@/components/forms/withMyTask";

const ImportProductPage = ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id: userId } = use(params);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Vui lòng chọn file CSV!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/${userId}/products/import-product`, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setMessage(result.message);
  };

  return (
    <>
      <WrapperContent>
        <div className="w-full">
          <h1 className="text-lg font-medium">Upload a CSV file</h1>
          <div className="text-sm flex gap-1">
            Make sure that the file has the same format as the sample file.
            <a href="#" className="text-sm text-blue-500 underline">
              Click here to download a sample CSV file.
            </a>
          </div>
          <div className="my-4">
            <DragZone file={file} setFile={setFile} />
          </div>
          {message && <p>{`Message: ${message}`}</p>}
        </div>
      </WrapperContent>
      <WrapperContent>
        <div className="flex w-full justify-end">
          <Button onClick={handleUpload}>
            <Download size={15} /> Import
          </Button>
        </div>
      </WrapperContent>
    </>
  );
};

export default withMyTask(ImportProductPage);
