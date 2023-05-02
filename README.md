# Zero to Hero

This project consists of a React frontend and a Flask backend.

## Setup

### Flask Backend

#### Step 1: Set up virtual environment

In the project folder, run the command `python -m venv venv`. This create a venv folder in the project directory.

#### Step 2: Start virtual environment

In the project folder, run the command `venv/Scripts/activate`. This will start the venv, and you will see your terminal has a green "(venv)" appended to the start of each line.

#### Step 3: Install Python Dependencies

While the venv is running, run the command `pip install -r requirements.txt`. This will install all the dependencies needed to run the flask backend.

#### Step 4: Run the Flask Backend

Run the command `npm run start-api`. This will start the flask backend. You will need to have installed 'npm' and 'node' for this to work (see below for instructions). Test if the backend is running by making a Get Request (via Postman) to "http://127.0.0.1:5000/healtcheck".

### React Frontend

#### Step 1: Make sure npm and node are installed.

Install npm and node LTS @ https://nodejs.org/en/download.

#### Step 2: Install node modules

In the project folder, run the command `npm install`. This will download all the correct node packages

#### Step 3: Run the React Frontend

Run the command `npm run start`. This will start the server on localhost:3000. Check if the server is running by visiting 'http://localhost:3000/' on any browser.

Any changes to your frontend code will be automatically reflected in the browser.

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

### `StopLidy`

This is a list of the stops, and their respective incoming buses. Each individual bus is made up of `BusBox` component.

### `BusBox`

This is an individual bus row. It contains the name, destination, and eta of the particular bus.

### `UseBus`

This is a react hook, which makes a call to the flask API whenever the user enters the PostCode, and returns the results. It also provides information on the loading state, and any errors arising from the API call.

## BackEnd Layout

The backend files are located in the `/api` folder. The entry point is `api.py`, with some utility functions located in `utils.py`.

The backend does four things:

### 1. Verification

It verifies the PostCode, returning an error if it is invalid.

### 2. Finds Latitude and Longitude

If the PostCode is valid, it finds the latitude and longitude of the valid PostCode.

### 3. Finds StopPoints

It finds the nearest two StopPoints given the latitude and longitude.

### 4. Obtains Bus Information

It gets the incoming buses for each StopPoint.
