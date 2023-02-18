import styled from './input.module.scss';
import React, { useState } from 'react';
import axios from "axios";
import Select, { MultiValue } from 'react-select';
import Image from 'next/image';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function MainPage() {
  // useState()で画像のパスを保持
  // ※デフォルトで表示する画像を初期値で指定(この例ではpublicフォルダのdefault-profile.pngを指定)
	type ParameterObject = {
		mosaic_type: string;
		strength: string;
	}
	interface OptionAdapt {
		value: string;
		label: string;
	}
  const [photo, setPhoto] =useState<string>('/face_image1.jpeg');
	const myLoader = ({ src, width, quality }) => {
		return `${src}`
	}
	const [parameter, setParameter] = useState<ParameterObject>({mosaic_type: '1', strength: '2'});
	const [adapt, setAdapt] = useState<OptionAdapt[]>([{value: '1', label: '1'},{value: '2', label: '2'}]);
	const [person, setPerson] = useState<string>('');

	const option_type = [
		{value: '1', label: 'mosaic'},
		{value: '2', label: 'stamp'}
	];

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
			setPhoto('/face_image1.jpeg');
			return;
		}
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
		console.log("送信");
    const fileObject = e.target.files[0];
		const formData = new FormData();
		formData.append('image', fileObject);
		formData.append('strength', "1");
		await axios.post(
			'http://127.0.0.1:8000/mosaics/rectangle/',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		const res = await fetch("http://127.0.0.1:8000/mosaics/");
		const users = await res.json();
		const photosrc = "http://127.0.0.1:8000" + users["rectangle"];
		const active_user = users["active_number"];
		for(let i = 0; i < Number(active_user); i++){
			if(i == 0){
				setAdapt((adapt => [{value: `${i}`, label: `${i+1}`}]));
			}
			else{
				setAdapt((adapt => [...adapt,{value: `${i}`, label: `${i+1}`}]));
			}
		}
    // オブジェクトURLを生成し、profileImageを更新
    setPhoto(photosrc);
  }

  const onClickChangePhoto = async() => {
    // const newPhotos = profileImage;
    const formData = new FormData();
     //クリックで画像を表示する
    // setPhoto(newPhotos);
    
		//クリックと同時に画像をバックエンドに送信
		let input_image = document.getElementById("image") as HTMLInputElement;
		if (input_image instanceof HTMLInputElement && input_image.files) {
			formData.append('image',input_image.files[0]);
		}
		formData.append('mosaic_type', String(parameter.mosaic_type));
		formData.append('strength', String(parameter.strength));
		formData.append('rect_number', person);
    await axios.post(
			'http://127.0.0.1:8000/mosaics/',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
  }
	const onClickApi = async() => {
		let res = await fetch("http://127.0.0.1:8000/mosaics/");
		let users = await res.json();
		let photosrc = "http://127.0.0.1:8000" + users["result"];
		let image_src = document.getElementById("image01");
		if (image_src instanceof HTMLImageElement){
			image_src.src = photosrc;
		}
	}

	const onChangeType = (value: string) => {
    const param_type: string = value;
		setParameter({...parameter, mosaic_type: String(value)});
  }

	
	const onChangeStrength = (value: string) => {
		const param_strength: string = value;
		setParameter({...parameter, strength: String(value)});
  }

	const onChangeNumber = (e: MultiValue<OptionAdapt>) => {
		let adapt_text: string = "";
		e.map((selection)=>{
			adapt_text = selection.value + "," + adapt_text;
			setPerson(`${adapt_text}`);
		});
	}
	
  return (
	<>
	<Box
    bg="#000"
    opacity="0.9"
    color="#ffffff"
    h={24}
    display="flex"
    justifyContent="center"
    alignItems="center"
  ><Text fontSize={44} fontFamily="Roboto" fontWeight="bold"
	>FaMo</Text>
	<FontAwesomeIcon icon={faGithub} />
	</Box>
		<div className={styled.inputArea}>
			<input type="file" name="image" id="image" accept="image/*" onChange={onFileInputChange} className={styled.InputField} />
			<h1 className={styled.heading}>モザイクパラメータ</h1>
			<label>モザイクタイプ</label>
			<Select id="selectbox" instanceId="selectbox" defaultValue={{value:'1',label:'mosaic'}} onChange={(e) => onChangeType(e!.value as string)} options={option_type}/>
			<label>モザイク強度</label>
			<input type="range" min="0" max="1" step="0.01" onChange={(e) => onChangeStrength(e!.target.value as string)}></input>
			<Button variant="contained" onClick={onClickChangePhoto}>input</Button><br />
			<label>モザイク化したくない人の番号</label>
			<Select id="selectbox" instanceId="selectbox" onChange={(e)=>{onChangeNumber(e)}} options={adapt} isMulti/>
		</div>
		<div className={styled.inputArea}>
			<Image loader={myLoader} src={photo} alt="input picture" width={500} height={500}/>
			{/* <img src={photo} className={styled.heading2} /> */}
    </div>
		<img src={photo} id="image01" className={styled.heading2} />
		<button onClick={onClickApi}>画像表示</button>
		</>
  );
};
