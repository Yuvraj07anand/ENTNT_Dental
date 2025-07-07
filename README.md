# 🦷 Entnt Dental Management App

A lightweight dental clinic management web app built with React, Tailwind CSS, and localStorage for persistent data. It supports patient registration, appointment scheduling, appointment management, file attachments, and appointment history – all in a clean and user-friendly interface.

---

## 🚀 Features

- ✅ Patient Registration and Login (Admin and Patient Roles)
- ✅ Admin Dashboard with Appointment Table
- ✅ Add / Edit / Delete Appointments
- ✅ Manage Appointments (Reschedule, Add Cost, Upload Files)
- ✅ Appointment Status Auto-Update (Scheduled → Completed)
- ✅ View Attachments (Image/PDF)
- ✅ Responsive UI with Tailwind CSS
- ✅ LocalStorage as a Mock Backend (No external DB required)

---

## 🏁 Getting Started

### 📦 Prerequisites

- Node.js (v16 or later)
- npm

### 🔧 Setup

```bash
# 1. Clone the repository
git clone https://github.com/Yuvraj07anand/ENTNT_Dental.git
cd  ENTNT_Dental

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev


## 🧠 Architecture

The **Entnt Dental App** is built using a clean, modular architecture that promotes separation of concerns and maintainability.

### 1. Component-Based Frontend

- React components are organized by **feature** (`appointments`, `patients`, `auth`, `shared`, etc.).
- Each component is self-contained, managing its own UI and props/state.
- Shared utilities like `DataTable` and `FileUpload` are reusable across features.

### 2. State Management

- `DataContext`: Manages **global data** like patients and appointments.
- `AuthContext`: Handles **authentication**, login, logout, and role-based access.
- Context APIs provide clean and scalable global state without external libraries like Redux.

### 3. Routing

- React Router is used for page navigation.
- Routes are protected using the `ProtectedRoute` component.
- User access is controlled based on roles (`Admin`, `Patient`).

### 4. Data Persistence

- Uses **localStorage** to simulate a backend.
- All data (patients, appointments, files) is stored and retrieved from localStorage.
- Simulates CRUD operations without needing a database or server.

### 5. UI Layer

- Built with **Tailwind CSS** for responsive, utility-first styling.
- Tables, and form components are all styled using Tailwind for consistency.

## 🧪 Technical Decisions

- **React + Context API for State Management**  
  Chose React Context over Redux or Zustand for simplicity and built-in support.  
  `AuthContext` handles login, logout, and role-based access.  
  `DataContext` manages global data like patients and appointments.

- **Component-Based File Structure**  
  Organized components by feature (`appointments`, `patients`, `auth`, etc.) for better scalability and maintainability.

- **Tailwind CSS for Styling**  
  Used Tailwind for utility-first styling, enabling rapid UI development with minimal CSS boilerplate.

- **React Router for Navigation**  
  Implemented route-based navigation using `react-router-dom`, with support for protected routes based on roles.

- **LocalStorage as Mock Backend**  
  Used `localStorage` to persist data (patients, appointments, files) instead of a real database, allowing a full working prototype without backend setup.

- **File Upload and Viewing Support**  
  Added image and PDF upload support using `<input type="file">`, with modal previewing for attachments.

- **Form Validation**  
  Performed inline validation for required fields (e.g., name, DOB, email), with specific rules for contact numbers and password strength.


## 🐞 Known Issues / Limitations

- **LocalStorage-Based Persistence**  
  All data is stored in the browser using `localStorage`, which is not suitable for production environments or multi-user access.

- **No Appointment History View (Initially)**  
  There is no built-in way to track or view the history of changes made to appointments. (May be added later as a feature.)

- **No Database Integration**  
  The app does not use a real database (like MongoDB or PostgreSQL), which limits data consistency, scalability, and persistence across devices.

- **No JWT Authentication**  
  User authentication is simulated without secure token-based (JWT) authorization. This limits secure login/logout behavior and session management.
