import { Button, FormControl, FormLabel, Input } from "@mui/material";

import React, { useState } from "react";
import { FileDropZone } from "../../components/FileDropZone/FileDropZone";
import HeroQueue from "../../components/HeroQueue.tsx/HeroQueue";
import { useAppContext } from "../../src/context/state";

import styles from "./hero.module.scss";

export interface HeroStats {
  identifier: string,
  name: string,
  img: File,
}
export const Add = () => {
  const [allHeroes, updateHeroes] = useState<HeroStats[]>([])
  const [activeHero, setActiveHero] = useState<HeroStats>();
  const [files, setFiles] = useState<File[]>([]);

  const [state] = useAppContext();

  const handleChange = (newImages) => {
    const newHeroes = newImages.map((img) => ({
      identifier: Math.random(),
      name: "",
      attackPower: 0,
      img,
    }));

    setFiles(newImages);
    setActiveHero(newHeroes[0]);
    updateHeroes(newHeroes);
  }

  const performSinglePutOperation = async (file) => {
    const filename = encodeURIComponent(file.name)

    const res = await fetch(`/api/upload-image?file=${filename}`, {
      name: file.name,
      type: "jpg",
      method: "post",
    })

    const signedLink = await res.json()
    const formData = new FormData()

    // @ts-ignore
    Object.entries({ ...signedLink.fields, file }).forEach(([key, value]) => {
      formData.append(key, value)
    })

    fetch(signedLink.url, {
      method: 'POST',
      body: formData,
    });
  }

  const uploadPhotos = async () => {
    const images = allHeroes.map(({ img }) => img);

    for (let i = 0; i < images.length; i++){
      await performSinglePutOperation(images[i]);
    }
  };

  const onSubmit = () => {
    uploadPhotos();

    let newHeroes = [...allHeroes];
    const index = allHeroes.findIndex(hero => hero.identifier === activeHero.identifier);

    newHeroes[index] = activeHero;

    fetch("/api/upload-heroes", {
      method: "post",
      body: JSON.stringify({
        authorId: state.user.id,
        heroes: newHeroes,
      })
    });
  }

  const setFormData = (e) => {
    if(!activeHero) return;

    const { currentTarget: { name, value } } = e;

    let val = value;
    if(name === "attackPower") {
      val = parseInt(value);
    }

    setActiveHero(prevState => ({ ...prevState, [name]: val }));
  }

  const validateForm = () => {
    return false;
  }

  const onSelectHero = (heroId: number) => {
    const newHeroes = [...allHeroes];
    const index = allHeroes.findIndex(hero => hero.identifier === activeHero.identifier);

    newHeroes[index] = activeHero;
    updateHeroes(newHeroes);
    setActiveHero(allHeroes[heroId]);
  }

  return <div className={styles.root}>
    <HeroQueue
      allFiles={files}
      selectedIndex={allHeroes.findIndex(hero => hero.identifier === activeHero.identifier)}
      onSelectHero={onSelectHero}
    />
    <FormControl>
      <FormLabel required>Name</FormLabel>
      <Input
        name="name"
        value={activeHero?.name}
        onChange={setFormData}
        disabled={!activeHero}
      />
    </FormControl>
    <Button onClick={onSubmit} disabled={validateForm()}>Save</Button>
    <FormControl>
      <FileDropZone
        onDrop={handleChange}
      />
    </FormControl>
  </div>
}

export default Add;