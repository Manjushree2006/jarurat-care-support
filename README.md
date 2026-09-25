# Jarurat Care – Healthcare Support Web App

## Project Overview

Jarurat Care is a full-stack healthcare support web application developed as part of the Full Stack Developer (AI-enabled) internship assignment.

The application provides a simple platform where patients and caregivers can request support, volunteers can register, and users can interact with an AI-powered assistant for common healthcare support and Jarurat Care related questions.

## Features

- Patient Support Request Form
- Volunteer Registration Form
- Firebase Firestore database
- AI-powered FAQ Assistant using Google Gemini
- Responsive healthcare-focused user interface
- Separate frontend and backend
- Cloud deployment using Vercel and Render

## AI Assistant

The application includes an AI-powered assistant that helps users with common questions related to:

- Patient support
- Caregiver support
- Volunteering
- Jarurat Care services
- General non-emergency healthcare support information

The AI assistant uses Google Gemini through a Node.js and Express backend.

The Gemini API key is stored securely as an environment variable on the backend and is not included in the source code.

## Technology Stack

### Frontend

- React
- JavaScript
- Vite
- CSS

### Backend

- Node.js
- Express.js
- Google Gemini API

### Database

- Firebase Firestore

### Deployment

- Vercel – Frontend
- Render – AI Backend
- GitHub – Source Code

## System Architecture

```text
                    User
                      |
                      v
             React Web Application
                  (Vercel)
                      |
          +-----------+-----------+
          |                       |
          v                       v
   Patient / Volunteer       AI Assistant
        Forms                     |
          |                       v
          v                Node.js + Express
   Firebase Firestore          (Render)
                                  |
                                  v
                            Google Gemini
                                  |
                                  v
                           AI Response