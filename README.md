
# NodeJS_Tasks

This is a task to develop a REST API using Node.js, Express, and MongoDB, encompassing user registration, login, profile management, and rental car listings, with JWT authentication for secure access.

## Technologies Used

- Node.js: Platform for building backend applications in JavaScript.
- Express: Framework for developing web services and APIs.
- MongoDB: NoSQL database for storing data.
- JWT (JSON Web Token): Technology for user authentication and authorization.
- bcryptjs: For password hashing and encryption.
- dotenv: For managing environment variables.
- Git: For version control and pushing to GitHub.
- Postman: For testing the API endpoints during development.

# Project Setup

## Environment Variables

To set up the environment variables, follow these steps:

1. Create a `.env` file in the root directory of your project.
2. Add the following content to the `.env` file:

    ```
    MONGO_URI=mongodb://localhost:27017
    DB_NAME=carRental
    JWT_SECRET=j8wE4vKxL5mN9p2dX7ZrT0yYB1sC6aFJ3oVgMQPdHU
    ```

## How to Run the Project?

To run the project, use the following command in the terminal:
node server.js



## API Endpoints

### Register User

- **Endpoint:** `POST /api/register`
- **Description:** Registers a new user by accepting their full name, email, username, and password.
- **Request Body:**
  ```json
  {
     "fullName": "Alice Smith",
     "email": "alice.smith@example.com",
     "username": "alicesmith",
     "password": "password456"
  }
  ```

### Login User

- **Endpoint:** `POST /api/login`
- **Description:** Authenticates an existing user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "alicesmith",
    "password": "password456"
  }
  ```

### Get My Profile 

- **Endpoint:** `GET /api/my-profile`
- **Description:** Retrieves the profile details of the authenticated user.
- **Headers:**
  ```bash
  Authorization: Bearer jwt_token
  ```

### Get Available Rental Cars

- **Endpoint:** `GET /api/rental-cars`
- **Description:** Fetches a list of available rental cars, sorted by price from lowest to highest, with optional filters for year, color, steering type, and number of seats.
