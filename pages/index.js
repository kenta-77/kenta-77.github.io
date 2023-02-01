import styled from './input.module.css';
import React, { useState } from 'react';

export default function MainPage() {
  // useState()で画像のパスを保持
  // ※デフォルトで表示する画像を初期値で指定(この例ではpublicフォルダのdefault-profile.pngを指定)
  const [profileImage, setProfileImage] = useState('default-profile.png');
  const [photo, setPhoto] =useState('default-profile.png');
  const [receivephoto, receivePhoto] =useState('default-profile.png');
  
  const onFileInputChange = (e) => {
    if (!e.target.files) return;
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、profileImageを更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  }

  const onClickChangePhoto = (event) => {
    const newPhotos = profileImage;
    const formData = new FormData();
     //クリックで画像を表示する
    setPhoto(newPhotos);
    setProfileImage('default-profile.png');
    
    //クリックと同時に画像をバックエンドに送信
    formData.append('file', newPhotos);
    event.stopPropagation();
    event.preventDefault();
    const options = {
      method: "POST",
      body: formData,
    }
    const url = form.getAttribute('action');
    fetch(url, options);
  }

  const callApi = async()=>{
    const res = await fetch("http://127.0.0.1:8000/mosaics/");
    const users = await res.json();
    console.log(users);
    console.log(users["result"]);
    receivePhoto("http://127.0.0.1:8000/" + users["result"]);
  }

  return (
	<>
		<h1 className={styled.heading}>モザイクアプリ</h1>
    <div className={styled.main}>
      <input 
				type="file" 
	  		accept="image/*" 
				onChange={onFileInputChange} 
				className={styled.InputField} />
			<button
          		className={styled.addTodoButton}
          		onClick={onClickChangePhoto}
        	>画像送信</button>
		</div>
		<h1 className={styled.flex}>モザイクパラメータ</h1>
		<div className={styled.main_visual}>
			<img 
				src={photo} 
				className={styled.item} />
      <button
              className={styled.addTodoButton}
              onClick={callApi}
      >画像表示</button>
      <img 
				src={receivephoto} 
				className={styled.item} />
    </div>
	</>
  );
};