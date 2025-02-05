# Backend Repository

This repository contains the backend service for Technical test in EBuddy. It's built using Node.js, Express, and TypeScript, and leverages Firebase for Cloud Database using firestore.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## Technologies Used

- Node.js (v20.15.1)
- Express.js (^4.21.2)
- TypeScript (^5.7.3)
- Firebase (Firestore)

## Project Structure

Project Structure

```bash
backend-repo/
├── config/ # Configuration files
├── controllers/ # Route handlers and business logic
├── middleware/ # Middleware functions (authentication, authorization, etc.)
├── repository/ # Data access logic (database interactions)
├── routes/ # API routes definitions
├── utils/ # Utility functions
├── models/ # Data models or interfaces (if applicable)
├── index.ts # Main application file
├── .env # Environment variables (NOT COMMITTED)
├── .gitignore # Files to ignore in version control
├── package.json # Project dependencies
├── tsconfig.json # TypeScript compiler configuration
└── README.md # This file
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/marcel-maruli/backend-repo.git](https://www.google.com/search?q=https://github.com/marcel-maruli/backend-repo.git)  # Replace with your actual repo URL
   cd backend-repo
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Configuration

Create `.env` file inside the repository, and copy this code below.

### ENV

```bash
PORT=3210
NODE_ENV="development"

JWT_TOKEN_SECRET_KEY="e159543d1a56f5d45ac58e1179a55c445a75a2f12d62ff59e41472b60c92455d69af77f348616756193ff20f3d584b76be8b6dd152d3f8b9c9d51efb378e8887e3bf32401aa49405e367cabc0f99f074cd27e23cf0685f28e191f587a653d40fdc6f0d65ee8c47d2eb2f1d383b7c5277fd20568fefada86e9bb62436d3975301caec9b0b6b61ba97117b39212a017ab72ab7833e8d55eff8842eb3b0fce32888cc2bf83d5bb23471b71ba666325f9bdcf314634890d01d75726766e0114d1ae55021379d182de8a6a86cfbc52a5c3f4eb6d0ba563ac3f2e22f7e1c405f9e8aae6347ba27ba7fe1c7ec1eadc10691d687352ad568b52d99cc6e96b7ca8042775d"

FIREBASE_API_KEY="AIzaSyCSvoLRgWrWV2MDnUilmcXd202omM2K7FI"
FIREBASE_AUTH_DOMAIN="backend-repo-7557f.firebaseapp.com"
FIREBASE_PROJECT_ID="backend-repo-7557f"
FIREBASE_STORAGE_BUCKET="backend-repo-7557f.firebasestorage.app"
FIREBASE_MESSAGING_SENDER_ID="379837645041"
FIREBASE_APP_ID="1:379837645041:web:ebd0ff458f7b4bb1bc2950"

