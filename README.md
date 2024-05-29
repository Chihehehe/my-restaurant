# Delivery Service App

## Description

This is a comprehensive delivery service application with two main interfaces: one for customers and one for restaurants. The backend handles API requests and database interactions.

## Repository Structure

- **backend/**: Contains the backend server code.
- **customer/**: Contains the customer site frontend code.
- **restaurant/**: Contains the restaurant site frontend code.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14.x or later)
- npm (version 6.x or later) or yarn (version 1.22.x or later)
- MySQL server
- MySQL Workbench (for database management)

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

3. Set up your MySQL database and configure the connection in the `index.js` file which is already in 'backend' folder. To set up MySQL database, scroll to the end of this file


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

4. Log in with the following credentials:
    - **Username**: `khanhlinhng114@gmail.com`
    - **Password**: `110404`

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
3. Open your browser and navigate to `http://localhost:3001/110`.

## Browser Compatibility

This application is compatible with the following browsers:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari (latest version)

## Dependencies

### Backend

The major dependencies for the backend are:
- **Express**: `^4.x`
- **MySQL**: `^2.x`
- **cors**: `^2.x`

### Customer Site

The major dependencies for the customer site are:
- **React**: `^17.x`
- **Axios**: `^0.21.x`
- **Ant Design**: `^4.x`
- **React Router DOM**: `^5.x`

### Restaurant Site

The major dependencies for the restaurant site are:
- **React**: `^17.x`
- **Axios**: `^0.21.x`
- **Ant Design**: `^4.x`
- **React Router DOM**: `^5.x`

## Database Setup

### Exporting the Database

1. Open MySQL Workbench and connect to your database.
2. Select the database you want to export from the left-hand side panel.
3. Go to `Server` in the menu and select `Data Export`.
4. In the `Data Export` tab:
   - Select the database and tables you want to export.
   - Choose `Export to Self-Contained File`.
   - Specify the path and filename for the SQL dump file (e.g., `delivery_service_dump.sql`).
   - Click `Start Export`.

### Importing the Database

1. The SQL dump file (`delivery_service_dump.sql`) is in our repository.
2. You should open MySQL Workbench and connect to our MySQL server.
3. Create a new database (schema):
   - Go to `Server` in the menu and select `Data Import`.
   - Choose the `Import from Self-Contained File` option.
   - Select the SQL dump file.
   - Select or create a new schema where the data should be imported.
   - Click `Start Import`.

##  Contact
If you have any questions or suggestions, please open an issue or contact the repository owner.

