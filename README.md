# 📊 Trading Visualization App

A full-stack Cryptocurrency Visualization application built with **React (Vite)**, **Node.js/Express**, and **MongoDB**.

It allows users to **register/login**, manage a **watchlist**, view **real-time market prices**, and fetch **OHLC (candlestick) data** from the [CoinGecko API](https://www.coingecko.com/en/api).


## Features

### **Frontend**

- User authentication (Register/Login/Logout)
- Dashboard with user profile
- Watchlist management (Add/Remove coins)
- Market price lookup
- Responsive TailwindCSS UI

### **Backend**

- JWT-based authentication
- User profile update
- Watchlist CRUD operations
- Real-time market polling with WebSocket support
- CoinGecko API integration for price & OHLC data
- Centralized error handling

## Tech Stack

**Frontend**

- React (Vite)
- React Router DOM
- Axios
- TailwindCSS

**Backend**

- Node.js / Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt.js for password hashing
- CoinGecko API for market data
