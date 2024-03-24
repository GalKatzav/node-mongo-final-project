# node-mongo-final-project - Personal Task Manager API

final project in mongo DB and node js

```sh
npm init -y
```

add packages we need:

```sh
npm i express mongoose bcrypt jsonwebtoken
```

install nodemon in devDependencies

```sh
npm i -D nodemon
```

in development environment

```sh
npm run dev
```

This project is the culmination of a Node.js and MongoDB course, aimed at building a robust personal task manager API. The API serves as the backbone for a task management application, facilitating CRUD operations (Create, Read, Update, Delete) on tasks.

## Features

- User Authentication: The API ensures security using JSON Web Tokens (JWT) by incorporating registration and login functionalities.
- MongoDB Integration: MongoDB is seamlessly integrated into the system using Mongoose, a popular ODM (Object Data Modeling) library for MongoDB and Node.js. Mongoose simplifies the process of defining schemas and interacting with MongoDB.
- Schema Design: Each database is meticulously designed with relevant fields to ensure a correct schema structure, optimizing data storage and retrieval.
- Database Connection: To access the MongoDB database, connect to MongoDB Compass using the following connection string:
  mongodb://localhost:27017

## Usage

To get started with this API:

1. Clone this repository.
2. Install all the models listed above.
3. Connect to your MongoDB instance.
4. Run the application using npm start.
5. Access the API endpoints to manage tasks.

## API Endpoints

### USER API ENDPOINTS

This section outlines the API endpoints for user-related operations in the node-mongo-final-project.

- Route: /users

1. GET /users

   - Description: Retrieve all users from the database.
   - Request Type: GET
   - Response: JSON array containing all users.
   - Example Endpoint: /users

2. GET /users/:id

   - Description: Retrieve a specific user by their ID.
   - Request Type: GET
   - Parameters:
     - id: User ID
   - Response: JSON object representing the user.
   - Example Endpoint: /users/:id

3. POST /users

   - Description: Create a new user.
   - Request Type: POST
   - Request Body: JSON object containing user data (name, email, password).
   - Response: Status code 201 (Created) if successful.
   - Example Endpoint: /users

4. POST /users/login

   - Description: Authenticate user login.
   - Request Type: POST
   - Request Body: JSON object containing user email and password.
   - Response: JSON object containing a JWT token if authentication succeeds.
   - Example Endpoint: /users/login

5. POST /users/whoami

   - Description: Retrieve the name of the currently logged-in user.
   - Request Type: POST
   - Authorization Header: Bearer token containing the user's JWT token.
   - Response: User's name.
   - Example Endpoint: /users/whoami

6. DELETE /users/:id

   - Description: Delete a user by their ID.
   - Request Type: DELETE
   - Parameters:
     - id: User ID
   - Response: Message confirming the deletion of the user.
   - Example Endpoint: /users/:id

7. PATCH /users
   - Description: Update the name of the currently logged-in user.
   - Request Type: PATCH
   - Authorization Header: Bearer token containing the user's JWT token.
   - Request Body: JSON object containing the updated user name.
   - Response: Message confirming the update.
   - Example Endpoint: /users

Additional Notes:

- Ensure proper authentication by including a valid JWT token in the request headers for protected routes.
- Customize routes and request/response handling as needed based on project requirements.

### TASK API ENDPOINTS

This section outlines the API endpoints for task-related operations in the node-mongo-final-project.

- Route: /tasks

1. GET /tasks

   - Description: Retrieve all tasks from the database.
   - Request Type: GET
   - Response: JSON array containing all tasks.
   - Example Endpoint: /tasks

2. POST /tasks

   - Description: Create a new task.
   - Request Type: POST
   - Request Body: JSON object containing task data (title, userID).
   - Response: Status code 201 (Created) if successful.
   - Example Endpoint: /tasks

3. DELETE /tasks/:id

   - Description: Delete a task by its ID.
   - Request Type: DELETE
   - Parameters:
     - id: Task ID
   - Response: Message confirming the deletion of the task.
   - Example Endpoint: /tasks/:id

4. PATCH /tasks/:id

   - Description: Update the title of a task.
   - Request Type: PATCH
   - Parameters:
     - id: Task ID
   - Authorization Header: Bearer token containing the user's JWT token.
   - Request Body: JSON object containing the updated task title.
   - Response: Message confirming the update.
   - Example Endpoint: /tasks/:id

   Additional Notes:

   - Ensure proper authentication by including a valid JWT token in the request headers for protected routes.
   - Customize routes and request/response handling as needed based on project requirements.

### CATEGORY API ENDPOINTS

This section outlines the API endpoints for category-related operations in the node-mongo-final-project.

- Route: /categories

1. GET /categories

   - Description: Retrieve all categories from the database.
   - Request Type: GET
   - Response: JSON array containing all categories.
   - Example Endpoint: /categories

2. POST /categories

   - Description: Create a new category.
   - Request Type: POST
   - Request Body: JSON object containing category data (name, userID).
   - Response: Status code 201 (Created) if successful.
   - Example Endpoint: /categories

3. DELETE /categories/:id

   - Description: Delete a category by its ID.
   - Request Type: DELETE
   - Parameters:
     - id: Category ID
   - Response: Message confirming the deletion of the category.
   - Example Endpoint: /categories/:id

4. PATCH /categories/:id

   - Description: Update the name of a category.
   - Request Type: PATCH
   - Parameters:
     - id: Category ID
   - Authorization Header: Bearer token containing the user's JWT token.
   - Request Body: JSON object containing the updated category name.
   - Response: Message confirming the update.
   - Example Endpoint: /categories/:id

   Additional Notes:

   - Ensure proper authentication by including a valid JWT token in the request headers for protected routes.
   - Customize routes and request/response handling as needed based on project requirements.

## Technologies Used

- Node.js
- MongoDB
- Mongoose
- Express
- JSON Web Tokens (JWT)

### JWT Authentication Middleware

This middleware function is designed to authenticate incoming requests using JSON Web Tokens (JWT) in a Node.js application integrated with MongoDB. It ensures that only authorized users can access protected routes by verifying the validity of the JWT token attached to the request headers.

#### Functionality

- The middleware extracts the JWT token from the `Authorization` header of the incoming request.
- If no authorization header is found, it returns a `400 Bad Request` error with the message "no authorization header".
- If a token is present but not provided correctly, it returns a `400 Bad Request` error with the message "no token".
- Upon successful extraction of the token, it attempts to verify the token's authenticity using the secret key "123".
- If the token is valid, the authenticated user's data extracted from the token is attached to the `req.user` object for further processing in subsequent middleware or route handlers.
- If the token is invalid or expired, it returns a `400 Bad Request` error with the message "bad token".

#### Usage

This middleware can be used to protect routes that require authentication. It should be applied to the routes that need to verify the identity of the user.

#### Notes

- Ensure that the JWT secret key used for signing and verifying tokens is securely stored and not exposed in the code.
- Customize the error messages and handling as per the application's requirements.
- Adjust the middleware usage according to the application's route structure and authentication needs.
