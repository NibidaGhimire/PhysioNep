import cv2
import mediapipe as mp
import math
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

window_size = 10
angle_buffer = []

actual_angles = {
    'left_elbow': 175,
    'right_elbow': 170,
    'left_shoulder': 75,
    'right_shoulder': 90,
    'left_hip': 150,
    'right_hip': 235,
    'left_knee': 170,
    'right_knee': 135
}

cap = cv2.VideoCapture(0)
cv2.namedWindow('MyWindow', cv2.WINDOW_NORMAL)
cv2.moveWindow('MyWindow', 512, 100)  
cv2.resizeWindow('MyWindow', 900, 650)  
cv2.setWindowProperty('MyWindow', cv2.WND_PROP_TOPMOST, 1)

with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        results = pose.process(image)

        image.flags.writeable = True 
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        try:
            landmarks = results.pose_landmarks.landmark
        except:
            pass
        
        left_elbow = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value]
        right_elbow = landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value]
        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value]
        left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
        right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value]
        left_knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value]
        right_knee = landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value]
        
        def calculate_angle(a, b, c):
            a = np.array(a)  # First landmark
            b = np.array(b)  # Second landmark
            c = np.array(c)  # Third landmark

            radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
            angle = np.abs(radians * 180.0 / np.pi)
            return angle
        
        le = [left_elbow.x, left_elbow.y]
        re = [right_elbow.x, right_elbow.y]
        ls = [left_shoulder.x, left_shoulder.y]
        rs = [right_shoulder.x, right_shoulder.y]
        lh = [left_hip.x, left_hip.y]
        rh = [right_hip.x, right_hip.y]
        lk = [left_knee.x, left_knee.y]
        rk = [right_knee.x, right_knee.y]
        
        def moving_average_filter(angle):
            angle_buffer.append(angle)
            if len(angle_buffer) > window_size:
                angle_buffer.pop(0)
    
            smoothed_angle = np.mean(angle_buffer)
            return smoothed_angle

        def compute_joint_angles():
            left_elbow = calculate_angle(lw, le, ls)
            right_elbow = calculate_angle(rs, re, rw)
            left_shoulder = calculate_angle(le, ls, lh)
            right_shoulder = calculate_angle(rh, rs, re)
            left_hip = calculate_angle(lk, lh, ls)
            right_hip = calculate_angle(rs, rh, rk)
            left_knee = calculate_angle(la, lk, lh)
            right_knee = calculate_angle(rh, rk, ra)
            
            computed_angles = {'left_elbow' : left_elbow, 
                            'right_elbow' :right_elbow, 
                            'left_shoulder' :left_shoulder, 
                            'right_shoulder' :right_shoulder, 
                            'left_hip' :left_hip, 
                            'right_hip' :right_hip,
                            'left_knee' :left_knee, 
                            'right_knee' :right_knee}
            
            for joint, angle in computed_angles.items():
                actual_angle = actual_angles[joint]
                error = abs(actual_angle - angle)
                
                if error > 15:  
                    correction_angle = actual_angle if actual_angle > angle else actual_angle - 180
                    if 'elbow' in joint:
                        cv2.line(image, (int(ls[0]*frame.shape[1]), int(ls[1]*frame.shape[0])), 
                                 (int(le[0]*frame.shape[1]), int(le[1]*frame.shape[0])), (0, 0, 255), 3)
                        cv2.line(image, (int(rs[0]*frame.shape[1]), int(rs[1]*frame.shape[0])), 
                                 (int(re[0]*frame.shape[1]), int(re[1]*frame.shape[0])), (0, 0, 255), 3)
                    elif 'hip' in joint:
                        cv2.line(image, (int(lh[0]*frame.shape[1]), int(lh[1]*frame.shape[0])), 
                                 (int(lk[0]*frame.shape[1]), int(lk[1]*frame.shape[0])), (0, 0, 255), 3)
                        cv2.line(image, (int(rh[0]*frame.shape[1]), int(rh[1]*frame.shape[0])), 
                                 (int(rk[0]*frame.shape[1]), int(rk[1]*frame.shape[0])), (0, 0, 255), 3)
                    
                    cv2.putText(image, f"Move {joint} to {correction_angle:.2f} degrees", 
                                (10, 30 + list(computed_angles.keys()).index(joint) * 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 255), 2, cv2.LINE_AA)
                                              
            for idx, (joint, angle) in enumerate(computed_angles.items()):
                if 'left' in joint:
                    side = 'Left'
                    if 'elbow' in joint:
                        pos = (int(le[0] * frame.shape[1]), int(le[1] * frame.shape[0]))
                    elif 'shoulder' in joint:
                        pos = (int(ls[0] * frame.shape[1]), int(ls[1] * frame.shape[0]))
                    elif 'hip' in joint:
                        pos = (int(lh[0] * frame.shape[1]), int(lh[1] * frame.shape[0]))
                    elif 'knee' in joint:
                        pos = (int(lk[0] * frame.shape[1]), int(lk[1] * frame.shape[0]))
                else:
                    side = 'Right'
                    if 'elbow' in joint:
                        pos = (int(re[0] * frame.shape[1]), int(re[1] * frame.shape[0]))
                    elif 'shoulder' in joint:
                        pos = (int(rs[0] * frame.shape[1]), int(rs[1] * frame.shape[0]))
                    elif 'hip' in joint:
                        pos = (int(rh[0] * frame.shape[1]), int(rh[1] * frame.shape[0]))
                    elif 'knee' in joint:
                        pos = (int(rk[0] * frame.shape[1]), int(rk[1] * frame.shape[0]))
    
                cv2.putText(image, f"{angle:.2f}Â°", 
                            pos,
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 2, cv2.LINE_AA)

            return computed_angles
        
        computed_angles = compute_joint_angles()

        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                  mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2),
                                  mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2)
                                  )

        cv2.imshow('MyWindow',image)
        if cv2.waitKey(10) & 0xFF==ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
