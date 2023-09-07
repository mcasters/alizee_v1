import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import type { Image as IImage } from "@/interfaces/index";
import s from "./Slider.module.css";

type PostProps = {
  images: IImage[];
  path: string;
  alt: string;
};

export default function Slider({ images, path, alt }: PostProps) {
  const imageTab = images.map((image, i) => {
    return {
      original: `${path}/${image.filename}`,
      originalHeight: Number(image.height),
      originalWidth: Number(image.width),
    };
  });

  return (
    <ImageGallery
      additionalClass={s.gallery}
      items={imageTab}
      showBullets
      autoPlay
      showNav={false}
      showPlayButton={false}
    />
  );
}
