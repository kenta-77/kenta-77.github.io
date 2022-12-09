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
        self.post_process_mode = "mosaic"

        self.detected_faces = list()
        self.selected_faces = list()
        self.image = cv2.imread(self.image_file)
        if self.image is None :
            print("Image Load Error")
            sys.exit(1)

    def detect_face(self) :
        image_gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        self.detected_faces = self.face_cascade.detectMultiScale(image_gray)
        if not self.detected_faces :
            print("No face detected from select image")
        else :
            self.selected_faces = [True] * len(self.detect_faces)

    def write_rectangle(self) :
        for i, face_area in enumerate(self.detected_faces) :
            if self.selected_faces[i] :
                cv2.rectangle(self.image, tuple(face_area[0:2]), tuple(face_area[0:2]+face_area[2:4]), (255, 255, 255), 2)
    
    def mosaic_face(self) :
        for i, face_area in enumerate(self.detected_faces) :
            if self.selected_faces[i] :
                small_image = cv2.resize(self.image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]], None, fx = self.mosaic_ratio, fy = self.mosaic_ratio, interpolation = cv2.INTER_NEAREST)
                self.image[face_area[1]:face_area[1]+face_area[3], face_area[0]:face_area[0]+face_area[3]] = cv2.resize(small_image, tuple(face_area[2:4]), interpolation = cv2.INTER_NEAREST) 

    def post_process(self) :
        if self.post_process_mode == "rectangle" :
            self.write_rectangle()
        elif self.post_process_mode == "mosaic" :
            self.mosaic_face()
        else :
            print("Post Process Mode Error")
            sys.exit(1)
        
        cv2.imshow(f"test_result mode{self.post_process_mode}", self.image)
        cv2.waitKey(0)
    
    def select_faces(self, number) :
        self.selected_faces[number] = False

if __name__ == '__main__' :
    detect_test = DetectFace("./resource/test.jpg")
    detect_test.detect_face()
    detect_test.post_process()





    

