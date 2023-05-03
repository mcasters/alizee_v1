import React from "react";
import Image from "next/image";

import { Image as ImageType } from "../../interfaces";

const AlbumComponent: React.FC<{ images: [ImageType]; title: string }> = ({
  images,
  title,
}) => {
  return (
    <>
      {images.map((image, index) => {
        if (index === 0) return null;
        else
          return (
            <Image
              key={index}
              src={`/images/actu/${image.filename}`}
              height={200}
              width={200}
              alt={`Alizée Roussel - ${title}`}
            />
          );
      })}
    </>
  );
};

export default AlbumComponent;
