"use client";

import { useState } from "react";

export default function UploadImage() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );
      formData.append("folder", "my_project");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      uploadedUrls.push(data.secure_url);
    }

    setImageUrls(uploadedUrls);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        multiple // 🎯 Cho phép chọn nhiều file
        onChange={handleUpload}
      />

      <div className="mt-4 grid grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            className="w-40 h-40 object-cover"
          />
        ))}
      </div>
    </div>
  );
}
