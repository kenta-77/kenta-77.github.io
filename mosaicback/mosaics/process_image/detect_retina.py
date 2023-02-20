from retinaface import RetinaFace
import cv2


def detect_face (img_path) :
    img = cv2.imread(img_path)

    resp = RetinaFace.detect_faces(img_path, threshold = 0.5)

    print("faces"+str(len(resp)))
    #print(resp)
    def int_tuple(t):
        return tuple(int(x) for x in t)

    resp = dict(sorted(resp.items(), key=lambda x : x[1]["facial_area"]))
    print(resp)
    for i, key in enumerate(resp) :
        identity = resp[key]
        print(identity)
        print(type(identity))
        landmarks = identity["landmarks"]
        print(landmarks)
        print(type(landmarks))
        diameter = 1
        cv2.circle(img, int_tuple(landmarks["left_eye"]), diameter, (0,0,255), -1)
        cv2.circle(img, int_tuple(landmarks["right_eye"]), diameter, (0,0,255), -1)
        cv2.circle(img, int_tuple(landmarks["nose"]), diameter, (0,0,255), -1)
        cv2.circle(img, int_tuple(landmarks["mouth_left"]), diameter, (0,0,255), -1)
        cv2.circle(img, int_tuple(landmarks["mouth_right"]), diameter, (0,0,255), -1)

        facial_area = identity["facial_area"]
        print(facial_area)
        print(type(facial_area))
        cv2.rectangle(img, (facial_area[2], facial_area[3]), (facial_area[0], facial_area[1]), (255,255,255), 1)

        cv2.putText(img, str(i), (facial_area[2], facial_area[3]), fontFace = cv2.FONT_ITALIC, fontScale = 1,thickness=2, color = (200,200,0))

    cv2.imwrite('output.'+img_path.split(".")[1], img)