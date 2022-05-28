import { FormControl, FormLabel, Input } from "@mui/material";
import { DropzoneArea } from "@pandemicode/material-ui-dropzone";
import React, { useState } from "react";

import styles from "./hero.module.scss";

export const Add = () => {
  const [files, setFiles] = useState([]);

  const handleChange = (files) => {
    setFiles(files);
  }

  return <div className={styles.root}>
    <FormControl>
      <FormLabel>Name</FormLabel>
      <Input />
    </FormControl>
    <FormControl>
      <FormLabel>Attack Power</FormLabel>
      <Input type="number" />
    </FormControl>
    <FormControl>
      <DropzoneArea
        onChange={handleChange}
      />
    </FormControl>
  </div>
}

export default Add;