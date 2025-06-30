# Task Manager App

A task management web application with a Node.js + Express backend and React.js frontend.  
The app uses PostgreSQL as its database and Material-UI for UI components.

---

## Features

### Backend
- RESTful API built with Node.js and Express.js  
- PostgreSQL database with well-designed schema  
- Efficient query handling for filtering and sorting tasks  
- Basic API security (e.g., simple authentication or API keys)  

### Frontend
- React.js user interface  
- Responsive design using Material-UI  
- Task creation, update, deletion, and filtering  

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)  
- PostgreSQL installed and running  
- npm or yarn package manager  

### Backend Setup

1. Clone the repo and navigate to the backend directory:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo/backend
Install dependencies:

npm install
Create a .env file in the backend directory and add your database connection string:
PORT=5000
DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=your_secret_key
Run database migrations (if any) or initialize your database schema.

Start the backend server:

npm run start

Frontend Setup
Navigate to the frontend directory:

cd ../frontend
Install dependencies:

npm install
Create a .env file in the frontend directory with backend API base URL:

REACT_APP_API_BASE=https://your-backend-url/api
Start the React development server:

npm start
API Documentation
Base URL

[http://localhost:5000/api]

| Method | Endpoint     | Description           | Request Body                                   | Response             |
|--------|--------------|-----------------------|-----------------------------------------------|----------------------|
| GET    | /tasks       | Get list of tasks     | None                                          | List of task objects  |
| POST   | /tasks       | Create a new task     | `{ title, description, status, priority, due_date }` | Created task object   |
| PUT    | /tasks/:id   | Update a task by ID   | `{ title, description, status, priority, due_date }` | Updated task object   |
| DELETE | /tasks/:id   | Delete a task by ID   | None                                          | Success message      |

Security
The API uses basic authentication (e.g., JWT token or API key) —
include the Authorization header in requests.

Deployment
Backend: https://task-manager-5yla.onrender.com/
Frontend: https://task-manager-fe-fsh1.onrender.com/

License
MIT License

Contact
Your Name – faeqah.fauzi88@gmail.com
Project Link: 
Frontend: https://github.com/fayfauzi/frontend
Backend: https://github.com/fayfauzi/task-manager/tree/main/backend