# Service Account
FIREBASE_SERVICE_ACCOUNT_TYPE="service_account"
FIREBASE_SERVICE_ACCOUNT_PROJECT_ID="backend-repo-7557f"
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID="deacdbbd3891e826aadd5d548d962a91d63f6e56"
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCjvCPx6Y4kae2e\nU2MZEvm2b3B9Jk+G3FeS2d7Xwo7LHoJbbgwsyQvXuSYUQxhwiXGDQZt/8o6/2RN4\ndTTkV2u7142IxQFtrygKU4vKJj8HrigV5PZpA0iYtRDlHDZjJuXzydbwM/szLPpC\nsKvwRddPKtXzGrOfbW6gWwT8NKsmsZTqfiabcrqDPN91SmM34f9y814T/tU+DMK2\n0QiPwSHCo8IN+RI5akgTh49+AjNuB6lAEeqOZVulrnSL3NmukK5WqtofXDfxpZ+/\nKq1mKf0ez/rRtpb6SvAduS1rzSKc+IjOYfr/X+2ptZMJmNAajdlRfQeWkDBPemTQ\ne8NjC4UZAgMBAAECgf9AarPmGkVR7Mow6bPhGNNG+LJOdC3VjYGvB43hz1YQiHBG\nW8ggiJ9HGNjzFKpAesdU4gYOSuqbphQIgkDBwblNdgB2LTg7sagJiWWzEZCkZDOv\nBUmpuQq63QcyU9Z2FZptuQu7JvsL08IGAGWkzod9Hgm1XefHqmHhLyW2QFBNO6xs\nGJWTIDr0Fq+aejj0CtFuUDVYuvqdOyyZiKNqgYj3pt1m6A+alhQnopAyUYt7aESJ\nbvaJer6aH843+qmxPxzROqtril1nz7+V9rtxq5rgxe0PgAWiaphCn0eHUOQPgjbM\nL2FK5TSuoQyDynrrzoXqP6PvICtW1PJu5V+lhvkCgYEA0NdgTmYUl5ana8+oWS4t\nh0p95XOdwhwnzQX4uVVADFezBosRLSK1Jp7uKU3YxaoN9ETQTKthFnwB9eekKajA\nKpsMQx64KzJPKj4IWCFVk7VKdAiC9wYamxsPh1J6YCvikw1A/gwiKWtyhIkRx60f\n0pJ0HcAYGRuv6lEIiTG3HPUCgYEAyLVFK4rPvZq2hvDAmJuuTyvTtwu7JJn70iYt\nS6du6xqtFXEIF7th5Ll1CgHv2LHq+1qA1GOFoGdlgUBCKUKMxP5UI2oyqLS466BB\noN89txbkdOtC4vf+BPAZDd9y9Rfv9trNitk78oQxgYKlxJZAv3SFwtwz3P8vQYTE\nVieGcRUCgYA69kPbfpibv84e8y79lrsF8nMfAAhvUFGwYdo6QSZnFa+WzlaYHq90\navSktrTYAc4UxATnUI+FsJdBHRhNJraykLnijV7D211ceM0UTL0DifCuV+TZ52BF\noFs/AntIgbtjdx99WmGevhZD8wsRDADrC6w65gwnsph1GFHHokCnrQKBgQC4iPHv\n9tDKI1Vu/CwYJAs//6vIwKBwJqPBtBgxVuBEiWJaNHKcX0zCX0Gc0esT8YF7WNra\nbCaQNIC/NbWe+fEzriLt7NZnBsJ+4fl1T8wOap3iYew9goWrRJXEi43Gixu2e7Y/\n0zuq3qAl01lWRk+BuEDDyHJm3rk0JD3geLbDgQKBgGiLauDJy0U78k8+jldGAsPo\n7a0jHrisywz6+ik+c5S5rTy8C95i9Y3MjJWmAe5xjrZfJRwOKFoZZa1gRjp8RtBn\nIWd8pPDPJIHev6F3xyU/Fp3QzccyEUH1qwaXTFS1sZs9NR7e8eiOqaN5vuMmDGd/\nObNtjBkhQmdFBG4ZegaO\n-----END PRIVATE KEY-----\n"
FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL="firebase-adminsdk-fbsvc@backend-repo-7557f.iam.gserviceaccount.com"
FIREBASE_SERVICE_ACCOUNT_CLIENT_ID="101527563904756186409"
FIREBASE_SERVICE_ACCOUNT_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
FIREBASE_SERVICE_ACCOUNT_TOKEN_URI="https://oauth2.googleapis.com/token"
FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40backend-repo-7557f.iam.gserviceaccount.com"
FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN="googleapis.com"
```

## Running the Application

```bash
  npm run start
```

## API Documentation

This project's API is documented using Postman. You can view and interact with the API documentation by clicking the link below:

[Postman Collection Link](https://planetary-comet-917663.postman.co/workspace/93988824-e6b5-4ea5-84a8-e624645ae20c/documentation/15905965-27ba4354-4c4f-4b4e-b5cf-61a865ed1c13)
