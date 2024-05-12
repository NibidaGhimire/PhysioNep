import cv2
import numpy as np
import time
import posemodule as pm

# Initialize video capture
cap = cv2.VideoCapture(0)


# Initialize pose detector
detector = pm.poseDetector()
count = 0
dir = 0
pTime = 0

while True:
    # Read frame from video
    success, img = cap.read()
    if not success:
        break

    # Resize frame
    img = cv2.resize(img, (900, 650))
    cv2.imshow("Image", img)
    cv2.moveWindow("Image", 512, 100)

    # Perform pose detection
    img = detector.findPose(img, draw=False)
    lmList = detector.findPosition(img, draw=False)

    if len(lmList) != 0:
        # Right Arm Curl Angle
        angle = detector.findAngle(img, 12, 14, 16)

        # Interpolate angle to percentage
        per = np.interp(angle, (210, 310), (0, 100))
        bar = np.interp(angle, (220, 310), (625, 100))

        # Check for successful curl
        color = (255, 0, 255)
        if per == 100:
            color = (0, 255, 0)
            if dir == 0:
                count += 1
                dir = 1
        else:
            dir = 0

        # Draw Bar
        cv2.rectangle(img, (800, 100), (825, 625), color, 3)
        cv2.rectangle(img, (800, int(bar)), (825, 625), color, cv2.FILLED)   
        cv2.putText(img, f'{int(per)} %', (1100, 75), cv2.FONT_HERSHEY_PLAIN, 4, color, 4)

        # Draw Curl Count
        cv2.rectangle(img, (0, 450), (250, 650), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (45, 625), cv2.FONT_HERSHEY_PLAIN, 15, (255, 0, 0), 25)

    # Calculate FPS
    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime

    # Draw FPS
    cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5, (255, 0, 0), 5)

    # Display frame
    cv2.imshow("Image", img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release video capture and close windows
cap.release()
cv2.destroyAllWindows()
