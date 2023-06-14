# CSE446-API-Project

### Bank

#### This project will covers all the functionalities related to banking transaction.

This is a [NodeJS](https://nodejs.org/en) project bootstrapped with [`node`](https://nodejs.org/en/docs/guides/getting-started-guide).

### System Requirements

1. [Node.js](https://nodejs.org/en/) 12.22.0 or later
2. [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
3. [Nodemon](https://www.npmjs.com/package/nodemon), See below installation guide.
4. MacOS, Windows (including WSL), and Linux are supported

### Software Requirements

1. [MongoDB](https://www.mongodb.com/): A NoSQL database used for storing data

### Install Nodemon Using npm

```bash
npm install -g nodemon
```

### Setup

First, install the dependencies for this project (Make sure you're in the `bank` directory):

To change the directory to `bank`,

```bash
cd bank
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

Open [http://localhost:4002](http://localhost:4002) with your browser to see `Your bank server is running on port 4002!`..

### FAQ

To work with this project one must have prepare a environment file with following properties.
The file name should be `.env` and must contain in the `bank` directory.

```
MONGODB_URI=mongodb+srv://<username>:<password>@<host>.mongodb.net/<bank-db-name>
```

\*\*\* Replace `<username>` and `<password>` with your mongodb username and password respectfully. Replace `<host>` with your mongodb host name. Also replace `bank-db-name` with your bank db name in mongodb.

Here is an example of `MONGODB_URI`:

```bash
MONGODB_URI=mongodb+srv://myuser:mypassword@abccew73.mongodb.net/bank

```

N.B - Don't forget to add `bank` after the `MONGODB_URI`

You can get this `MONGODB_URI` from your mongodb atlas account. [Mongodb Atlas/](https://cloud.mongodb.com/).
To set the step by step setup for MongoDB, visit [MongoDB Setup](https://github.com/sadekujjaman/CSE446-API-Project/tree/develop/bank/mongodb-setup)

To get more info:

1. [NodeJS Quick Start](https://nodejs.dev/en/learn/)
2. [Mongodb Atlas Quick Start](https://www.mongodb.com/docs/atlas/getting-started/)
3. [Mongodb](https://www.mongodb.com/docs/drivers/node/current/)

API routes can be accessed on [http://localhost:4002/api/v1/](http://localhost:4002/api/v1/). Those endpoints are available in `index.js`.

Here are some basic API routes:

2. GET - `http://localhost:4002/api/v1/account/:accountNo` - Get an specific account with the given accountNo
3. POST - `http://localhost:4002/api/v1/account/createAccount` - Create a new bank account with the following info(name - string, email-string, address - string, accountNo - string, balance - number)

### Create a new bank account

To create a new bank account, open Postman app and set your request type POST and put this URL `http://localhost:4002/api/v1/account/createAccount`. In the request body, provide a JSON object with following properties:

```bash
{
    "name": "User name",
    "email": "User email",
    "address": "User address",
    "accountNo": "User bank account no",
    "balance": 100000
}
```

Then click send and you should see `Account created successfully!` as response.

![Bank Account Creation](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/bank/images/add-bank-account.png)

After adding a new account, fetch this acount Info to see details:

### Fetch a specific bank account with accountNo

To fetch all the products, open Postman app and set your request type GET and put this URL `http://localhost:4002/api/v1/account/:accountNo`. Then click send and you should see a list of products as response.

![Bank Account](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/bank/images/fetch-bank-account.png)
