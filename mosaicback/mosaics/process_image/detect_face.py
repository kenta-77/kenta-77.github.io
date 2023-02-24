import sys
import cv2
import numpy as np
import detect_retina as dr

class DetectFace() :
    """
    Face detection for a image

    画像から顔検出を行う
    複数の顔を検出可能
    テストを実行すると選択領域を囲んで表示する
    resourceフォルダを作成してOpencv公式のhaarcascade_frontalface_default.xmlをおいて使用
    smile_faceはmicrosoftのfluent emojiよりassets/Smiling face with smiling eyes/3D/smiling_face_with_smiling_eyes_3d.png をとってきて使う
    starはmicrosoftのfluent emojiよりassets/Star/3D/star_3d.png をとってきて使う
    heartはmicrosoftのfluent emojiよりassets/Heart suit/3D/heart_suit_3d.png をとってきて使う

    各パラメータ
    filter_size :   モザイク、ぼかしの大きさ 1以上で指定 大きすぎる，小さすぎる場合には自動補正される
                    大きいとモザイクの目は粗く、ぼかしはより強くかかる
    detect_faces :  識別された顔の数のリスト，顔の位置が格納される
    active_faces :  処理される顔のリスト,Trueで処理実行,Falseで処理しない リストの番号と識別時の顔番号が対応する
    stamp_dict :    スタンプのリスト,keyでスタンプの種類を指定する

    """

    #load stamp
    smile_face_path = "./mosaics/process_image/resource/smiling_face_with_smiling_eyes_3d.png"
    smile_face_image = cv2.imread(smile_face_path, flags = cv2.IMREAD_UNCHANGED)
    star_path = "./mosaics/process_image/resource/star_3d.png"
    star_image = cv2.imread(star_path, flags = cv2.IMREAD_UNCHANGED)
    heart_path = "./mosaics/process_image/resource/heart_suit_3d.png"
    heart_image = cv2.imread(heart_path, flags = cv2.IMREAD_UNCHANGED)

    #スタンプの種類辞書
    stamp_dict = {
        "smile" : smile_face_image,
        "star" : star_image,
        "heart" : heart_image
    }

    #pre process
    def __init__(self, database_path, image_file, result_path='', filter_size=1, rect_number = '') :
        self.database_path = database_path
        self.image_file = image_file
        self.filter_size = filter_size
        self.result_path = "./media/results/" + str(result_path) + "result.jpg"
        self.rect_path = "./media/rectangles/" + str(result_path) + "rect_number.jpg"

        self.active_person = []
        for i in range(len(rect_number)):
            if rect_number[i] == ',':
                continue
            else:
                self.active_person.append(rect_number[i])
        print(self.active_person)

        self.detected_faces = dict()
        self.active_faces = list()
        self.active_number = 0
        self.image = cv2.imread(self.database_path+self.image_file)
        if self.image is None :
            print("Image Load Error")
            sys.exit(1)

    #モザイクの大きさの自動補正
    def _fix_mosaic_ratio(self, face_size) :
        mosaic_ratio = 1/self.filter_size
        #最もモザイクの目が粗い(1pixelまで縮小)　
        if face_size[0]*mosaic_ratio < 1 or face_size[1]/mosaic_ratio < 1 :
            mosaic_ratio = max(1/face_size[0], 1/face_size[1])
        #最もモザイクの目が細かい(縮小を行わない、倍率1)
        if mosaic_ratio > 1 :
            mosaic_ratio = 1
        return mosaic_ratio

    #ぼかし強さの自動補正
    def _fix_blur_filter_size(self, face_size) :
        blur_filter_size = [self.filter_size, self.filter_size]
        #ぼかしサイズが大きすぎる場合顔領域サイズに補正
        blur_filter_size[0] = int(min(face_size[0], blur_filter_size[0]))
        blur_filter_size[1] = int(min(face_size[1], blur_filter_size[1]))
        #ぼかしサイズが小さ過ぎる場合1に補正
        blur_filter_size[0] = int(max(1, blur_filter_size[0]))
        blur_filter_size[1] = int(max(1, blur_filter_size[1]))
        return blur_filter_size

    #顔検出 検出した顔の数を返す
    def detect_face(self) :
        self.detected_faces = dr.detect_face(self.database_path+self.image_file)
        if len(self.detected_faces)==0:
            print("No face detected from select image")
        else :
            self.active_faces = [True] * len(self.detected_faces)
        return len(self.detected_faces)

    #retina_faceを利用した顔検出
    

    #最も大きいフィルタサイズを計算する(顔領域の最も長い辺を探す)
    def calc_max_filter_size(self) :
        longest_side = 1
        for i, key in enumerate(self.detected_faces) :
            identity = self.detected_faces[key]
            facial_area = identity["facial_area"]
            long_side = max((facial_area[2]-facial_area[0]), (facial_area[3]-facial_area[1]))
            longest_side = max(longest_side, long_side)
        max_filter_size = longest_side
        return max_filter_size


    #顔を囲む四角を描く（番号なし）
    # def write_rectangle(self) :
    #     copy_image = self.image.copy()
    #     # file_path = self.database_path + "rect_image.jpg"
    #     file_path = "./media/results/rect_image.jpg"
    #     for face_area in self.detected_faces :
    #         cv2.rectangle(copy_image, tuple(face_area[0:2]), tuple(face_area[0:2]+face_area[2:4]), (255, 255, 255), 2)
    #     cv2.imwrite(file_path, copy_image)
    #     return file_path
    
    #顔を囲む四角と，顔番号を書く
    def write_rect_and_number(self) :
        copy_image = self.image.copy()
        for i in range(len(self.active_faces)):
            self.active_number += 1
        file_path = self.rect_path
        for i, key in enumerate(self.detected_faces) :
            identity = self.detected_faces[key]
            facial_area = identity["facial_area"]
            cv2.rectangle(copy_image, (facial_area[0], facial_area[1]), (facial_area[2], facial_area[3]), (255,255,255), 1)
            cv2.putText(copy_image, str(i+1), (facial_area[0], facial_area[3]), fontFace = cv2.FONT_ITALIC, fontScale = 0.01*(facial_area[2]-facial_area[0]),thickness=10, color = (0,0,0)) #輪郭文字の貼り付け
            cv2.putText(copy_image, str(i+1), (facial_area[0], facial_area[3]), fontFace = cv2.FONT_ITALIC, fontScale = 0.01*(facial_area[2]-facial_area[0]),thickness=2, color = (255,255,255)) #内側文字の貼り付け
        cv2.imwrite(file_path, copy_image)
        return self.active_number

    
    
    #顔領域にモザイクをかける（active_faces==Trueのみ）
    def mosaic_face(self) :
        for i in self.active_person:
            self.active_faces[int(i)] = False
        copy_image = self.image.copy()
        # file_path = self.database_path + "mosaic_image.jpg"
        file_path = self.result_path 
        mosaic_ratio = 1

        for i, key in enumerate(self.detected_faces) :
            if self.active_faces[i] :
                identity = self.detected_faces[key]
                facial_area = identity["facial_area"]
                width = facial_area[2] - facial_area[0]
                height = facial_area[3] - facial_area[1]
                mosaic_ratio = 1
                mosaic_ratio = self._fix_mosaic_ratio((width, height))

                small_image = cv2.resize(copy_image[facial_area[1]:facial_area[3], facial_area[0]:facial_area[2]], 
                None, fx = mosaic_ratio, fy = mosaic_ratio, interpolation = cv2.INTER_NEAREST)
                copy_image[facial_area[1]:facial_area[3], facial_area[0]:facial_area[2]] = cv2.resize(small_image, (facial_area[2]-facial_area[0], facial_area[3]-facial_area[1]), interpolation = cv2.INTER_NEAREST) 
        cv2.imwrite(file_path, copy_image)
        return file_path

    #顔領域にぼかしをかける（active_faces==Trueのみ）
    def blur_face(self) :
        for i in self.active_person:
            self.active_faces[int(i)] = False
        copy_image = self.image.copy()
        # file_path = self.database_path + "mosaic_image.jpg"
        file_path = self.result_path 

        for i, key in enumerate(self.detected_faces) :
            if self.active_faces[i] :
                identity = self.detected_faces[key]
                facial_area = identity["facial_area"]
                width = facial_area[2] - facial_area[0]
                height = facial_area[3] - facial_area[1]
                blur_filter_size = [1,1]
                blur_filter_size = self._fix_blur_filter_size((width, height))
                blur_image = cv2.blur(copy_image[facial_area[1]:facial_area[3], facial_area[0]:facial_area[2]], tuple(blur_filter_size))
                print(blur_image.shape)
                print(copy_image.shape)
                copy_image[facial_area[1]:facial_area[3], facial_area[0]:facial_area[2]] = blur_image
                
        cv2.imwrite(file_path, copy_image)
        return file_path

    #顔領域にスタンプをつける（active_faces==Trueのみ）stamp_nameにスタンプの種類を指定する（stamp_dict参照）
    def stamp_face(self, stamp_name) :
        copy_image = self.image.copy()
        # file_path = self.database_path + "stamp_image.jpg"
        file_path = self.result_path

        for i, key in enumerate(self.detected_faces) :
            if self.active_faces[i] :
                identity = self.detected_faces[key]
                facial_area = identity["facial_area"]
                width = facial_area[2] - facial_area[0]
                height = facial_area[3] - facial_area[1]
                small_stamp = cv2.resize(self.stamp_dict[stamp_name], (width, height), interpolation = cv2.INTER_NEAREST)
                small_mask = small_stamp[:,:,3]
                small_stamp = small_stamp[:,:,:3]
                small_mask = small_mask > 0
                small_mask = small_mask.astype(np.uint8)
                small_mask = cv2.cvtColor(small_mask, cv2.COLOR_GRAY2BGR)
                copy_image[facial_area[1]:facial_area[3], facial_area[0]:facial_area[2]] = \
                copy_image[facial_area[1]:facial_area[3], facial_area[0]:facial_area[2]] * (1 - small_mask) + small_stamp * small_mask
        cv2.imwrite(file_path, copy_image)
        return file_path


if __name__ == '__main__' :
    detect_test = DetectFace("./mosaics/process_image/resource/", "sakana.jpg")
    detect_test.detect_face()
    detect_test.filter_size = 10
    print(len(detect_test.detected_faces))
    a = detect_test.write_rect_and_number()
    #b = detect_test.blur_face()
    #c = detect_test.mosaic_face()
    d = detect_test.stamp_face("star")