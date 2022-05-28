import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";

import styles from "./LoginModal.module.scss";

import Input from '@mui/material/Input';
import { RestaurantMenu } from "@mui/icons-material";
import { useAppContext } from "../../src/context/state";

interface Props {
  open: boolean,
  closeHandler: () => void,
}

export const LoginModal = (props: Props) => {
  const { open, closeHandler } = props;
  const [state, setContext] = useAppContext();

  const [text, setText] = useState("");

  const onClose = () => {
    if(!text) return;
    
    setContext(prevState => ({ ...prevState, user: text }));
    localStorage.setItem("user", text)
    closeHandler();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown
    >
      <Box className={styles.root}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Who are you?
        </Typography>
        <Input onChange={(event) => setText(event.target.value)} value={text} />
        <Button onClick={onClose}>Log in</Button>
      </Box>
    </Modal>
  )
}