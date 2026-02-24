# 🎬 FilmFinder

A modern **movie discovery mobile application** built with **Expo (React Native)** and **Firebase**, allowing users to explore trending movies, search by categories, manage watchlists, and personalize their movie experience.

> Built with a production-ready mindset, including a solution for geo-restricted APIs.

---

## 📱 Screenshots

| Home | Search | Profile |
|------|--------|---------|
| ![Home](./screenshots/home.png) | ![Search](./screenshots/search.png) | ![Profile](./screenshots/profile.png) |

> Dark-mode focused UI with smooth navigation and content-first design.

---

## ✨ Features

### 🎥 Movie Discovery
- Trending movies
- Popular movies
- Category-based browsing (Action, Adventure, Animation, Comedy, etc.)
- Trending people (actors, directors)

### 🔍 Search & Filters
- Search movies by title
- Filter by genres
- Fast and responsive search experience

### ❤️ Watchlist
- Save movies to personal watchlist
- Remove movies anytime
- Synced with Firebase for logged-in users

### 👤 User Profile
- Firebase Authentication
- User profile with saved movies and reviews
- Theme, language, and notification preferences

### 🌙 UI & UX
- Dark mode first design
- Smooth animations
- Bottom tab navigation
- Clean card-based layout

---

## 🧠 Tech Stack

### Frontend
- Expo (React Native)
- React Navigation
- Firebase Authentication
- Firebase Firestore

### Backend (Serverless)
- Firebase Cloud Functions

### API
- The Movie Database (TMDB)

---

## 🌍 TMDB Geo-Restriction Fix (No VPN Required)

### ❌ Problem
The TMDB API is **geo-restricted in India**, causing API calls to fail unless a VPN is enabled.

### ✅ Solution (Production-Ready)
Instead of calling TMDB directly from the client, the app uses **Firebase Cloud Functions as a proxy**.
