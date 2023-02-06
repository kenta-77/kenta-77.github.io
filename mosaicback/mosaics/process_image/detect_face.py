import sys
import cv2
import numpy as np

class DetectFace() :
    """
    Face detection for a image

    画像から顔検出を行う
    複数の顔を検出可能
    テストを実行すると選択領域を囲んで表示する
    resourceフォルダを作成してOpencv公式のhaarcascade_frontalface_default.xmlをおいて使用
    smile_faceはmicrosoftのfluent emojiよりassets/Smiling face with smiling eyes/3D/smiling_face_with_smiling_eyes_3d.png をとってきて使う
    """

    cascade_path = "./mosaics/process_image/resource/haarcascade_frontalface_default.xml"
    face_cascade = cv2.CascadeClassifier(cascade_path)
    smile_face_path = "./mosaics/process_image/resource/smiling_face_with_smiling_eyes_3d.png"
    smile_face_image = cv2.imread(smile_face_path, flags = cv2.IMREAD_UNCHANGED)

    #pre process
    def __init__(self, database_path, image_file, result_path, mosaic_ratio, rect_number = '') :
        self.database_path = database_path
        self.image_file = image_file
        self.mosaic_ratio = mosaic_ratio
        self.result_path = "./media/results/" + str(result_path) + "result.jpg"
        self.rect_path = "./media/rectangles/" + str(result_path) + "rect_number.jpg"

        self.active_person = []
        for i in range(len(rect_number)):
            if rect_number[i] == ',':
                continue
            else:
                self.active_person.append(rect_number[i])
        print(self.active_person)

        self.detected_faces = list()
        self.active_faces = list()
        self.active_number = 0
        self.image = cv2.imread(self.database_path+self.image_file)
        if self.image is None :
            print("Image Load Error")
            sys.exit(1)

    def _fix_mosaic_ratio(self, face_size) :
        if face_size[0]*self.mosaic_ratio < 1 or face_size[1]*self.mosaic_ratio < 1 :
            self.mosaic_ratio = max(1/face_size[0], 1/face_size[1])
        if self.mosaic_ratio > 1 :
            self.mosaic_ratio = 1

    def detect_face(self) :
        image_gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        self.detected_faces = self.face_cascade.detectMultiScale(image_gray)
        if self.detected_faces == []:
            print("No face detected from select image")
        else :
            self.detected_faces = sorted(self.detected_faces, key= lambda x : (x[0], x[1]))
            self.active_faces = [True] * len(self.detected_faces)
        return len(self.detected_faces)

    def write_rectangle(self) :
        copy_image = self.image.copy()
        # file_path = self.database_path + "rect_image.jpg"
        file_path = "./media/results/rect_image.jpg"
        for face_area in self.detected_faces :
            cv2.rectangle(copy_image, tuple(face_area[0:2]), tuple(face_area[0:2]+face_area[2:4]), (255, 255, 255), 2)
        cv2.imwrite(file_path, copy_image)
        return file_path
    
    def write_rect_and_number(self) :
        copy_image = self.image.copy()
        for i in range(len(self.active_faces)):
            self.active_number += 1
        # file_path = self.database_path + "number_image.jpg"
        file_path = self.rect_path
        for i, face_area in enumerate(self.detected_faces) :
            cv2.rectangle(copy_image, tuple(face_area[0:2]), tuple(face_area[0:2]+face_area[2:4]), (255, 255, 255), 2)
            cv2.putText(copy_image, str(i+1), (face_area[0], face_area[1]+face_area[3]), fontFace = cv2.FONT_ITALIC, fontScale = 0.01*face_area[2],thickness=10, color = (0,0,0)) #輪郭文字の貼り付け
            cv2.putText(copy_image, str(i+1), (face_area[0], face_area[1]+face_area[3]), fontFace = cv2.FONT_ITALIC, fontScale = 0.01*face_area[2],thickness=2, color = (255,255,255)) #内側文字の貼り付け
            # print(face_area)
            # print(tuple((face_area[0:2]+face_area[2:4])//2))
        cv2.imwrite(file_path, copy_image)
        return self.active_number
    
    def mosaic_face(self) :
        for i in self.active_person:
            self.active_faces[int(i)] = False
        copy_image = self.image.copy()
        # file_path = self.database_path + "mosaic_image.jpg"
        file_path = self.result_path 
        for i, face_area in enumerate(self.detected_faces) :
            if self.active_faces[i] :
                self._fix_mosaic_ratio(face_area[2:4])
                small_image = cv2.resize(copy_image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]], 
                None, fx = self.mosaic_ratio, fy = self.mosaic_ratio, interpolation = cv2.INTER_NEAREST)
                copy_image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]] = cv2.resize(small_image, tuple(face_area[2:4]), interpolation = cv2.INTER_NEAREST) 
        cv2.imwrite(file_path, copy_image)
        return file_path

    def stamp_smile_face(self) :
        copy_image = self.image.copy()
        # file_path = self.database_path + "stamp_image.jpg" 
        file_path = self.result_path 
        for i, face_area in enumerate(self.detected_faces) :
            if self.active_faces[i] :
                small_stamp = cv2.resize(self.smile_face_image, tuple(face_area[2:4]), interpolation = cv2.INTER_NEAREST)
                small_mask = small_stamp[:,:,3]
                small_stamp = small_stamp[:,:,:3]
                small_mask = small_mask > 0
                small_mask = small_mask.astype(np.uint8)
                small_mask = cv2.cvtColor(small_mask, cv2.COLOR_GRAY2BGR)
                copy_image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]] = \
                copy_image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]] * (1 - small_mask) + small_stamp * small_mask
        cv2.imwrite(file_path, copy_image)
        return file_path       

# if __name__ == '__main__' :
#     detect_test = DetectFace("./resource/", "image_test.jpeg")
#     detect_test.detect_face()
#     a = detect_test.write_rectangle()
#     b = detect_test.stamp_smile_face()
