import React, { useState } from "react";
import Image from "next/image";

const ImageForm = () => {
  const [mainImageSrc, setMainImageSrc] = useState<string>("");

  const onChange = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      mainFile: { value: File };
    };

    const mainFile = target.mainFile.value;

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
      <input type="file" name="mainFile" onChange={onChange} />
      <h4>Album images :</h4>
      <input type="file" name="albumFiles" multiple />
    </>
  );
};

export default ImageForm;
