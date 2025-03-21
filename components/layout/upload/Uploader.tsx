import { PencilLine, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { isEmpty } from "lodash";

interface IProps {
  isMultiple?: boolean;
  size?: number;
  rounded?: "md" | "full";
  defaultImage?: string;
  onChange: (value: string[]) => void;
  value: string[];
}

export default function Uploader({
  isMultiple = false,
  rounded = "md",
  size = 24,
  defaultImage = "",
  onChange,
  value = [],
}: IProps) {
  const [images, setImages] = useState<string[]>(value);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (defaultImage && isEmpty(value)) {
      setImages([defaultImage]);
    }
  }, []);

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

    setImages(uploadedUrls);
    onChange(uploadedUrls);
  };

  const handleReplace =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.length) return;

      const newImage = URL.createObjectURL(event.target.files[0]);
      setImages((prev) => {
        const updatedImages = [...prev];
        updatedImages[index] = newImage;
        return updatedImages;
      });
    };

  const renderImage = (image: string, index: number) => (
    <div
      key={index}
      className={`relative w-${size} h-${size} rounded-${rounded} cursor-pointer overflow-hidden border-2 border-solid border-gray-400`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleReplace(index)}
        id={`file-upload-${index}`}
      />
      <Image
        width={size * 4}
        height={size * 4}
        src={image}
        alt="Uploaded"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {hoveredIndex === index && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500">
          <label htmlFor={`file-upload-${index}`} className="cursor-pointer">
            <PencilLine className="text-white" size={20} />
          </label>
        </div>
      )}
    </div>
  );

  const renderAddMore = () => (
    <div
      className={`w-${size} h-${size} rounded-${rounded} border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden`}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleUpload}
        id="add-more"
      />
      <label
        htmlFor="add-more"
        className="w-full h-full flex items-center justify-center cursor-pointer"
      >
        <Plus className="text-gray-500" size={32} />
      </label>
    </div>
  );

  const renderSingleUpload = () => (
    <div
      className={`relative w-${size} h-${size} rounded-${rounded} cursor-pointer overflow-hidden ${
        images.length > 0
          ? "border-2 border-solid border-gray-400"
          : "border-2 border-dashed border-gray-400"
      }`}
      onMouseEnter={() => setHoveredIndex(0)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
        id="single-upload"
      />
      <label
        htmlFor="single-upload"
        className="w-full h-full flex items-center justify-center cursor-pointer"
      >
        {images.length > 0 ? (
          <Image
            width={size * 4}
            height={size * 4}
            src={images[0]}
            alt="Uploaded"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Plus className="text-gray-500" size={32} />
        )}
      </label>
      {hoveredIndex === 0 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500">
          <label
            htmlFor="single-upload"
            className="w-full h-full flex items-center justify-center cursor-pointer"
          >
            <PencilLine className="text-white" size={20} />
          </label>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex gap-4 flex-wrap">
      {isMultiple ? images.map(renderImage) : renderSingleUpload()}
      {isMultiple && renderAddMore()}
    </div>
  );
}
