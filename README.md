\# Northline Roofing Estimator



A full-stack roofing estimate application that allows users to answer roofing project questions and receive an estimated project cost.



\## Features



\- Multi-step roofing estimator

\- Dynamic questions loaded from the backend

\- Roofing cost estimation

\- MongoDB database integration

\- Estimate history

\- PDF estimate download

\- Owner pricing management

\- Responsive user interface



\## Tech Stack



\### Frontend

\- React

\- Vite

\- CSS

\- jsPDF



\### Backend

\- Node.js

\- Express.js

\- MongoDB

\- Mongoose



\## How to Run



\### Backend



```bash

cd server

node server.js



\# Project Decisions



\## Frontend and Backend Separation



The application uses a React frontend and Node.js/Express backend so that business logic and database operations remain outside the frontend.



\## Dynamic Questions



Roofing questions are stored in MongoDB and retrieved through an API instead of being permanently hardcoded in the frontend.



\## MongoDB



MongoDB was selected to store questions, pricing-related data, and estimate history.



\## PDF Generation



jsPDF is used on the frontend to generate downloadable roofing estimate PDFs.



\## Estimate History



Completed estimates are stored in MongoDB so users can view previous estimates.



\## Pricing



Roofing pricing is handled by the backend/owner configuration rather than relying on frontend pricing values.

