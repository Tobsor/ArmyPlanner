import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";

import styles from "./LoginModal.module.scss";

import Input from '@mui/material/Input';
import { RestaurantMenu } from "@mui/icons-material";
import { useAppContext } from "../../src/context/state";
import { createSecureServer } from "http2";

interface Props {
  open: boolean,
  closeHandler: () => void,
}

interface UserParam {
  name: string
}

const getUser = (username: string) => {
  return fetch("/api/get-user", {
    body: JSON.stringify({ username }),
    method: "post"
  })
    .then(data => data.json());
}

const createUser = (user: UserParam) => {
  return fetch("/api/create-user", {
    body: JSON.stringify(user),
    method: "post",
  })
    .then(data => data.json());
}

export const LoginModal = (props: Props) => {
  const { open, closeHandler } = props;
  const {
    setContext
  } = useAppContext();

  const [text, setText] = useState("");

  const onClose = async() => {
    if(!text) return;
    
    let user = await getUser(text);
    
    if(!user.id) {
      user = await createUser({ name: text });
    }
        
    setContext(prevState => ({ ...prevState, user }));
    localStorage.setItem("user", JSON.stringify(user));
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