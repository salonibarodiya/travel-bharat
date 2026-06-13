# 🗺️ Travel Bharat - Explore India State-by-State

Travel Bharat is a full-stack (MERN) web application built to help users explore the diverse cultural, historical, and natural beauty of India. The platform features an interactive state-by-state discovery model, an admin control panel for content management, dynamic categorization of locations, and real-time data persistence.

---

## 🚀 Live Deployments

The project is fully optimized, built, and continuously deployed using Vercel infrastructure. You can visit the live platform through the following endpoints:

*   **⚡ Production Domain:** [https://travel-bharat-3smts31nh-saloni-barodiya-s-projects.vercel.app](https://travel-bharat-3smts31nh-saloni-barodiya-s-projects.vercel.app)
*   **🔗 Aliased Custom Domain:** [https://travel-bharat-rho.vercel.app](https://travel-bharat-rho.vercel.app)

---

## ✨ Key Features

*   **State-Wise Exploration:** Browse popular Indian states (Madhya Pradesh, Goa, Karnataka, etc.) with custom images and curated highlights.
*   **Dynamic Destinations Panel:** Explore destination cards categorized systematically into **Heritage**, **Nature**, **Religious**, and **Modern** tourism.
*   **Robust Admin Dashboard:** A comprehensive, forms-driven control center allowing authenticated additions, updates, and deletion of active states and destinations.
*   **Smart Asset Management:** Configured to serve high-resolution static assets natively via the optimized client distribution pipeline.
*   **Responsive Layout:** Clean, intuitive UI tailored seamlessly for both desktop and mobile viewing environments.

---

## 🛠️ Tech Stack & Architecture

The application is structured as a decoupled monorepo configured for seamless orchestration:

*   **Frontend (Client):** React.js, Vite, Tailwind CSS / Vanilla CSS, React Router DOM (Dynamic SPA Client-side routing)
*   **Backend (Server):** Node.js, Express.js (RESTful APIs with robust route handling)
*   **Database:** MongoDB Atlas (Cloud database managing relational schemas for States and Places)
*   **Deployment & Hosting:** Vercel (Edge-networked serverless hosting using an optimized `rewrites` mapping framework)

---

## 📁 Project Structure

```text
travel-bharat/
├── client/                 # Frontend React SPA built with Vite
│   ├── public/             # Static assets (Pre-downloaded states/destinations images)
│   ├── src/                # Components, Pages, Layouts, and API connectors
│   └── package.json
├── server/                 # Backend Node/Express Server
│   ├── models/             # Mongoose Schemas (State.js, Destination.js)
│   ├── routes/             # REST API endpoints (/api/states, /api/destinations)
│   └── server.js           # Main entry point for serverless functions
├── vercel.json             # Root monorepo proxy and rewriting architecture
└── README.md
