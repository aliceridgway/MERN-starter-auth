# MERN stack app

This React (create-react-app) on the front-end and an Express API on the backend. Front and back-ends are run on separate servers.

Communication between servers is done using http requests, with Axios used on the front-end.

## Front End: React

- Built with create-react-app
- Uses React Router
- Uses Axios for POST requests
- Accepts JSON web tokens (JWT) from the API and saves them to local storage.
- Uses React's Context API to detect whether a user is logged in.
- Allows logged in users to log out.
- Registration form provides visual feedback for invalid inputs
- Written using functional components and hooks.

## Backend: Node/Express/MongoDB

- Built with Express using a previous project as a starter (https://github.com/alicecampkin/NodeExpressStarter)
- Uses a Model, View, Controller (MVC) pattern (though View is redundant here)
- Communicates with a MongoDB database using Mongoose
- Validates user registration submissions before saving to the database
- Uses passport-local-mongoose to save new users to the database and provide a strategy to Passport. This automatically salts and hashes passwords and removes the need for the password to be included in the User schema.
- Uses Passport.js for authentication (local strategy)
- Issues a JSON web token following a successful login
- Includes some unit tests created with Mocha, Chai and Sinon

## To Do:

### Front-End
- Review of use of JSON web tokens. Storing them in local storage or cookies both result in vulnerabilities to Cross Site Scripting (XSS) attacks. What are the best practices for adding authentication to a React app?
- Implement refresh tokens.
- Testing, including mocking of API calls.


### Backend
- Social media-based authentication
- More tests
- Review of the API architecture. The View of MVC doesn't apply to this project. Is there a different software pattern that will result in a cleaner code-base?

