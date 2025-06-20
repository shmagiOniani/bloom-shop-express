import React, { useRef, useState } from "react";
import { Camera, Trash2, ZoomIn } from "lucide-react";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  uploadImage: (file: File) => Promise<string>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, maxImages = 12, uploadImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    const urls = [...value];
    for (let i = 0; i < files.length && urls.length < maxImages; i++) {
      try {
        const url = await uploadImage(files[i]);
        urls.push(url);
      } catch (e) {
        // handle error
      }
    }
    onChange(urls);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (idx: number) => {
    const urls = value.filter((_, i) => i !== idx);
    onChange(urls);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {value.length < maxImages && (
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed border-bloom-light-pink rounded-2xl ${value.length === 0 ? "w-full" : "w-32"} h-32 cursor-pointer hover:bg-bloom-light-pink transition relative`}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <Camera className="w-8 h-8 text-gray-400 mb-2" />
          {value.length === 0 && (
            <>
            <div className="font-semibold text-gray-700">სურათის ატვირთვა</div>
            <div className="text-xs text-gray-400 mt-1">მაქსიმუმ {maxImages} ფოტო</div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
            disabled={uploading}
          />
        </div>
      )}
      {value.map((url, idx) => (
        <div key={url} className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-bloom-light-pink flex-shrink-0 group bg-white">
          <img src={url} alt="preview" className="object-cover w-full h-full" />
          <button
            type="button"
            className="absolute top-2 left-2 bg-white/80 rounded-full p-1 text-gray-700 hover:bg-white"
            onClick={() => window.open(url, "_blank")}
            title="Zoom"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-red-500 hover:bg-red-100"
            onClick={() => handleDelete(idx)}
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageUploader; 