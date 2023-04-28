# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run start-api`

Launches the flask backend, which is responsible for fetching and cleaning data obtained from TFL API.

## FrontEnd Layout

This frontend is made up of the following components:

### `App.js`

This is the entry point. It contains the containers, the headers, inputs, and result box.

The contents of the result box are controlled by the following conditions:

#### 1. Original Message

The original message, before any PostCode is entered into the input form.

#### 3. No Bus Message

This message will show up, if no buses are found near the PostCode entered.

#### 4. Results

This is where the list of buses and their information are populated in the `BusList` component.

### `BusList`

This is a list of the stops, and their respective incoming buses. Each individual bus is made up of `BusBox` component.

### `BusBox`

This is an individual bus row. It contains the name, destination, and eta of the particular bus.

### `UseBus`

This is a react hook, which makes a call to the flask API whenever the user enters the PostCode, and returns the results. It also provides information on the loading state, and any errors arising from the API call.

## BackEnd Layout

The backend files are located in the `/api` folder. The entry point is `api.py`, with some utility functions located in `utils.py`.

The backend does four things:

### 1. Verification

It verifies the PostCode, returning an error if it is invalid

### 2. Finds Latitude and Longitude

If the PostCode is valid, it finds the latitude and longitude of the valid PostCode

### 3. Finds StopPoints

It finds the nearest two StopPoints given the latitude and longitude

### 4. Obtains Bus Information

It gets the incoming buses for each StopPoint
