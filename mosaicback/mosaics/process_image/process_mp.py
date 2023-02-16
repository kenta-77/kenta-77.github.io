import mediapipe as mp
import cv2
import re

def face_detect(image, mp_face_detection, face_size):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    detected_faces = []
    with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_detection:
        results = face_detection.process(image_rgb)
        print(type(results.detections))
        for detection in results.detections :
            detection = str(detection)
            bounding_box = []
            xmin = re.search(r"xmin: (\d.\d+)", detection)
            ymin = re.search(r"ymin: (\d.\d+)", detection)
            width = re.search(r"width: (\d.\d+)", detection)
            height = re.search(r"height: (\d.\d+)", detection)
            bounding_box = [int(float(xmin.group(1))*face_size[1]), int(float(ymin.group(1))*face_size[0]), int(float(width.group(1))*face_size[1]), int(float(width.group(1))*face_size[0])]
            detected_faces.append(bounding_box)
    return detected_faces



if __name__ == '__main__' :
    image = cv2.imread("test2.jpg")
    #load mediapipe detection
    mp_face_detection = mp.solutions.face_detection
    mp_drawing = mp.solutions.drawing_utils
    face_size = [image.shape[0], image.shape[1]]
    print(face_detect(image, mp_face_detection, face_size))
    
