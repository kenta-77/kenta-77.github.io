import './input.module.scss';
import React, { useState } from 'react';


function MainPage() {
  // useState()で画像のパスを保持
  // ※デフォルトで表示する画像を初期値で指定(この例ではpublicフォルダのdefault-profile.pngを指定)
  const [profileImage, setProfileImage] = useState('default-profile.png');

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <img src={profileImage} className="h-32 w-32 rounded-full" />
      <input type="file" accept="image/*" onChange={onFileInputChange} className="pl-4" />
    </div>
  );
}

export default MainPage;
