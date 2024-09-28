# PhysioNep



### Contents:
- [Introduction](https://github.com/NibidaGhimire/PhysioNep?tab=readme-ov-file#introduction)
- [Why PhysioNep?](https://github.com/NibidaGhimire/PhysioNep?tab=readme-ov-file#why-physionep)
- [How to run locally?](https://github.com/NibidaGhimire/PhysioNep?tab=readme-ov-file#how-to-run-locally)



### Introduction
This project aims to provide a solution for people to do physiotherapy at home using pose angle detection. By analyzing the user's body posture, the system can provide real-time feedback and guidance to ensure correct exercise execution. This can help individuals improve their physical well-being and recover from injuries or conditions that require physiotherapy.


### Why PhysioNep?

1. Accurate pose angle detection: PhysioNep utilizes advanced algorithms to accurately detect and analyze the user's body posture. This ensures precise feedback and guidance, leading to more effective physiotherapy exercises.

2. Real-time feedback: By analyzing the user's body posture using pose angle detection, PhysioNep provides immediate feedback and guidance to ensure correct exercise execution. This helps users maintain proper form and maximize the effectiveness of their workouts.

3. Personalized approach: PhysioNep can be tailored to individual needs and goals. The system can adapt exercises based on the user's progress and provide customized routines to address specific areas of concern.

4. Accessibility: PhysioNep makes physiotherapy more accessible to a wider range of individuals, including those with limited mobility or living in remote areas with limited access to healthcare facilities.

5. Cost-effective: By reducing the need for in-person physiotherapy sessions, PhysioNep can potentially lower the overall cost of treatment for individuals.

6. Convenience: PhysioNep allows individuals to perform physiotherapy exercises in the comfort of their own homes, eliminating the need for frequent visits to a physiotherapy clinic.



## How to run locally?

On the project folder

> ``` npm install ```

> ```pip install mediapipe opencv-python numpy```

Input PORT, MONGO_DB_URI, JWT_SECRET, NODE_ENV in ".env" file:
> PORT = 5000 

> MONGO_DB_URI =  your mongodb uri,

> JWT_SECRET = your jwt key

> NODE_ENV = development

Run server:
> ```npm run server```

### Backend Server will run at: [http://localhost:5000](http://localhost:5000/)

Change the directory to projectFolder/Frontend:
> ```cd frontend```

Install npm packages:
> ```npm install```

Run the frontend:
> ```npm run dev```


### Frontend will run at: [http://localhost:3000/](http://localhost:3000/)