# Recursive Tree File Explorer

A full-stack recursive file explorer built with Vue 3, Vite, Express, and MongoDB. It demonstrates nested data structures, recursive rendering, and lazy-loaded folder expansion with a clean split-pane UI.

## Features

- Recursive tree navigation with unlimited nesting of files and folders.
- Lazy loading for folder contents so child items are fetched only when a folder is expanded.
- Root-level file and folder creation from the sidebar controls.
- Item details panel for inspecting the selected file or folder.
- MongoDB-backed hierarchy using a self-referencing `parentId` field.

## Tech Stack

- Frontend: Vue 3, Vite, Pinia, Axios
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Project Structure

```text
Recursive Tree File Explorer/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── dto/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── services/
        ├── store/
        ├── App.vue
        └── main.js
```

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- MongoDB Atlas or a local MongoDB instance

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Optional: seed the database with sample data before starting the server.

```bash
npm run seed
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## How It Works

- The frontend loads root items from `GET /api/files` when the app mounts.
- Expanding a folder triggers `GET /api/files?parentId=<folderId>` the first time only.
- The backend reads matching documents from MongoDB using the recursive `parentId` relationship.
- The tree renders itself through a recursive `TreeItem` component.
- Selecting an item updates the detail view with the current file or folder metadata.

## API Endpoints

- `GET /api/files` - list root items or children by `parentId`
- `GET /api/files/:id` - fetch a single item by id
- `POST /api/files/add` - create a file or folder
- `DELETE /api/files/:id` - delete an item
- `GET /api/files/tranform/:id` - transform and update child positions

## Notes

- Folder nodes are loaded on demand to keep the tree responsive.
- Items use a single schema with `type` set to either `file` or `folder`.
- The current UI is optimized for local development, with the backend running on port `5000` by default.

## License

No license has been specified for this project yet.