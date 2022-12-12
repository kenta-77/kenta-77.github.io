import styled from './input.module.scss';
import React, { useState } from 'react';


export default function MainPage() {
  // useState()で画像のパスを保持
  // ※デフォルトで表示する画像を初期値で指定(この例ではpublicフォルダのdefault-profile.pngを指定)
  const [profileImage, setProfileImage] = useState('default-profile.png');

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  }

  return (
	<>
		<h1 className={styled.heading}>モザイク処理</h1>
    	<div className={styled.inputArea}>
      		<input 
				type="file" 
	  			accept="image/*" 
				onChange={onFileInputChange} 
				className={styled.InputField} />
		</div>
		<div>
			<img 
				src={profileImage} 
				className={styled.heading2} />
    	</div>
	</>
  );
};
