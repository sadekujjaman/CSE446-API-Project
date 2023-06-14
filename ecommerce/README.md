# CSE446-API-Project

### Ecommerce

#### This project will covers all the functionalities related to a ecommerce site.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

First, install the dependencies for this project (Make sure you're in the `ecommerce` directory):

To change the directory to `ecommerce`,

```bash
cd ecommerce
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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see home page like this,
![Home Page](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/ecommerce/images/home.png)

### Additional Setup to work properly

#### Environment Setup

To work with this project one must have prepare a environment file with following properties.
The file name should be `.env.local` and must contain in the `ecommerce` directory.

Step - 1: NextAuth Setup

To handle login, we used [NextAuth](https://next-auth.js.org/), it is easy to use and easy to manage. NextAuth provides many providers such as Google Login, GitHub Login, etc. Here we simply used Google Login.

You can get the detailed configuration for next-auth Google Login [here](https://next-auth.js.org/providers/google).

To setup next-auth Google login, we need two config. One is `GOOGLE_ID` and another is `GOOGLE_SECRET`. You can get those from your [google console](https://console.developers.google.com/apis/credentials). To see step by step setup for `GOOGLE_SECRET`, visit this page - [Next-Auth-Google-Provider](https://refine.dev/blog/nextauth-google-github-authentication-nextjs/#for-googleprovider-make-sure-you-have-a-google-account)

```bash
NEXTAUTH_URL=http://localhost:3000
GOOGLE_ID=GOOGLE_ID_GOES_HERE
GOOGLE_SECRET=GOOGLE_SECRET_GOES_HERE
```

Step - 2: MongoDB Setup

```bash
NEXT_ATLAS_URI=MOGODB_ATLAS_URL_GOES_HERE
NEXT_ECOMMERCE_DB_NAME=ecommerce
```

N.B - In this `NEXT_ATLAS_URI` don't mention your db name, just put the root URL of your mongodb atlas. Something like this:

```bash
NEXT_ATLAS_URI=mongodb+srv://<username>:<password>@abcdefcew73.mongodb.net
NEXT_ECOMMERCE_DB_NAME=ecommerce
```

Step - 3: Run Supplier Project

To run the supplier project, you can get a detailed guide [here](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/product-supplier/README.md).

```bash
cd product-supplier
npm install
npm run start
```

N.B - Add this supplier's api url to e-commerce's `env.local` file.

```bash
NEXT_PUBLIC_SUPPLIER_API_ROUTE=http://localhost:4000/api/v1
```

After running the `product-supplier` project, please create 1 or 2 products with the supplier api.
You can follow the setup guide for `product-supplier` [Supplier Product Creation](https://github.com/sadekujjaman/CSE446-API-Project/tree/develop/product-supplier#create-a-new-product)

Step - 4: Run Bank Project

To run the bank project, you can get a detailed guide [here](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/bank/README.md).

```bash
cd bank
npm install
npm run start
```

N.B - Add this bank's api url to e-commerce's `env.local` file.

```bash
NEXT_PUBLIC_BANK_API_ROUTE=http://localhost:4002/api/v1
```

After running the `bank` project, you must need to create 2 bank account with bank api.

1. One account for product-supplier - [Create a new bank account](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/bank/README.md#create-a-new-bank-account).

```bash
{
    "name": "Mr supplier",
    "email": "supplier@abc.co",
    "address": "supplier address",
    "accountNo": "808080",
    "balance": 10000
}
```

N.B - Add this supplier's account no to e-commerce's `env.local` file.

```bash
NEXT_PUBLIC_SUPPLIER_BANK_ACCOUNT_NO=808080
```

2. Another account for ecommerce - [Create a new bank account](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/bank/README.md#create-a-new-bank-account)

```bash
{
    "name": "Mr ecommerce",
    "email": "ecommerce@xyz.co",
    "address": "ecommerce address",
    "accountNo": "909090",
    "balance": 10000
}
```

N.B - Add this bank's account no to e-commerce's `env.local` file.

```bash
NEXT_PUBLIC_ECOMMERCE_BANK_ACCOUNT_NO=909090
```

The final `.env.local` file will looks something like this:

```bash
NEXTAUTH_URL=http://localhost:3000
GOOGLE_ID=GOOGLE_ID_GOES_HERE
GOOGLE_SECRET=GOOGLE_SECRET_GOES_HERE
NEXT_ATLAS_URI=mongodb+srv://myuser:mypassword@abc.cew73.mongodb.net
NEXT_ECOMMERCE_DB_NAME=ecommerce
NEXT_PUBLIC_ECOMMERCE_BANK_ACCOUNT_NO=909090
NEXT_PUBLIC_SUPPLIER_BANK_ACCOUNT_NO=808080
NEXT_PUBLIC_SUPPLIER_API_ROUTE=http://localhost:4000/api/v1
NEXT_PUBLIC_BANK_API_ROUTE=http://localhost:4002/api/v1

```

### Login

Now you can log in to the app. After successful login, you might be asked to set up your bank details. The bank details must be a valid account no and must be created through bank API. You can create your bank account from the bank API - [Create a new bank account](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/bank/README.md#create-a-new-bank-account).

![Home Page](https://github.com/sadekujjaman/CSE446-API-Project/blob/develop/ecommerce/images/bank-details.png)
