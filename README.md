# Currency-Exchanger
A Mern Stack app that uses Flixer API to show latest currency exchange conversion rates.

## How to Run the app.
run 'npm install' on both the Server and the exchanger (frontend) folders.
use command 'npm start' on the sever side and command 'npm start dev' or 'vite' on the exchanger folder to run both the frontend and the backend.
### make sure Redis Server instance is working on your machine before starting the server as the server uses Redis for caching the API responses.
You Can Either use Redis on Linux, use it on WSL on windows or if you want to run Redis on windows directly you can use this unoffical native port:
https://github.com/zkteco-home/redis-windows
I have tried both WSL and the Unoffical versions and they work as expected. 

## Features
- Caching using Redis. 
- User Register and Login.
- JWT Authentication. 
- Graph for exchanges for the past month. 
- Crud Operations for Favorite exchanges per user. 

![image](https://user-images.githubusercontent.com/63824808/179323514-648b4d1b-6849-42a5-8d2b-d26ee6895b71.png)

