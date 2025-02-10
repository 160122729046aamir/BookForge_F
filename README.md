# Project Setup Guide

Follow the steps below to set up and run this project.

---

## Frontend Setup

### Steps to Run the Frontend:
1. **Clone or unzip the project folder.**
2. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
3. Create a `.env.local` file in the frontend root directory (at the same level as `package.json`) and add the following environment variables:
   ```ini
   # Set up Firebase app and configure the environment
   VITE_API_KEY=
   VITE_AUTH_DOMAIN=
   VITE_PROJECT_ID=
   VITE_STORAGE_BUCKET=
   VITE_MESSAGING_SENDERID=
   VITE_APPID=
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Start the frontend development server:
   ```sh
   npm run dev
   ```

---

## Backend Setup

### Steps to Run the Backend:
1. **Clone or unzip the project folder.**
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the backend root directory (at the same level as `package.json`) and add the following environment variables:
   ```ini
   # MongoDB Connection String
   DB_URL="your_mongodb_connection_url"

   # JWT Secret Key
   JWT_SECRET_KEY="your_jwt_secret_key"
   ```
   **Note:**
   - Ensure MongoDB is set up and running.
   - Replace `your_mongodb_connection_url` with your actual MongoDB connection string.
   - Set your own secure `JWT_SECRET_KEY`.

5. Start the backend development server:
   ```sh
   npm run start:dev
   ```

---

## Additional Notes
- Ensure Node.js and npm are installed on your system.
- If you encounter issues, check for missing dependencies and install them using `npm install`.
- Use a `.gitignore` file to exclude `.env` files from being pushed to version control.
- Make sure your Firebase project is correctly configured before running the frontend.

---

This completes the setup process. Happy coding! 🚀

