import React from "react";
import Image from "next/image";

import { Image as ImageType } from "@/interfaces/index";

type props = {
  images: ImageType[];
  dirname: string;
  title: string;
};
const AlbumComponent = ({ images, dirname, title }: props) => {
  return (
    <>
      {images.map((image) => (
        <Image
          key={image.filename}
          src={`/images/actu/${dirname}/${image.filename}`}
          height={200}
          width={200}
          alt={`Alizée Roussel - ${title}`}
        />
      ))}
    </>
  );
};

export default AlbumComponent;
