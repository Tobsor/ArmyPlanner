import NextJSImage from "next/image";
import React, { useEffect, useState } from "react";

import styles from './HeroQueue.module.scss';

interface Props {
  allFiles: File[],
  selectedIndex: number,
  onSelectHero: (heroId: number) => void,
}

export const HeroQueue = (props: Props) => {
  const { allFiles, selectedIndex, onSelectHero } = props;
  const [fileList, setFilelist] = useState([]);

  const readFile = (file: File) => {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      const image = new Image();
      image.height = 100;
      image.title = file.name;
      if(typeof this.result === "string") {
        image.src = this.result;
      }

      setFilelist(prevState => [...prevState, image]);
    });

    reader.readAsDataURL(file);
  }



  useEffect(() => {
    allFiles.forEach(image => readFile(image))
  }, [allFiles])

  return <div className={styles.root}>
    {
      fileList.map((img, index) => {
        const classes = index === selectedIndex ? `${styles.img} ${styles.active}` : styles.img;

        return <div className={classes}>
          <NextJSImage
            src={img}
            alt="Picture of the author"
            layout="fill"
            onClick={() => onSelectHero(index)}
          />
        </div>
      })
    }
  </div>
}

export default HeroQueue;