\# Project Decisions



\## Frontend and Backend Separation



The application uses a React frontend and Node.js/Express backend so that business logic and database operations remain outside the frontend.



\## Dynamic Questions



Roofing questions are stored in MongoDB and retrieved through an API instead of being permanently hardcoded in the frontend.



\## MongoDB



MongoDB is used to store roofing questions and estimate history.



\## PDF Generation



jsPDF is used to generate downloadable roofing estimate PDFs.



\## Estimate History



Completed estimates are stored in MongoDB and displayed through the Estimate History page.



\## Pricing



Roofing pricing and estimate calculation are handled by the backend rather than relying on hardcoded pricing values in the frontend.



\## User Experience



The estimator uses a multi-step flow so users can provide roofing details one step at a time and receive a final estimated project cost.

