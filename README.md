# Issue Management System
A full-stack Issue Management Platform built using React, TypeScript, Express, PostgreSQL, Drizzle ORM, and Google Gemini AI.

## Features
-  create and manage issues
-  view a list of issues
-  comment system
-  searching and filtering
-  issue analysis using Gemini
-  swagger API documentation
## Live demo
### Frontend
-  https://issue-management-system-theta.vercel.app
### Backend API
-  https://issue-management-system-d0qm.onrender.com
### API Documentation
-  https://issue-management-system-d0qm.onrender.com/api-docs

## Technologies
### Frontend:
- React
- TypeScript
- Tailwind CSS
### Backend:
- Node.js
- TypeScript
- Express
- PostgreSQL
- Drizzle ORM
### AI:
- Google Gemini

## Setup instructions

### Backend:

- Install dependencies
    - cd backend
    - npm install 
- Environment variables
    - create a .env file inside backend and refer .env.example file
- Run migrations
    - npm run migrate
- Run development
    - npm run dev
- Build project
    - npm run build


### Frontend

- Install dependencies
    - cd frontend
    - npm install 
- Environment variables
    - create a .env file inside frontend and refer .env.example file
- Run development
    - npm run dev

### Database
- Open Neon DB
- Create project
- Create database
- Copy connection string
- Add the connection string to the DATABASE_URL environment variable.
- Run : npm run migrate
