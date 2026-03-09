A full-stack nested file/folder navigator built with the MEVN stack. This project demonstrates data recursion, lazy-loading, and self-referencing database schemas.

🚀 Features
Recursive Tree Structure: Unlimited nesting of files and folders.

Lazy Loading: Folder contents are fetched from the API only when expanded for the first time to optimize performance.

Contextual Creation: Create files or folders directly at the root or inside any specific folder.

VS Code Inspired UI: A clean, split-pane layout with metadata details on the right, as requested.

🛠️ Project Structure
Plaintext
file-explorer/
├── backend/
│   ├── config/          # DB Connection (db.js)
│   ├── controllers/     # Logic (fileController.js)
│   ├── models/          # Schema (File.js)
│   ├── routes/          # API Endpoints (fileRoutes.js)
│   ├── seed.js          # DB Seeding Script
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── components/  # TreeItem.vue (Recursive Component)
    │   ├── App.vue      # Main Layout & Details View
    │   └── main.js

Setup Instructions
1. Prerequisites
Node.js installed.

MongoDB Atlas account or local MongoDB instance.

2. Backend Setup
cd backend

npm install

Create a .env file and add your connection string:

Plaintext
MONGO_URI=your_mongodb_connection_string
PORT=5000
Seed the Database (Important): Run this to populate initial sample data before starting the server.

Bash
npm run seed
Start the Server:

Bash
npm start
3. Frontend Setup
cd frontend

npm install

Run the Development Server:

Bash
npm run dev

The project handles data between the Vue frontend and Node.js backend using the following flow:

Initial Load: On mounting App.vue, the frontend makes a GET request to /api/files. The backend returns items where parentId: null (Root items).

Lazy Loading Strategy: Each folder in the tree has a loadedOnce state. When a user clicks a folder:

If loadedOnce is false, an Axios request is sent to /api/files?parentId={folderId}.

The backend queries MongoDB for documents matching that specific parentId.

Once received, the frontend updates the children array and sets loadedOnce: true.

Recursive Rendering: The TreeItem component calls itself inside its own template to render nested children.