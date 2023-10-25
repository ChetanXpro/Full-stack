# TaskMate 

TaskMate is a task management application that allows users to create, manage, and organize tasks efficiently. This repository contains the source code for both the frontend (client) and backend (server) of the application.

### Live deployed demo
- [Demo Live Url](https://task-management-five-blue.vercel.app)
- Frontend and backend both deployed on vercel
- [Snake game code](https://github.com/ChetanXpro/snake-game)



## Features

- User authentication with jwt access and refresh token.
- Create new tasks with a title, description, status, and priority.
- View a list of tasks and their details.
- Edit and update existing tasks.
- Filter tasks by various criteria, such as status, priority, and completion.
- Sort tasks by date.
- Upload and update avatar images
- Data cache so that backend can server some frequently visited routes values faster.

## Getting Started

To run TaskMate locally, you will need to set up both the frontend and backend. Follow the instructions in the respective directories:

- [Frontend Setup](./client/README.md): Setup instructions for the frontend.
- [Backend Setup](./server/README.md): Setup instructions for the backend.

## Assumptions and Design Decisions

During the development of TaskMate, the following assumptions and design decisions were made:

1. **User Authentication**: We assumed that users will be required to authenticate before accessing task management features. User authentication is implemented using JWT access tokens and refresh token method

2. **Data Storage**: Task data is stored in a MongoDB database. and images for avatar is stored in aws s3.

3. **Priority and Status Values**: Task priority and status values are predefined and not customizable. Users can select from a predefined list of values. here i added a extra field name priority , with priority user can easily filter there tasks.

4. **Caching**: We utilize Azure Redis for caching frequently visited route values to improve application performance. it improved latency from average 300-400ms to 70-150ms. with this we can save some db calls also.

5. **Frontend Libraries**: TaskMate's frontend is built using React and styled using Tailwind CSS. i have intentionally limited the use of external libraries to maintain simplicity.

6. **Error Handling**: Express.js middleware, such as `express-async-handler`, is used for error handling. It simplifies error handling for asynchronous operations.



## Technologies Used

### Frontend (Client)

- **React**: TaskMate's frontend is built using React, a popular JavaScript library for building user interfaces.
- **Librarys**: I have only used basic libraries like Axios. I decided to complete this project without using any external libraries.
- **TypeScript**: TypeScript is used for static typing and improved developer tooling.
- **Tailwind CSS**: Tailwind CSS is utilized for styling, allowing for a responsive and visually appealing design.
- **React Query**: The application uses React Query for managing API data fetching and state.

### Backend (Server)

- **Node.js**: The backend server is built using Node.js, a JavaScript runtime.
- **Express.js**: Express.js is used for creating a RESTful API to serve and manage tasks.
- **MongoDB**: MongoDB is used as the database for storing and retrieving task data.
- **Mongoose**: Mongoose is an ODM (Object Data Modeling) library for MongoDB.
- **AWS S3***: S3 to store users avatar images.
- **Azure Redis**: Redis is used to cache some frequently visited route values.
- **Express-async-handler**: Express-async-handler is a middleware for Express.js that simplifies error handling in asynchronous route handlers.

## Usage

Once you have both the frontend and backend set up, you can start using TaskMate to manage your tasks. Create, update, and organize tasks to stay productive and organized.



Happy task managing with TaskMate!
