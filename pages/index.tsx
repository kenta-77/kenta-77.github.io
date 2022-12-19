import styled from './input.module.scss';
import React, { useState } from 'react';
import axios from "axios";


export default function MainPage() {
  // useState()で画像のパスを保持
  // ※デフォルトで表示する画像を初期値で指定(この例ではpublicフォルダのdefault-profile.pngを指定)
  const [profileImage, setProfileImage] = useState('default-profile.png');
  const [photo, setPhoto] =useState('default-profile.png');

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、profileImageを更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  }

  const onClickChangePhoto = async() => {
    const newPhotos = profileImage;
    const formData = new FormData();
     //クリックで画像を表示する
    setPhoto(newPhotos);
    setProfileImage('default-profile.png');
    
　　//クリックと同時に画像をバックエンドに送信
　　formData.append('file', newPhotos);
　　await axios.post('アップロード先エンドポイント',
		formData
　　);
  }

  return (
	<>
		<h1 className={styled.heading}>モザイクアプリ</h1>
    	<div className={styled.inputArea}>
      		<input 
				type="file" 
	  			accept="image/*" 
				onChange={onFileInputChange} 
				className={styled.InputField} />
			<button
          		className={styled.addTodoButton}
          		onClick={onClickChangePhoto}
        	>input</button>
		</div>
		<h1 className={styled.heading}>モザイクパラメータ</h1>
		<div>
			<img 
				src={photo} 
				className={styled.heading2} />
    	</div>
	</>
  );
};
