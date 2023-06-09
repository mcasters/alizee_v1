import React, { useState } from "react";
import Image from "next/image";

const ImageForm = () => {
  const [mainImageSrc, setMainImageSrc] = useState<string>("");

  const onMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const mainFile = e.target.files[0];
      if (mainFile) {
        const reader = new FileReader();
        reader.readAsDataURL(mainFile);
        reader.onload = () => {
          setMainImageSrc(reader.result as string);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    }
  };

  return (
    <>
      {mainImageSrc !== "" && (
        <Image
          src={mainImageSrc}
          alt="image principale"
          width={100}
          height={100}
        />
      )}
      <h4>Image principale :</h4>
      <input type="file" name="mainFile" onChange={onMainChange} />
      <h4>Album images :</h4>
      <input type="file" name="albumFiles" multiple />
    </>
  );
};

export default ImageForm;
