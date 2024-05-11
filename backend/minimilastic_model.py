import cv2
import mediapipe as mp
import math
import numpy as np
mp_drawing=mp.solutions.drawing_utils
mp_pose=mp.solutions.pose

window_size = 10
angle_buffer = []

actual_angles = {
    'left_elbow_angle': 176.59808596459845,
    'right_elbow_angle': 179.69649230634394,
    'left_shoulder_angle': 91.89307646277729,
    'right_shoulder_angle': 256.30026350702263,
    'left_hip_angle': 223.93430778734532,
    'right_hip_angle': 101.9889509436257,
    'left_knee_angle': 177.98482135733144,
    'right_knee_angle': 246.89442127190478
}

#video capture
cap=cv2.VideoCapture(0)
cv2.namedWindow('MyWindow', cv2.WINDOW_NORMAL)
cv2.moveWindow('MyWindow', 512, 100)  
cv2.resizeWindow('MyWindow', 900, 650)  

cv2.setWindowProperty('MyWindow', cv2.WND_PROP_TOPMOST, 1)

#setup mediapipe instance
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret,frame=cap.read()

        #recolour image to RGB
        image=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        #make detection
        results = pose.process(image)

        #recolour image back to BGR
        image.flags.writeable = True 
        image=cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        #extract landmarks
        try:
            landmarks= results.pose_landmarks.landmark
        except:
            pass
        
        #finding_landmarks
        left_elbow=landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value]
        right_elbow=landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value]
        left_shoulder=landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
        right_shoulder=landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value]
        left_hip=landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
        right_hip=landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value]
        left_knee=landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value]
        right_knee=landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value]
        left_wrist=landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]
        right_wrist=landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value]
        right_ankle=landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value]
        left_ankle=landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]

        #angle_calculation
        def calculate_angle(a,b,c):
            a = np.array(a) #first_landmark
            b = np.array(b) #second_landmark
            c = np.array(c) #third_landmark

            radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
            angle = np.abs(radians*180.0/np.pi)
            if angle > 180.0:
                angle = 360-angle
            return angle
        
        #extracting x and y
        le=[left_elbow.x, left_elbow.y]
        re=[right_elbow.x, right_elbow.y]
        ls=[left_shoulder.x, left_shoulder.y]
        rs=[right_shoulder.x, right_shoulder.y]
        lh=[left_hip.x, left_hip.y]
        rh=[right_hip.x, right_hip.y]
        lk=[left_knee.x, left_knee.y]
        rk=[right_knee.x, right_knee.y]
        lw=[left_wrist.x, left_wrist.y]
        rw=[right_wrist.x, right_wrist.y]
        la=[left_ankle.x, left_ankle.y]
        ra=[right_ankle.x, right_ankle.y]

        #warrior pose
        def compute_joint_angles():
            left_elbow_angle = calculate_angle(lw, le, ls)
            right_elbow_angle = calculate_angle(rs, re, rw)
            left_shoulder_angle = calculate_angle(le, ls, lh)
            right_shoulder_angle = calculate_angle(rh, rs, re)
            left_hip_angle = calculate_angle(lk, lh, ls)
            right_hip_angle = calculate_angle(rs, rh, rk)
            left_knee_angle = calculate_angle(la, lk, lh)
            right_knee_angle = calculate_angle(rh, rk, ra)
            
            computed_angles = {'left_elbow_angle' : left_elbow_angle, 
                            'right_elbow_angle' :right_elbow_angle, 
                            'left_shoulder_angle' :left_shoulder_angle, 
                            'right_shoulder_angle' :right_shoulder_angle, 
                            'left_hip_angle' :left_hip_angle, 
                            'right_hip_angle' :right_hip_angle,
                            'left_knee_angle' :left_knee_angle, 
                            'right_knee_angle' :right_knee_angle}
            

            cv2.putText(image, "{:.2f}".format(left_elbow_angle), 
                            tuple(np.multiply(le, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
            
            cv2.putText(image, "{:.2f}".format(right_elbow_angle), 
                            tuple(np.multiply(re, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
            
            cv2.putText(image, "{:.2f}".format(left_shoulder_angle), 
                            tuple(np.multiply(ls, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
            
            cv2.putText(image, "{:.2f}".format(right_shoulder_angle), 
                            tuple(np.multiply(rs, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
            
            cv2.putText(image, "{:.2f}".format(left_hip_angle), 
                            tuple(np.multiply(lh, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
            
            cv2.putText(image, "{:.2f}".format(right_hip_angle), 
                            tuple(np.multiply(rh, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
            
            cv2.putText(image, "{:.2f}".format(left_knee_angle), 
                            tuple(np.multiply(lk, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
            
            cv2.putText(image, "{:.2f}".format(right_knee_angle), 
                            tuple(np.multiply(rk, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            )
    
            return computed_angles
        compute_joint_angles()
        
        
        # Function to apply moving average filter to angle measurements
        def moving_average_filter(angle):
        # Update buffer with new angle
            angle_buffer.append(angle)
            if len(angle_buffer) > window_size:
                angle_buffer.pop(0)
    
        # Calculate moving average
            smoothed_angle = np.mean(angle_buffer)
            return smoothed_angle


        #render detections
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                  mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2),
                                  mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                                  )

        #display
        cv2.imshow('MyWindow',image)
        if cv2.waitKey(10) & 0xFF==ord('q'):
            break

cap.release()
cv2.destroyAllWindows()


