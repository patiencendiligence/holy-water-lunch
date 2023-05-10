import type { NextPage } from "next";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const ImageUpload: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onUploadFile = async () => {
    console.log(file, "?file");
    if (!file) {
      return;
    }

    try {
      // let formData = new FormData();
      // formData.append("media", file);
      // console.log(formData, file, "sendData");
      const formData = new Blob([file], { type: "image/jpeg" });
      const res = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        alert("이미지 업로드가 완료되었습니다.");
      } else {
        alert("ERROR:" + res?.statusText);
      }
      // const {
      //   data,
      //   error,
      // }: {
      //   data: {
      //     url: string | string[];
      //   } | null;
      //   error: string | null;
      // } = await res.json();

      // if (error || !data) {
      //   alert(error || "Sorry! something went wrong.");
      //   return;
      // }

      // console.log("File was uploaded successfylly:", data);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };
  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    /** Setting file state */
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    // e.currentTarget.type = "text";
    e.currentTarget.type = "file";
    if (!!confirm("지금 올리신 이미지로 업로드 하실 건가요?")) {
      setFile(file); // we will use the file state, to send it later to the server
      console.log("업로드~", file);
    } else {
      setFile(null);
      setPreviewUrl(null);
      return false;
    }
  };

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };
  useEffect(() => {
    if (file !== null) {
      onUploadFile();
    }
  }, [file]);

  return (
    <div className="w-full px-0 border border-gray-500 border-dashed">
      {previewUrl ? (
        <div className="mx-auto w-80 relative">
          <button
            disabled={!previewUrl}
            onClick={onCancelFile}
            className="text-sm text-white transition-colors duration-300 bg-gray-700 md:text-base disabled:bg-gray-400 hover:bg-gray-600 rounded-full w-6 absolute top-2 right-2 z-10"
          >
            X
          </button>
          <Image
            alt="file uploader preview"
            objectFit="cover"
            src={previewUrl}
            width={320}
            height={218}
            layout="fixed"
          />
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
          Select an image
          <input
            className="block w-0 h-0"
            name="file"
            type="file"
            onChange={onFileUploadChange}
          />
        </label>
      )}

      {/* <div className="flex mt-4 md:mt-0 md:flex-col justify-center gap-1.5">


        <button
          disabled={!previewUrl}
          onClick={onUploadFile}
          className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
        >
          Upload file
        </button>

      </div> */}
    </div>
  );
};

export default ImageUpload;
