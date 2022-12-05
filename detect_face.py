import cv2

class DetectFace() :
    """Face detection for a image """

    cascade_path = "./Mosaic_app/haarcascade_frontalface_default.xml"
    face_cascade = cv2.CascadeClassifier(cascade_path)
    def __init__(self) :
        self.image_file = ""
        

    def write_rectangle(self, detect_faces, image) :
        for x, y, w, h in detect_faces :
            cv2.rectangle(image, (x, y), (x+w, y+h), (255, 255, 255), 2)
        return image


    def detect_face(self) :
        image = cv2.imread(self.image_file)
        image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        detect_faces = self.face_cascade.detectMultiScale(image_gray)

        print(detect_faces)
        #矩形描画テスト
        rect_image = self.write_rectangle(detect_faces, image)

        cv2.imshow("test_result", rect_image)
        cv2.waitKey(0)


if __name__ == '__main__' :
    detect_test = DetectFace()
    detect_test.image_file = "./Mosaic_app/many_face_test.jpg"
    detect_test.detect_face()





    

