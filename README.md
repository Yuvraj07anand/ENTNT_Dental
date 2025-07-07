# 🦷 Entnt Dental Management App
A lightweight dental clinic management web app built with React, Tailwind CSS, and localStorage for persistent data. It supports patient registration, appointment scheduling, appointment management, file attachments, and appointment history – all in a clean and user-friendly interface.

# 🚀 Features
✅ Patient Registration and Login (Admin and Patient Roles)

✅ Admin Dashboard with Appointment Table

✅ Add / Edit / Delete Appointments

✅ Manage Appointments (Reschedule, Add Cost, Upload Files)

✅ Appointment Status Auto-Update (Scheduled → Completed)

✅ View Attachments (Image/PDF)

✅ Responsive UI with Tailwind CSS

✅ LocalStorage as a Mock Backend (No external DB required)

🏁 Getting Started
📦 Prerequisites
Node.js (v16 or later)

npm

🔧 Setup
bash
# 1. Clone the repository
git clone https://github.com/Yuvraj07anand/ENTNT_Dental.git
cd ENTNT_Dental

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
# 🧠 Architecture
The Entnt Dental App follows a clean, modular architecture promoting separation of concerns and maintainability.

🔹 1. Component-Based Frontend
React components organized by feature: appointments, patients, auth, shared, etc.

Each component is self-contained, managing its own UI and state.

Shared components like DataTable and FileUpload are reusable across features.

🔹 2. State Management
DataContext manages global entities like patients and appointments.

AuthContext handles authentication logic (login, logout, role control).

Context APIs provide scalable global state management without Redux.

🔹 3. Routing
Page navigation handled via React Router.

Routes protected using a custom ProtectedRoute component.

Role-based access control for Admin and Patient.

🔹 4. Data Persistence
All data (patients, appointments, attachments) is stored in localStorage.

Simulated CRUD operations without requiring backend infrastructure.

🔹 5. UI Layer
Built using Tailwind CSS for a responsive, utility-first design approach.

Consistent styling for tables, forms, and components.

# 🧪 Technical Decisions
React + Context API for State Management Chose Context API for simplicity and native support. AuthContext handles access control. DataContext deals with global data.

Component-Based File Structure Organized by domain features to ensure clarity and scalability.

Tailwind CSS Used for rapid prototyping and consistent design with minimal custom CSS.

React Router For client-side navigation with protected routes based on user roles.

LocalStorage Used as a mock backend to simulate real database operations.

File Upload Support Supports both image and PDF uploads, with modal previews for attachments.

Form Validation Inline validation includes checks for contact number format, required fields, and password strength.

# 🐞 Known Issues / Limitations
LocalStorage Limitations Not suitable for production or multi-user synchronization.

Missing Appointment History View Change logs or full history tracking not yet implemented.

No Real Database Integration Data persistence is limited to the local device.

Lack of JWT Authentication Simulated login without secure tokens; no session validation across browser sessions.