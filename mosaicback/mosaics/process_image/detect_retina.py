from retinaface import RetinaFace
import cv2

def int_tuple(t):
    return tuple(int(x) for x in t)

def int_list(t):
    return list(int(x) for x in t)

def detect_face(img_path) :
    img = cv2.imread(img_path)

    resp = RetinaFace.detect_faces(img_path, threshold = 0.5)

    resp = dict(sorted(resp.items(), key=lambda x : x[1]["facial_area"]))
    
    for key in resp :
        identity = resp[key]
        landmarks = identity["landmarks"]
        for key_place in landmarks :
            landmarks[key_place] = int_list(landmarks[key_place])
        identity["facial_area"] = int_list(identity["facial_area"])
        
    return resp

    #write rect and circle

    # for i, key in enumerate(resp) :
    #     identity = resp[key]

    #     landmarks = identity["landmarks"]

    #     diameter = 1
    #     cv2.circle(img, int_tuple(landmarks["left_eye"]), diameter, (0,0,255), -1)
    #     cv2.circle(img, int_tuple(landmarks["right_eye"]), diameter, (0,0,255), -1)
    #     cv2.circle(img, int_tuple(landmarks["nose"]), diameter, (0,0,255), -1)
    #     cv2.circle(img, int_tuple(landmarks["mouth_left"]), diameter, (0,0,255), -1)
    #     cv2.circle(img, int_tuple(landmarks["mouth_right"]), diameter, (0,0,255), -1)

    #     facial_area = identity["facial_area"]
    #     print(facial_area)
    #     print(type(facial_area))
    #     cv2.rectangle(img, (facial_area[2], facial_area[3]), (facial_area[0], facial_area[1]), (255,255,255), 1)

    #     cv2.putText(img, str(i), (facial_area[2], facial_area[3]), fontFace = cv2.FONT_ITALIC, fontScale = 1,thickness=2, color = (200,200,0))

    # cv2.imwrite('output.'+img_path.split(".")[1], img)