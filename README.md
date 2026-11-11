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
- Recharts (bar chart) and lodash (`groupBy`, `sumBy`)
- React Router
- Day.js for date formatting
- Plain `fetch` for API calls
- Vitest and React Testing Library for tests

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
npm test         # run the tests (press q to quit)
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
  utils/        formatting helpers (dates, names), statistics
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

### Part 4: Statistics

- **Statistics page**: bar chart (Recharts) of the total training minutes per activity, largest first
- Totals are calculated with lodash: `groupBy` groups the trainings by activity and `sumBy` adds up their durations (`src/utils/statistics.ts`)
- Each bar shows its total on top, and hovering a bar shows a tooltip

## Extra features

### Tests (Vitest + React Testing Library)

The app has automated tests written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Each test file sits next to the file it tests (`*.test.ts` / `*.test.tsx`).

| Test file | What it checks |
| --- | --- |
| `utils/formatters.test.ts` | Dates are shown as `DD.MM.YYYY HH:mm`, full names are joined correctly, missing values give an empty string |
| `utils/statistics.test.ts` | Minutes are added up per activity and sorted biggest first |
| `components/ConfirmDialog.test.tsx` | The dialog shows its text, "Yes" confirms and "No" cancels |
| `components/AddCustomer.test.tsx` | The form opens, and Save stays disabled until first and last name are filled in |
| `utils/activityColors.test.ts` | Every activity gets its own color, the same activity always gets the same color |
| `utils/trainingForm.test.ts` | The training form is only valid when it is filled in, and it is turned into the right body for the API |

Run them with `npm test`.

### Calendar improvements

- **Add a training from the calendar**: click an empty time slot (or a day in the month view) to open the "New Training" dialog. The date and time are already filled in (09:00 in the month view), and the customer is picked from a list.
- **Training details**: click a training to see the customer, the time and the duration. The dialog has a **Delete** button with a Yes/No confirmation.
- **Colors per activity**: every activity has its own color, and a legend above the calendar shows which color belongs to which activity (`src/utils/activityColors.ts`).
- The date, activity and duration fields are shared by both "New Training" dialogs (`TrainingForm`, like `CustomerForm`).
