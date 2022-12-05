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

        self.detected_faces =  list()
        self.image = cv2.imread(self.image_file)
        if self.image is None :
            print("Image Load Error")
            sys.exit(1)

    def detect_face(self) :
        image_gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        self.detected_faces = self.face_cascade.detectMultiScale(image_gray)

    def write_rectangle(self) :
        for x, y, w, h in self.detected_faces :
            cv2.rectangle(self.image, (x, y), (x+w, y+h), (255, 255, 255), 2)
    
    def mosaic_face(self) :
        for x, y, w, h in self.detected_faces :
            small_image = cv2.resize(self.image[y:y+h, x:x+w], None, fx = self.mosaic_ratio, fy = self.mosaic_ratio, interpolation = cv2.INTER_NEAREST)
            self.image[y:y+h, x:x+w] = cv2.resize(small_image, (w,h), interpolation = cv2.INTER_NEAREST) 

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

if __name__ == '__main__' :
    detect_test = DetectFace("./resource/test.jpg")
    detect_test.detect_face()
    detect_test.post_process()





    

