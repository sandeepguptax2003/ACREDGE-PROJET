# Acredge Project
A comprehensive full-stack application for managing real estate developers, projects, towers, and series.

## 🌟 Live Demo
- Frontend: [https://acredge-project.web.app/](https://acredge-project.web.app/)
- Backend API: [https://acredge-projet-backend.onrender.com](https://acredge-projet-backend.onrender.com)

## 🚀 Features
- **Developer Management**: Add, edit, and manage real estate developers
- **Project Management**: Create and manage real estate projects
- **Tower Management**: Add and manage towers within projects
- **Series Management**: Manage different series of apartments within towers
- **Dynamic Forms**: Flexible forms for adding and editing different entity types

## 🛠️ Technologies Used
### Backend
- Node.js
- Express.js
- Firebase & Firestore
- RESTful API design

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API for AJAX requests

## 🔧 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/developers` | Get all developers |
| POST   | `/api/developers` | Create a new developer |
| GET    | `/api/developers/:id` | Get a specific developer |
| PUT    | `/api/developers/:id` | Update a developer |
| DELETE | `/api/developers/:id` | Delete a developer |
| GET    | `/api/projects` | Get all projects |
| POST   | `/api/projects` | Create a new project |
| GET    | `/api/projects/:id` | Get a specific project |
| PUT    | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |
| GET    | `/api/towers` | Get all towers |
| POST   | `/api/towers` | Create a new tower |
| GET    | `/api/towers/:id` | Get a specific tower |
| PUT    | `/api/towers/:id` | Update a tower |
| DELETE | `/api/towers/:id` | Delete a tower |
| GET    | `/api/series` | Get all series |
| POST   | `/api/series` | Create a new series |
| GET    | `/api/series/:id` | Get a specific series |
| PUT    | `/api/series/:id` | Update a series |
| DELETE | `/api/series/:id` | Delete a series |

## 🚀 Getting Started
### Prerequisites
- Node.js (v14 or later)
- MongoDB (if used, please confirm)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/acredge-project.git
   cd acredge-project
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=4500
   ```

4. Start the backend server:
   ```
   node server.js
   ```

5. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

6. Start the frontend development server:
   ```
   npm start
   ```

7. Open your browser and navigate to `http://localhost:4500`

## 📦 API Usage Examples

Here are examples of how to use the API for developer-related operations:

a. Create a New Developer (POST request):
```
URL: http://localhost:4500/api/developers
Method: POST
Body (raw JSON):
{
  "name": "Test Developer",
  "address": "123 Test St, Test City, TS 12345",
  "incorporationDate": "2023-01-01",
  "totalProjectsDelivered": 10,
  "totalSqFtDelivered": 1000000,
  "reasonForChoosing": "Reliable and innovative",
  "websiteLink": "https://testdeveloper.com",
  "status": "Active"
}
```

b. Get All Developers (GET request):
```
URL: http://localhost:4500/api/developers
Method: GET
```

c. Get Developer by ID (GET request):
```
URL: http://localhost:4500/api/developers/{developerId}
Method: GET
```

d. Update Developer (PUT request):
```
URL: http://localhost:4500/api/developers/{developerId}
Method: PUT
Body (raw JSON): Include the fields you want to update
```

e. Delete Developer (DELETE request):
```
URL: http://localhost:4500/api/developers/{developerId}
Method: DELETE
```

Replace `{developerId}` with the actual ID of the developer you want to retrieve, update, or delete.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/your-username/acredge-project/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
