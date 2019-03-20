# goshop

This is a very simple e-commercial application is written in React and Node JS.

## 1. Features
- List all products with pagination
- Filter by department, category, color, size, price with pagination
- Search products by text
- Show details of a specific product by clicking on it
- Add / remove to cart, show shopping cart information by clicking on cart icon on header
- Go to checkout page from shopping cart page
- Fill form, place an order and send email to customer
- Register / Login / logout with custom form

## 2. Using technologies
### 2.1 Client side - React
- Axios to handle HTTP requests to server
- Debounce-promise to delay text search request after waiting 500 ms to prevent too many accesses to server
- Materialize-css for making layout faster and easier
- Redux, react-redux to do store management and connect react to redux
- React-router-dom
- React-stripe-elements to support stripe implementation
- Redux-form to handle form easier
- Redux-thunk, a middleware to handle asynchronous actions in redux
- React-scripts to handle test, run, build react application
- Shopping cart will be saved in localstorage in order to keep cart information available everytime user comeback to the site. Only delete when place an order successfully.

### 2.2 Server side - NodeJS
- Bcrypt to encrypt and check valid customer's password
- Cookie-session to save session data on the client within cookie when authorization
- Express a simple framework to build a node server
- Mongoose, an object modeling tool for MongoDB
- Nodemailer to handle sending mail
- Passport, passport-local to handle authorization
- Stripe to purchase

## 3. TODO features
- Test main functions
- Redis to cache result of departments, attributes, shippingregions in order to avoid access to DB to much
