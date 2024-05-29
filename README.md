# Delivery Service App

## Description

This is a comprehensive delivery service application that includes two main interfaces: one for customers and one for restaurants. The backend handles the API requests and database interactions.

## Repository Structure

- **backend/**: Contains the backend server code.
- **customer/**: Contains the customer site frontend code.
- **restaurant/**: Contains the restaurant site frontend code.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14.x or later)
- npm (version 6.x or later) or yarn (version 1.22.x or later)
- MySQL server

## Installation

### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Set up your MySQL database and configure the connection in the `index.js` file.

### Customer Site

1. Navigate to the `customer` directory:
    ```bash
    cd customer
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
    Or if you are using yarn:
    ```bash
    yarn install
    ```

### Restaurant Site

1. Navigate to the `restaurant` directory:
    ```bash
    cd restaurant
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
    Or if you are using yarn:
    ```bash
    yarn install
    ```

## Running the Application

### Backend

1. Start the backend server:
    ```bash
    npm start
    ```
2. The backend server should be running at `http://localhost:8800`.

### Customer Site

1. Navigate to the `customer` directory:
    ```bash
    cd customer
    ```
2. Start the development server:
    ```bash
    npm start
    ```
    Or if you are using yarn:
    ```bash
    yarn start
    ```
3. Open your browser and navigate to `http://localhost:3000`.

### Restaurant Site

1. Navigate to the `restaurant` directory:
    ```bash
    cd restaurant
    ```
2. Start the development server:
    ```bash
    npm start
    ```
    Or if you are using yarn:
    ```bash
    yarn start
    ```
3. Open your browser and navigate to `http://localhost:3001`.

## Browser Compatibility

This application is compatible with the following browsers:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari (latest version)

## Dependencies

### Backend

The major dependencies for the backend are:
- **Express**: `^4.17.1`
- **MySQL**: `^2.18.1`
- **body-parser**: `^1.19.0`
- **cors**: `^2.8.5`

### Customer Site

The major dependencies for the customer site are:
- **React**: `^17.0.2`
- **Axios**: `^0.21.1`
- **Ant Design**: `^4.15.6`
- **React Router DOM**: `^5.2.0`

### Restaurant Site

The major dependencies for the restaurant site are:
- **React**: `^17.0.2`
- **Axios**: `^0.21.1`
- **Ant Design**: `^4.15.6`
- **React Router DOM**: `^5.2.0`

## Backend Setup

Example backend setup (Express.js):
```bash
npm install express mysql
