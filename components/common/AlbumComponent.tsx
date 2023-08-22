import React from "react";
import Image from "next/image";

import { Image as ImageType } from "@/interfaces/index";

type props = {
  images: ImageType[];
  path: string;
  title: string;
};
const AlbumComponent = ({ images, path, title }: props) => {
  return (
    <>
      {images.map((image: ImageType) => (
        <Image
          key={image.filename}
          src={`${path}/${image.filename}`}
          height={image.height}
          width={image.width}
          alt={`Alizée Roussel - ${title}`}
        />
      ))}
    </>
  );
};

export default AlbumComponent;
