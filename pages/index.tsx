import styled from "./input.module.scss"
import React, {useState} from "react";

export default function Input() {
	const [preview, setPreview] = useState('');

	const handleChangeFile = (e) => {
    	const { files } = e.target;
    	setPreview(window.URL.createObjectURL(files[0]));
  	};

  	return (
    	<img src={preview} />
    	<input
      		type="file"
      		name="photo"
      		onChange={handleChangeFile}
    	/>
  	)
}