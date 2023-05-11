import React, { useState } from "react";
import Image from "next/image";

import { HTMLInputEvent, Tag } from "@/interfaces/index";

const ImageForm: React.FC<{
  isMulti: boolean;
}> = ({ isMulti }) => {
  const [mainImageSrc, setMainImageSrc] = useState<string[]>([]);
  const [mainFile, setMainFile] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const onCancelFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    isMain: boolean
  ) => {
    e.preventDefault();
    if (mainFile.length === 0 || files.length === 0) {
      return;
    } else if (isMain) setMainFile([]);
    else setFiles([]);
  };

  const onChange = (e: HTMLInputEvent, isMain: boolean) => {
    if (isMain) {
      const file = e.target.files[0];
      if (file) {
        setMainFile([file]);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setMainImageSrc([reader.result]);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    } else {
      const files = e.target.files;
      if (files) {
        setFiles(Array.from(files));
      }
    }
  };

  return (
    <>
      {mainImageSrc.length && (
        <Image
          src={mainImageSrc[0]}
          alt="image principale"
          width={100}
          height={100}
        />
      )}
      <h4>Image principale</h4>
      <input
        type="file"
        name="mainFile"
        onChange={(e: HTMLInputEvent) => onChange(e, true)}
      />
      {isMulti && (
        <>
          <h4>Album images</h4>
          <input
            type="file"
            name="albumFiles"
            onChange={(e: HTMLInputEvent) => onChange(e, false)}
            multiple
          />
        </>
      )}
    </>
  );
};

export default ImageForm;
