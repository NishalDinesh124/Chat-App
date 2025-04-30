# Chat Application

A modern, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js), featuring real-time messaging using Socket.IO. The application provides a seamless chat experience with a beautiful and responsive user interface.

## Features

- **Real-time Messaging**: Powered by Socket.IO, users can send and receive messages instantly without page reloads.
- **Responsive Design**: Fully responsive and optimized for both mobile and desktop views.
- **User-friendly Interface**: A clean, intuitive, and modern design for a great user experience.
- **MongoDB**: Utilizes MongoDB for data storage, ensuring scalability and flexibility.

## Technologies Used

- **MongoDB**: Database for storing user and chat data.
- **Express.js**: Backend framework to handle routing and server-side logic.
- **React.js**: Frontend library for building dynamic and interactive UI.
- **Socket.IO**: Real-time communication for sending and receiving messages.
- **Node.js**: Runtime environment for executing JavaScript on the server.
- **Styled Components**: For writing CSS in JavaScript to style components dynamically.
- **emoji-mart**: To integrate emoji support in the chat.
- **react-ticker**: To display a real-time scrolling ticker for messages or updates.

## Setup

1. Clone the repository:

```bash
git clone  https://github.com/NishalDinesh124/Chat-App.git
```
2. Install dependencies for both client and server:

For server-side:

bash
cd server
npm install

For client-side:

bash
cd client
npm install

3. NPM Libraries
Ensure the following npm libraries are installed for proper functionality:

-Socket.IO: For real-time communication.

bash
npm install socket.io-client
npm install socket.io(in server folder)

Set up your environment variables for MongoDB connection and Socket server in the .env file.

3. Start the server and client:

For server-side:

bash
cd server
npm start (or install nodemon)

For client-side:

bash
cd client
npm start
Visit http://localhost:3000 to use the application.

Contributing
Feel free to fork and submit pull requests if you'd like to contribute to the project. Contributions are always welcome!

License
This project is open-source and available under the MIT License.
