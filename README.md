
# 🚀 Me-API Playground

A full-stack candidate profile application designed to store and serve my professional data through a custom-built REST API.

## 🏗️ Architecture

The application is built using a decoupled **MERN-lite** architecture:

* **Frontend**: Built with **React 19 (Vite + TypeScript)** and **Tailwind CSS 4** for a high-performance, responsive UI.
* **Backend**: A **Node.js & Express** server utilizing ES Modules and a clean Controller-Route-Model pattern.
* **Database**: **MongoDB (via Mongoose)** storing a single, unified profile document to ensure efficient data retrieval.

## 🛠️ Setup Instructions

### Backend (Local)

1. Navigate to the `backend` folder: `cd backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

```


4. Start development server: `npm run dev`.

### Frontend (Local)

1. Navigate to the `frontend` folder: `cd frontend`.
2. Install dependencies: `npm install`.
3. Ensure `src/Api.ts` points to your backend URL.
4. Start development server: `npm run dev`.

## 📡 API Reference

* **`GET /health`**: Returns a `200 OK` status for liveness checks.
* **`GET /profile`**: Fetches the full candidate profile.
* **`POST /profile`**: Initial creation of the profile document.
* **`GET /skills/top`**: Returns skills ranked by frequency in projects.
* **`GET /projects?skill={name}`**: Filters projects by a specific skill.
* **`GET /search?q={query}`**: Performs a global search across name, education, projects, and work experience.

## 🚀 Deployment & Submission

* **Frontend URL**: [Render Link](https://me-api-ground-1.onrender.com)
* **Backend API URL**: [Render Link](https://me-api-ground.onrender.com)
* **Resume**: [Drive Link](https://drive.google.com/file/d/1iAV99hC9uE3sRhQ6Ni6D4l8eYNO3eAbk/view?usp=drive_link)

---
