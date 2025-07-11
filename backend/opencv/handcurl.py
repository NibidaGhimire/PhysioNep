import cv2
import numpy as np
import time
import posemodule as pm

cap = cv2.VideoCapture(1)


detector = pm.poseDetector()
count = 0
dir = 0
pTime = 0

while True:
    success, img = cap.read()
    if not success:
        break

    img = cv2.resize(img, (900, 650))
    cv2.imshow("Image", img)
    cv2.moveWindow("Image", 512, 100)
    cv2.setWindowProperty('Image', cv2.WND_PROP_TOPMOST, 1)


    img = detector.findPose(img, draw=False)
    lmList = detector.findPosition(img, draw=False)

    if len(lmList) != 0:
        angle = detector.findAngle(img, 12, 14, 16)

        per = np.interp(angle, (210, 310), (0, 100))
        bar = np.interp(angle, (220, 310), (625, 100))

        color = (255, 0, 255)
        if per == 100:
            color = (0, 255, 0)
            if dir == 0:
                count += 1
                dir = 1
        else:
            dir = 0

        cv2.rectangle(img, (800, 100), (825, 625), color, 3)
        cv2.rectangle(img, (800, int(bar)), (825, 625), color, cv2.FILLED)   
        cv2.putText(img, f'{int(per)} %', (775, 75), cv2.FONT_HERSHEY_PLAIN, 2, color, 4)

        cv2.rectangle(img, (0, 450), (250, 650), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (45, 625), cv2.FONT_HERSHEY_PLAIN, 15, (255, 0, 0), 25)

    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime

    cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5, (255, 0, 0), 5)

    cv2.imshow("Image", img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
