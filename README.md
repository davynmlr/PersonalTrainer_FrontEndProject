# Personal Trainer

React front end for a personal trainer company's customer database: customers and their trainings, using the course's existing REST API.

Final project for the Front End Programming course at Haaga-Helia.

**Live app:** https://davynmlr.github.io/PersonalTrainer_FrontEndProject/

## Tech stack

- Vite + React + TypeScript (strict)
- Material UI and MUI icons
- MUI X DataGrid (sorting, filtering, search, pagination)
- MUI X Date Pickers
- React Big Calendar
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

## Deployment

The app is deployed to GitHub Pages with GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` builds the app and publishes it.

- `vite.config.ts` sets `base` to `/PersonalTrainer_FrontEndProject/` for the production build, and the router uses the same path as its `basename`.
- The workflow copies `index.html` to `404.html`, so refreshing a page such as `/calendar` still opens the app.

## Project structure

```
src/
  api/          fetch calls (customersApi, trainingsApi)
  types/        TypeScript types (Customer, Training)
  components/   lists, add/edit dialogs, forms, confirm dialog
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

### Part 2: Add, edit and delete

- **Add customer**: "Add Customer" button above the list opens a form dialog
- **Edit customer**: pencil icon on each row opens the same form, filled in
- **Delete customer**: trash icon asks for Yes/No confirmation first, and warns that the customer's trainings are deleted too
- **Add training to a customer**: dumbbell icon on a customer row opens a dialog with a date and time picker (MUI X DateTimePicker), activity and duration
- **Delete training**: trash icon on the training list, with Yes/No confirmation
- Save is disabled until the required fields are filled in
- A snackbar confirms each action or shows the error

### Part 3: Export, calendar and deployment

- **Export CSV**: button above the customer list downloads `customers.csv` with all customers, even when a search or filter is active. The button column is left out of the file. The table toolbar's export uses the same settings.
- **Calendar page**: all trainings in a calendar (React Big Calendar) with month, week, day and agenda views. Each event shows "Activity / Customer name" and lasts as long as the training's duration. Weeks start on Monday, times are 24-hour.
- **Deployment**: GitHub Pages, see [Deployment](#deployment)
