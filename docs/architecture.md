# 🏛️ System Architecture

The Student Management Mini ERP is built using the **MERN Stack**, a popular full-stack development framework.

## 🧱 The Stack

1. **MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents.
2. **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
3. **React**: A JavaScript library for building user interfaces, specifically Single Page Applications (SPAs).
4. **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used to run the backend server.

## 🔄 Data Flow

1. **Frontend**: The user interacts with the React UI. When they perform an action (e.g., adding a student), a request is sent using **Axios** to the backend.
2. **Backend**: The Express server receives the request, processes it through **Routes** and **Controllers**, and interacts with the database using **Mongoose**.
3. **Database**: MongoDB stores the data. Mongoose ensures the data follows a specific **Schema**.
4. **Response**: The server sends a response back to the frontend, which updates the UI dynamically without a page refresh.
