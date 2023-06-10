# CSE446-API-Project

### Supplier

#### This project will covers all the functionalities related to product supplier.

This is a [NodeJS](https://nodejs.org/en) project bootstrapped with [`node`](https://nodejs.org/en/docs/guides/getting-started-guide).

### System Requirements

1. [Node.js](https://nodejs.org/en/) 12.22.0 or later
2. [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
3. MacOS, Windows (including WSL), and Linux are supported

### Software Requirements

1. [MongoDB](https://www.mongodb.com/): A NoSQL database used for storing data

### Setup

First, install the dependencies for this project (Make sure you're in the `product-supplier` directory):

To change the directory to `product-supplier`,

```bash
cd product-supplier
```

```bash
yarn
# or
npm install
```

Then, run the development server:

```bash
yarn dev
# or
npm run start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see `Your server is running on port 4000!`..

### FAQ

To work with this project one must have prepare a environment file with following properties.
The file name should be `.env` and must contain in the `product-supplier` directory.

```
MONGODB_URI=mongodb+srv://<username>:<password>@graphql-demo.cew73.mongodb.net/product-supplier?retryWrites=true&w=majority
```

\*\*\* Replace `<username>` and `<password>` with your mongodb username and password respectfully.

You can get this `MONGODB_URI` from your mongodb atlas account. [Mongodb Atlas/](https://cloud.mongodb.com/).
To set the step by step setup for MongoDB, visit [MongoDB Setup](https://github.com/sadekujjaman/CSE446-API-Project/tree/develop/product-supplier/mongodb-setup)

To get more info:

1. [NodeJS Quick Start](https://nodejs.dev/en/learn/)
2. [Mongodb Atlas Quick Start](https://www.mongodb.com/docs/atlas/getting-started/)
3. [Mongodb](https://www.mongodb.com/docs/drivers/node/current/)

API routes can be accessed on [http://localhost:4000/api/v1/](http://localhost:4000/api/v1/). Those endpoints are available in `index.js`.

Here are some basic API routes:

1. GET - `http://localhost:4000/api/v1/products` - Get all the products from the database
2. GET - `http://localhost:4000/api/v1/product/:id` - Get a specific product with the given id
3. POST - `http://localhost:4000/api/v1/addProduct` - Create a new product with the following info(name - string, category - string, price - number, description - string)

### Create a new product

To create a new product, open Postman app and set your request type POST and put this URL `http://localhost:4000/api/v1/addProduct`. In the request body, provide a JSON object with following properties:

```bash
{
    "name": "Product Name",
    "category": "Category Name",
    "price": 100,
    "description": "Description goes here"
}
```

Then click send and you should see `Product saved successfully!` as a response.

![Product Creation](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/product-supplier/images/add-product.png)

After adding a new product, fetch all the products to see details:

### Fetch all the products

### Fetch a specific product
