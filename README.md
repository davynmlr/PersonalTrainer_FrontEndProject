# Personal Trainer

React front end for a personal trainer company's customer database: customers and their trainings, using the course's existing REST API.

Final project for the Front End Programming course at Haaga-Helia.

## Tech stack

- Vite + React + TypeScript (strict)
- Material UI and MUI icons
- MUI X DataGrid (sorting, filtering, search, pagination)
- React Router
- Day.js for date formatting
- Plain `fetch` for API calls

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

Other scripts:

```bash
npm run build    # type-check and build for production
npm run lint     # run ESLint
npm run preview  # serve the production build
```

### API URL

The API base URL is read from `VITE_API_URL` in `.env`:

```
VITE_API_URL=https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api
```

If the variable is missing, the same URL is used as a fallback (`src/api/config.ts`).

API docs: https://juhahinkula.github.io/personaltrainerdocs/

## Project structure

```
src/
  api/          fetch calls (customersApi, trainingsApi)
  types/        TypeScript types (Customer, Training)
  components/   CustomerList, TrainingList
  utils/        formatting helpers (dates, names)
  App.tsx       app bar with navigation
  main.tsx      routes
```

## Features

### Part 1: Customer and training lists

- App bar with navigation between **Customers** and **Trainings**
- Customer list: name, address, postcode, city, email, phone
- Training list: date, activity, duration and customer name
- Dates shown as `DD.MM.YYYY HH:mm`
- Sort by clicking any column header (dates sort chronologically)
- Search across all columns from the toolbar, plus per-column filters
- Pagination, column visibility, and CSV export from the table toolbar
- Loading indicator while data loads, error message in a snackbar
