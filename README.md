# TaskMate

TaskMate is a task management application that allows users to create, manage, and organize tasks efficiently. This repository contains the source code for both the frontend (client) and backend (server) of the application.

## Features

- Create new tasks with a title, description, status, and priority.
- View a list of tasks and their details.
- Edit and update existing tasks.
- Filter tasks by various criteria, such as status, priority, and completion.
- Sort tasks by date.
- Upload and update avatar images

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

## Getting Started

To run TaskMate locally, you will need to set up both the frontend and backend. Follow the instructions in the respective directories:

- [Frontend Setup](./client/README.md): Setup instructions for the frontend.
- [Backend Setup](./server/README.md): Setup instructions for the backend.

## Usage

Once you have both the frontend and backend set up, you can start using TaskMate to manage your tasks. Create, update, and organize tasks to stay productive and organized.

## Contributing

If you would like to contribute to TaskMate, please read our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the open-source community for the tools and libraries used in this project.

---

Happy task managing with TaskMate!
