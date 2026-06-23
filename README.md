# JobPilot

A full-stack job application tracker built with the MERN stack. Track every role you apply to, monitor your pipeline at a glance, and stay organized during your job search.

🔗 **[Live Demo](https://job-pilot-drab.vercel.app)** &nbsp;|&nbsp; 📁 **[GitHub](https://github.com/umarkazi24/JobPilot)**

---

## Features

- **Authentication** — Secure register/login flow with JWT tokens and bcrypt password hashing
- **Application Tracking** — Add, edit, and delete job applications with fields for company, position, status, salary, location, job URL, and notes
- **Status Management** — Track applications across six stages: Applied, Interview Scheduled, Interviewed, Offer, Rejected, and Withdrawn
- **Stats Dashboard** — At-a-glance summary cards (total applications, interviews, offers) with a live donut chart breaking down applications by status
- **Polished UX** — Toast notifications for every action, custom confirm modal for deletions, skeleton loading states, and inline form validation
- **Responsive Design** — Fully usable on mobile, tablet, and desktop

---

## Tech Stack

**Frontend**
- React (with React Router, Context API)
- Recharts (data visualization)
- CSS with custom design tokens (no UI library)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Screenshots
<img width="1887" height="715" alt="jobpilot-dashboard1" src="https://github.com/user-attachments/assets/a8a99c18-b956-4d69-ab0a-c484705d055a" />

<img width="1901" height="657" alt="jobpilot-dashboard2" src="https://github.com/user-attachments/assets/a878c135-5912-44ba-9b46-ee40bd5b2e75" />

<img width="1852" height="907" alt="jobpilot-application1" src="https://github.com/user-attachments/assets/89d90a15-de85-4bbd-828f-fbdb69725482" />



---

## Project Structure

JobPilot/

├── client/          # React frontend

│   ├── src/

│   │   ├── components/   # Navbar, ConfirmModal, Skeleton, StatsOverview

│   │   ├── context/      # AuthContext, ApplicationContext, ToastContext

│   │   ├── pages/        # Login, Register, Dashboard, AddApplication, EditApplication

│   │   └── utils/        # statusStyles, validation helpers

└── server/          # Express backend

├── controllers/  # authController, applicationController

├── middleware/   # JWT auth middleware

├── models/       # User, Application schemas

└── routes/       # auth, applications


---

## Author

Built by Umar Kazi— [GitHub](https://github.com/umarkazi24)
