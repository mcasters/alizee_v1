import React, { useState } from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";

import { Horse, Post } from "@/interfaces/index";
import { getPath } from "@/utils/commonUtils";
import s from "@/components/admin/form/form.module.css";

type ImageFormProps = {
  item: Horse | Post | null;
};

export default function ImageForm({ item }: ImageFormProps) {
  const [newMain, setNewMain] = useState<string>("");
  const [newAlbum, setNewAlbum] = useState<string[]>([]);
  const [existantMain, setExistantMain] = useState<string>(() =>
    item && item.mainImage ? item.mainImage.filename : ""
  );
  const [existantAlbum, setExistantAlbum] = useState<string[]>(() => {
    return item && item.images
      ? item.images.map((image) => image.filename)
      : [];
  });
  const path = item !== null ? getPath(item) : undefined;

  const deleteMainFile = () => {
    setExistantMain("");
  };

  const deleteAlbumFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { filename } = e.currentTarget.dataset;
    const tab = existantAlbum.filter((f) => {
      return f !== filename;
    });
    setExistantAlbum(tab);
  };

  const getMainPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const mainFile = e.target.files[0];
      if (mainFile) {
        setNewMain(URL.createObjectURL(mainFile));
        setExistantMain("");
      }
    }
  };

  const getAlbumPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const albumFiles = Array.from(e.target.files);

      if (albumFiles.length) {
        const newAlbumSrc: string[] = [];
        albumFiles.forEach((file) => {
          newAlbumSrc.push(URL.createObjectURL(file));
        });
        setNewAlbum(newAlbumSrc);
      }
    }
  };

  return (
    <>
      <h4 className={s.separate}>Image principale :</h4>
      {existantMain !== "" && (
        <>
          <Image
            src={`${path}/${existantMain}`}
            alt="image principale"
            width={100}
            height={100}
          />
          <button onClick={deleteMainFile} className={s.trash}>
            <FiTrash2 />
          </button>
        </>
      )}
      <input type="hidden" name="existentMainFile" value={existantMain} />
      <input type="file" name="mainFile" onChange={getMainPreview} />
      {newMain !== "" && (
        <Image src={newMain} alt="image principale" width={100} height={100} />
      )}
      <h4 className={s.separate}>Album :</h4>
      {existantAlbum.length > 0 &&
        existantAlbum.map((filename) => (
          <div key={filename} className={s.imageContainer}>
            <Image
              src={`${path}/${filename}`}
              alt="image album"
              width={100}
              height={100}
            />
            <button
              onClick={deleteAlbumFile}
              data-filename={filename}
              className={s.trash}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      <input type="hidden" name="existentAlbumFiles" value={existantAlbum} />
      <input
        type="file"
        name="albumFiles"
        onChange={getAlbumPreview}
        multiple
      />
      {newAlbum.length > 0 &&
        newAlbum.map((src) => (
          <Image
            key={src}
            src={src}
            alt="image album"
            width={100}
            height={100}
          />
        ))}
    </>
  );
}
