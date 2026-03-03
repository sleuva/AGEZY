# 🌾 AGEZY OS

### Smart Agricultural Ecosystem Platform

AGEZY OS is a full-stack agricultural technology platform designed to empower farmers and stakeholders through digital infrastructure. It integrates marketplace services, advisory tools, community collaboration, and AI assistance into a unified ecosystem.

The system consists of:

* ⚛️ Modern React Client (SPA)
* 🖥 Node.js REST API Server
* 🍃 MongoDB Database
* 🤖 OpenAI-powered AI Assistant

---

# 🚀 Key Features

### 🛒 Equipment Marketplace

Buy, sell, and browse agricultural equipment.

### 👷 Labour Connect

Hire and offer farm labor services.

### 🥛 Dairy Trading

Buy and sell dairy products.

### 🌱 Smart Crop Advisory

AI-assisted agricultural recommendations.

### 📚 Learning Hub

Technical farming guides and educational resources.

### 🏛 Government Schemes

Awareness and tracking of agricultural schemes.

### 💬 Community Forum

Farmer discussion and collaboration platform.

### 🤖 AI Chat Assistant

Floating AI assistant powered by OpenAI API.

---

# 🏗 System Architecture

AGEZY OS follows a clean full-stack separation:

```plaintext
Client (React SPA)
        ↓
REST API (Express.js)
        ↓
MongoDB Database
        ↓
External APIs (OpenAI)
```

The frontend consumes secure JWT-protected REST endpoints exposed by the backend.

---

# ⚛️ Client Frontend

## 🛠 Tech Stack

| Category    | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | React 19                            |
| Build Tool  | Vite                                |
| Routing     | React Router v7                     |
| HTTP Client | Axios                               |
| Icons       | Lucide React                        |
| Styling     | Vanilla CSS (CSS Variables Theming) |

---

## 📂 Client Structure

```plaintext
client/src/
 ├── components/
 ├── pages/
 ├── services/
 ├── context/
 ├── hooks/
 ├── utils/
 ├── App.jsx
 └── main.jsx
```

### Architecture Highlights

* Context-based authentication (AuthContext)
* Service layer pattern (API calls separated from UI)
* Modular feature-based folder structure
* Persistent global AI assistant
* Clean SPA routing model

---

# 🖥 Backend Server

## 🛠 Tech Stack

| Category         | Technology |
| ---------------- | ---------- |
| Runtime          | Node.js    |
| Framework        | Express.js |
| Database         | MongoDB    |
| ORM              | Mongoose   |
| Authentication   | JWT        |
| Password Hashing | bcryptjs   |
| Environment      | dotenv     |
| CORS             | cors       |
| AI Integration   | OpenAI SDK |
| Dev Tool         | nodemon    |

---

## 📂 Server Structure

```plaintext
server/
 ├── config/
 ├── models/
 ├── routes/
 ├── controllers/
 ├── middleware/
 ├── index.js
 └── seeder.js
```

---

## 🔐 Authentication Flow

1. User logs in via `/api/auth`
2. Server validates credentials
3. JWT token issued
4. Client stores token
5. Protected routes validated via `authMiddleware.js`

---

## 🔄 Request Lifecycle

```plaintext
Client Request
     ↓
Route Handler
     ↓
Auth Middleware (if protected)
     ↓
Controller
     ↓
Mongoose Model
     ↓
MongoDB
     ↓
JSON Response
```

---

# 🔌 API Design Philosophy

* RESTful structure
* Domain-based route separation
* Clean controller logic
* Reusable service functions
* Standardized JSON responses
* Error handling middleware

---

# 🔐 Security Features

* JWT-based stateless authentication
* bcrypt password hashing
* Protected private routes
* CORS configuration
* Environment variable isolation

---

# 🤖 AI Integration

The AI assistant module:

* Uses OpenAI SDK
* Processes farming-related prompts
* Integrated through dedicated `aiRoutes` and `aiController`
* Connected to frontend floating assistant

---

# 🧠 Design Principles

AGEZY OS is built using:

* Separation of concerns
* Modular architecture
* MVC-inspired backend
* Context-based frontend state management
* Scalable folder organization
* Clean code standards

---

# 📦 Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/AGEZY-OS.git
```

---

## 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
```

Run server:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🌍 Deployment Ready

The system is designed to be deployable on:

* Frontend: Vercel / Netlify
* Backend: Render / Railway / AWS
* Database: MongoDB Atlas

---

# 🎓 What This Project Demonstrates

* Full-stack architecture design
* JWT authentication implementation
* MongoDB schema modeling
* RESTful API development
* React SPA architecture
* Context API state management
* Service-layer frontend pattern
* External AI API integration
* Secure environment handling
* Scalable modular structure

---

# 🚀 Future Enhancements

* Role-based access control expansion
* Real-time notifications (WebSockets)
* Advanced AI crop diagnostics
* Payment gateway integration
* Mobile app version
* Dockerized deployment

---

# 👨‍💻 Author

Developed by Sahil Leuva.
B.Tech – Information Technology

---


