import sys
import cv2

class DetectFace() :
    """
    Face detection for a image

    画像から顔検出を行う
    複数の顔を検出可能
    テストを実行すると選択領域を囲んで表示する
    resourceフォルダを作成してOpencv公式のhaarcascade_frontalface_default.xmlをおいて使用
    """

    cascade_path = "./resource/haarcascade_frontalface_default.xml"
    face_cascade = cv2.CascadeClassifier(cascade_path)
    
    #pre process
    def __init__(self, image_file) :
        self.image_file = image_file
        self.mosaic_ratio = 0.2
        self.post_process_mode = "number"

        self.detected_faces = list()
        self.active_faces = list()
        self.image = cv2.imread(self.image_file)
        if self.image is None :
            print("Image Load Error")
            sys.exit(1)

    def detect_face(self) :
        image_gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        self.detected_faces = self.face_cascade.detectMultiScale(image_gray)
        if self.detected_faces == []:
            print("No face detected from select image")
        else :
            self.detected_faces = sorted(self.detected_faces, key= lambda x : (x[0], x[1]))
            self.active_faces = [True] * len(self.detected_faces)

    def write_rectangle(self, image) :
        for face_area in self.detected_faces :
            cv2.rectangle(image, tuple(face_area[0:2]), tuple(face_area[0:2]+face_area[2:4]), (255, 255, 255), 2)
        return image
    
    def write_number(self, image) :
        for i, face_area in enumerate(self.detected_faces) :
            cv2.putText(image, str(i+1), tuple(face_area[0:2]+ [10,10]), fontFace = cv2.FONT_ITALIC, fontScale = 0.5, color = (255,255,255))
        return image
    
    def mosaic_face(self, image) :
        for i, face_area in enumerate(self.detected_faces) :
            if self.active_faces[i] :
                small_image = cv2.resize(image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]], None, fx = self.mosaic_ratio, fy = self.mosaic_ratio, interpolation = cv2.INTER_NEAREST)
                image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]] = cv2.resize(small_image, tuple(face_area[2:4]), interpolation = cv2.INTER_NEAREST) 
        return image

    def post_process(self) :
        copy_image = self.image.copy()
        if self.post_process_mode == "rectangle" :
            copy_image = self.write_rectangle(copy_image)
        elif self.post_process_mode == "mosaic" :
            copy_image = self.mosaic_face(copy_image)
        elif self.post_process_mode == "number" :
            copy_image = self.write_rectangle(copy_image)
            copy_image = self.write_number(copy_image)
        else :
            print("Post Process Mode Error")
            sys.exit(1)
        
        cv2.imshow(f"test_result mode{self.post_process_mode}", copy_image)
        cv2.waitKey(0)
    
    def active_face(self, face_number) :
        if len(self.active_faces) > face_number :
            self.active_faces[face_number-1] = True

    def deactive_face(self, face_number) :
        if len(self.active_faces) > face_number :
            self.active_faces[face_number-1] = False

if __name__ == '__main__' :
    detect_test = DetectFace("./resource/test.jpg")
    detect_test.detect_face()
    detect_test.post_process()
    detect_test.deactive_face(9)
    detect_test.post_process_mode = "mosaic"
    detect_test.post_process()