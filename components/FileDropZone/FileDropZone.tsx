import React from "react";

import Dropzone from 'react-dropzone'

import styles from './FileDropZone.module.scss';

interface Props {
  onDrop: (file: File[]) => void
}

export const FileDropZone = (props: Props) => {

  const { onDrop } = props;

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps({
            onClick: event => console.log("dropped"),
            role: 'button',
            'aria-label': 'drag and drop area',
            className: styles.root
          })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}