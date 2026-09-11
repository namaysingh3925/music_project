# HMusic - Full Stack Music Streaming & Discovery Platform

A full-stack music streaming and discovery web application built with React, Node.js, Express, and MongoDB. HMusic offers real-time music search, artist discographies, audio preview streaming, personalized playlists, favorites management, and secure user authentication.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Music and Search](#music-and-search)
  - [Liked Songs](#liked-songs)
  - [Favorites](#favorites)
  - [Playlists](#playlists)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

HMusic is an end-to-end music application designed for seamless browsing, streaming, and playlist curation. The frontend provides a fast, responsive interface powered by React 19 and Vite. The backend REST API handles music catalog proxying, audio streaming, MongoDB persistence, and JWT authentication.

---

## Key Features

### Music Discovery and Streaming
- Real-time search across global music catalogs for tracks and artists.
- High-quality audio preview streaming with backend proxying and automated fallback handling.
- Artist detail pages with follower count, genres, top tracks, and discography.
- Persistent interactive audio player with play/pause, volume control, track scrubbing, and progress tracking.

### User Personalization and Library
- User Authentication: Secure registration and login using bcrypt password hashing and JSON Web Tokens (JWT).
- Liked Songs: Save and manage individual tracks with quick toggle actions.
- Favorite Artists: Follow artists and access quick shortcuts to their full catalog.
- Custom Playlists: Create, rename, view, and remove playlists, as well as add/remove songs dynamically.

### Curated Database and Seeding
- Pre-seeded trending artist database stored in MongoDB with high-resolution imagery.
- Spotify OAuth PKCE authentication integration for optional third-party profile linking.

---

## Tech Stack

### Frontend
- React 19
- Vite
- React Router v7
- React Context API (State management for Player, Auth, and Library)
- Vanilla CSS3 (Dark-themed, responsive layout)

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose ODM
- JSON Web Token (JWT)
- bcryptjs
- CORS & Dotenv

### External Services and APIs
- iTunes Search API (Catalog metadata and preview streams)
- Spotify Web API (OAuth token exchange via PKCE flow)

---

## Project Architecture

```
+----------------------------------------------------------------+
|                         React Frontend                         |
|  - React Router (Pages: Home, Search, Artist, Playlists, etc.) |
|  - Contexts: AuthContext, PlayerContext, LibraryContext        |
|  - Audio Player Component (HTML5 Audio API)                    |
+-------------------------------+--------------------------------+
                                |
                          HTTP / REST API
                                |
+-------------------------------v--------------------------------+
|                       Express.js Backend                       |
|  - Auth & JWT Middleware                                       |
|  - Music Catalog & Audio Proxy Routes                          |
|  - User Library & Playlist Controllers                         |
+-------------------------------+--------------------------------+
                                |
               +----------------+----------------+
               |                                 |
+--------------v---------------+  +--------------v---------------+
|           MongoDB            |  |    External Music APIs       |
|  - Users                     |  |  - iTunes Search Catalog     |
|  - Playlists                 |  |  - Audio Preview Streams     |
|  - Curated Artists           |  |  - Spotify OAuth             |
+------------------------------+  +------------------------------+
```

---

## Directory Structure

```
music_project/
├── project_vik/
│   ├── backend/
│   │   ├── data/                 # Seed data and mock assets
│   │   ├── middleware/           # Express authentication middleware
│   │   │   └── auth.js
│   │   ├── models/               # Mongoose schemas
│   │   │   ├── Artist.js
│   │   │   ├── Playlist.js
│   │   │   └── User.js
│   │   ├── routes/               # API route handlers
│   │   │   ├── auth.js
│   │   │   ├── favorites.js
│   │   │   ├── likedSongs.js
│   │   │   ├── music.js
│   │   │   ├── playlists.js
│   │   │   └── spotify.js
│   │   ├── utils/                # Helper scripts (artist seeder, etc.)
│   │   │   └── seedArtists.js
│   │   ├── .env                  # Backend environment configuration
│   │   ├── package.json
│   │   └── server.js             # Express server entry point
│   │
│   ├── src/
│   │   ├── assets/               # Static icons and graphics
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Player.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Searchbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SingerCard.jsx
│   │   │   └── TrackRow.jsx
│   │   ├── context/              # Context providers for global state
│   │   │   ├── AuthContext.jsx
│   │   │   ├── LibraryContext.jsx
│   │   │   └── PlayerContext.jsx
│   │   ├── Pages/                # Application page views
│   │   │   ├── aboutus.jsx
│   │   │   ├── Artist.jsx
│   │   │   ├── contact.jsx
│   │   │   ├── Favourites.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LikedSongs.jsx
│   │   │   ├── login.jsx
│   │   │   ├── MyPlaylist.jsx
│   │   │   ├── Search.jsx
│   │   │   └── sigin.jsx
│   │   ├── api.js                # API client wrapper
│   │   ├── App.css               # Global application styles
│   │   ├── App.jsx               # Route definitions and app shell
│   │   ├── index.css             # Base styles and resets
│   │   ├── main.jsx              # React DOM entry point
│   │   └── spotify.js            # Spotify integration helpers
│   │
│   ├── public/                   # Public assets
│   ├── .env                      # Frontend environment configuration
│   ├── index.html                # HTML template
│   ├── package.json
│   └── vite.config.js            # Vite build configuration
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher) or yarn
- MongoDB (Running locally on `mongodb://127.0.0.1:27017` or via MongoDB Atlas connection URI)

---

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd project_vik/backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `project_vik/backend/` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/musicDB
   JWT_SECRET=your_jwt_secret_key_here
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_REDIRECT_URI=http://127.0.0.1:3000/
   ```

4. Start the backend development server:
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:5000`.

---

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd project_vik
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `project_vik/` root directory:
   ```env
   VITE_API_BASE=http://localhost:5000/api
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_REDIRECT_URI=http://127.0.0.1:3000/
   ```

4. Launch the frontend development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the URL displayed in the terminal) in your browser.

---

## Environment Variables

### Backend (`project_vik/backend/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port number for the Express server | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/musicDB` |
| `JWT_SECRET` | Secret key used to sign JWT auth tokens | `your_secret_key` |
| `VITE_SPOTIFY_CLIENT_ID` | Optional Spotify Client ID for OAuth flow | `your_spotify_client_id` |
| `VITE_REDIRECT_URI` | Redirect URL for Spotify authentication | `http://127.0.0.1:3000/` |

### Frontend (`project_vik/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_BASE` | Base URL of the backend API | `http://localhost:5000/api` |
| `VITE_SPOTIFY_CLIENT_ID` | Spotify Client ID for OAuth login | `your_spotify_client_id` |
| `VITE_REDIRECT_URI` | Callback URL for Spotify authentication | `http://127.0.0.1:3000/` |

---

## API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user account | No |
| `POST` | `/api/auth/login` | Log in and receive JWT token | No |
| `GET` | `/api/auth/me` | Fetch profile of current logged-in user | Yes (Bearer Token) |

### Music and Search

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/music/artists/trending` | Get list of curated/trending artists | No |
| `GET` | `/api/music/artists/local-search?q=` | Search stored artists in database | No |
| `GET` | `/api/music/search?q=` | Search both artists and tracks | No |
| `GET` | `/api/music/artist-search?q=` | Find top artist match by query name | No |
| `GET` | `/api/music/artist/:id` | Get details and genres of specific artist | No |
| `GET` | `/api/music/artist/:id/top?limit=10` | Retrieve top tracks for an artist | No |
| `GET` | `/api/music/audio?url=` | Audio proxy stream for track previews | No |

### Liked Songs

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/liked-songs` | Get all liked songs for the current user | Yes |
| `POST` | `/api/liked-songs` | Add a track to liked songs | Yes |
| `DELETE` | `/api/liked-songs/:trackId` | Remove a track from liked songs | Yes |

### Favorites

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/favorites` | Get all favorite artists | Yes |
| `POST` | `/api/favorites` | Add an artist to favorites | Yes |
| `DELETE` | `/api/favorites/:name` | Remove an artist from favorites | Yes |

### Playlists

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/playlists` | List all user playlists | Yes |
| `GET` | `/api/playlists/:id` | Retrieve single playlist by ID | Yes |
| `POST` | `/api/playlists` | Create a new playlist | Yes |
| `DELETE` | `/api/playlists/:id` | Delete a playlist | Yes |
| `POST` | `/api/playlists/:id/tracks` | Add a track to a playlist | Yes |
| `DELETE` | `/api/playlists/:id/tracks/:trackId` | Remove a track from a playlist | Yes |

---

## Available Scripts

### Frontend (`project_vik/`)
- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and bundles production assets into `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.

### Backend (`project_vik/backend/`)
- `npm start`: Starts the Express server with `nodemon` for auto-reloading during development.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add your feature description"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a Pull Request.

---

## License

This project is licensed under the ISC License. Feel free to modify and use it for your own personal or educational projects.
