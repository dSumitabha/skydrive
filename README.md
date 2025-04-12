# File Management App (Cloud Drive Clone)

A modern cloud-drive-inspired file and folder management app built with **Next.js**, featuring JWT-based authentication, file upload/download, nested folder navigation, and an advanced UI.

---

## Features

- User Authentication (JWT + Cookie-based)
- Nested Folder Structure with unlimited depth
- File Upload, View, Download & Delete
- Parent-Child Folder Handling
- RESTful APIs for CRUD operations
- Local Disk File Storage (organized per user)
- Dynamic Routing using `[...slug]` for deep folder navigation
- Modern UX with real-time feedback and reload-free interactions

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Backend**: Node.js + MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Storage**: Local file system under `/storage/[userId]/`
- **Styling**: TailwindCSS, React Icons

---

## Folder Structure