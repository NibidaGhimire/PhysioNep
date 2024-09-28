import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { spawn } from "child_process";


import authRoutes from "./routes/auth.routes.js"

import connectToMongoDb from "./db/connectToMongoDB.js";

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

const startPythonProcess = () => {
  const pythonProcess = spawn('python', ['./backend/opencv/minimalistic_model.py']);

  pythonProcess.on('exit', (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  return pythonProcess;
};

let pythonProcess; // Variable to hold the reference to the Python process

// Route to start the Python script
app.get('/api/run-python-script', (req, res) => {
  if (!pythonProcess) {
    pythonProcess = startPythonProcess(); // Start the Python process if it's not already running
    res.sendStatus(200);
  } else {
    res.status(400).send('Python script is already running');
  }
});

// Route to stop the Python script
app.get('/api/stop-python-script', (req, res) => {
  if (pythonProcess) {
    pythonProcess.kill(); // Terminate the Python process
    pythonProcess = null; // Reset the reference to the Python process
    res.sendStatus(200);
  } else {
    res.status(400).send('Python script is not running');
  }
});


const startHandCurl = () => {
  const handCurlProcess = spawn('python', ['./backend/opencv/handcurl.py']);
  console.log('Python process started on biceps');
  handCurlProcess.on('exit', (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  return handCurlProcess;
};

let handCurlProcess; // Variable to hold the reference to the Python process

// Route to start the Python script
app.get('/api/curl-start', (req, res) => {
  if (!handCurlProcess) {
    handCurlProcess = startHandCurl(); // Start the Python process if it's not already running
    res.sendStatus(200);
  } else {
    res.status(400).send('Python script is already running');
  }
});

// Route to stop the Python script
app.get('/api/curl-end', (req, res) => {
  if (handCurlProcess) {
    handCurlProcess.kill(); // Terminate the Python process
    handCurlProcess = null; // Reset the reference to the Python process
    res.sendStatus(200);
  } else {
    res.status(400).send('Python script is not running');
  }
});





const startBCurl = () => {
  const BcurlProcess = spawn('python', ['./backend/opencv/backcurl.py']);
  console.log('Python process started on biceps');
  BcurlProcess.on('exit', (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  return BcurlProcess;
};

let BcurlProcess; // Variable to hold the reference to the Python process

// Route to start the Python script
app.get('/api/bcurl-start', (req, res) => {
  if (!BcurlProcess) {
    BcurlProcess = startBCurl(); // Start the Python process if it's not already running
    res.sendStatus(200);
  } else {
    res.status(400).send('Python script is already running');
  }
});

// Route to stop the Python script
app.get('/api/bcurl-end', (req, res) => {
  if (BcurlProcess) {
    BcurlProcess.kill(); // Terminate the Python process
    BcurlProcess = null; // Reset the reference to the Python process
    res.sendStatus(200);
  } else {
    res.status(400).send('Python script is not running');
  }
});



app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port: ${PORT}`)
});