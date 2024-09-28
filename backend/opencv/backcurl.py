import cv2
import numpy as np
import time
import posemodule as pm

cap = cv2.VideoCapture(0)

detector = pm.poseDetector()
count = 0
dir = 0
pTime = 0

timer_start = 0
timer_active = False
timer_duration = 10  

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
        angle = detector.findAngle(img, 12, 24, 26)

        per = np.interp(angle, (180, 230), (0, 100))
        bar = np.interp(angle, (180, 230), (650, 100))

        color = (255, 0, 255)  

        if per == 100:
            color = (0, 255, 0) 
            if dir == 0:
                count += 1
                dir = 1
                timer_start = time.time() 
                timer_active = True
        elif per == 0:
            dir = 0

        cv2.rectangle(img, (800, 100), (825, 625), color, 3)
        cv2.rectangle(img, (800, int(bar)), (825, 625), color, cv2.FILLED)
        cv2.putText(img, f'{int(per)} %', (775, 75), cv2.FONT_HERSHEY_PLAIN, 2, color, 4)

        if timer_active:
            elapsed_time = time.time() - timer_start
            remaining_time = max(0, timer_duration - int(elapsed_time))
            cv2.putText(img, f'Time Left: {remaining_time}s', (300, 75), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 3)

            if remaining_time == 0:
                timer_active = False  

    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime

    cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5, (255, 0, 0), 5)

    cv2.imshow("Image", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
