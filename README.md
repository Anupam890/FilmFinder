# 🎬 FilmFinder

A modern **movie discovery mobile application** built with **Expo (React Native)** and **Firebase**, allowing users to explore trending movies, search by categories, manage watchlists, and personalize their movie experience.

> Built with a production-ready mindset, including a solution for geo-restricted APIs.

---

## 📱 Screenshots

| Home | Search | Profile |
|------|--------|---------|
| ![Home](![WhatsApp Image 2026-02-25 at 1 21 57 AM](https://github.com/user-attachments/assets/7c32cc6c-52d7-4b51-92e2-dda43e169540)
) | ![Search]
![WhatsApp Image 2026-02-25 at 1 21 58 AM (1)](https://github.com/user-attachments/assets/fdd3a5d4-d764-4efd-b3de-0248cf9c0b65)  | ![Profile] |
![WhatsApp Image 2026-02-25 at 1 21 58 AM](https://github.com/user-attachments/assets/efb56e21-b64c-41d1-bcd4-c84e08b06e3d)

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
