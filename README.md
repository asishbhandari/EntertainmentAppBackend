# Entertainment App API Capstone Project #

Welcome to the backend repository of our Entertainment App! This Express.js-based backend provides the server-side logic 
and APIs required to support the frontend functionality of our entertainment app. It handles user authentication, data fetching, 
and other backend operations.

## Features ##
`RESTful APIs:` Provides a set of RESTful APIs to serve data to the frontend client.  
`User Authentication:` Supports user authentication and authorization using JSON Web Tokens (JWT).


`Data Fetching:` Retrieves and serves entertainment content data including movies, TV shows, and more from the database.
`Database Integration:` Integrates with a database (e.g., MongoDB) to store and retrieve data.
`Middleware:` Utilizes middleware functions for request processing, error handling, and more.

## Technologies Used ##
`Express.js:` Fast, unopinionated, minimalist web framework for Node.js.
`MongoDB:` NoSQL database used for storing application data.
`Mongoose:` Elegant MongoDB object modeling for Node.js.
`JSON Web Tokens (JWT):` JSON-based open standard for creating access tokens.
`bcrypt:` Library for hashing passwords securely.
`dotenv:` Zero-dependency module that loads environment variables from a .env file.

## Endpoints ##

BaseUrl `https://entertainmentappbackend.onrender.com`

### User SignUp Request ###

GET `/v1/auth/signup`

stores user signup details in the database if it does not exits

### User Login Request ###

GET `/v1/auth/login`

validates and grants an access token to user for further request

### Get a single subscriber details ###

GET `/subscribers/:id`

Provide the id parameter.

Retrieve detailed information about a subscriber.
