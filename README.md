# Firebase Queue Performance Tests

Some performance tests for Firebase Queue

## Requirements

- Node >= 6.2.2

## Installation

1. Install node dependencies

    ```bash
    npm install
    ```

2. Follow the [instructions to get Firebase credentials](https://firebase.google.com/docs/server/setup)

3. Create a `.fbqueuerc` and set `databaseURL` and `serviceAccount` (you may copy from `.fbqueuerc.example`)

## Usage

1. Start the Worker

    ```bash
    npm start
    ```

2. Populate data

    ```bash
    npm run populate
    ```
