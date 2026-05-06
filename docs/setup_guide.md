# 🚀 Setup Guide

Follow these steps to get your project running locally.

## 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment:
   Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/student_erp
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## 2. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## 3. Deployment

To prepare the project for production:
- **Frontend**: Run `npm run build` to generate a `dist` folder.
- **Backend**: Ensure your `MONGO_URI` points to a production database (like MongoDB Atlas).
