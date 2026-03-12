# VehiclesDisplayer

A lightweight Angular application that allows users to explore vehicle brands, search by various criteria, and view detailed information about each brand.

Features include:

- Brand catalog with searchable listings
- Ability to filter brands by name or ID
- Detailed brand pages showing available vehicle types and models
- Uses NgRx for state management and Playwright/Vitest for tests
- Build and deploy workflow for Github Actions

## Possible improvements

- Internationalization: There are multiple options to make the application multilanguage, such as _@angular/localize_ and _ngx-translate_
- Better UI: The API is simple and provides mostly names and ids. The design could be improved if there were images for instance.
- I was not able to find details about errors or how to "consider" then in the API so the error handling is rudimentary. Just a snackbar when something happens
- A custom table has been used instead of an Angular Material one. It produced unintended behaviours when paired with Angular CDK VirtualScroll. With more time a solution could be found.
- Information about pagination, sorting, filtering was not found. Pagination is a great match for Angular Material tables.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Setup

Install dependencies with:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
npm run test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
npm run e2e
```

> [!IMPORTANT]
> e2e tests depend currently on the API. If the results provided change, they'll be broken. In a real situation we would have an instance of the Backend so we get predictable results

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
