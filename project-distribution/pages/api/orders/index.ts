import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

const ECOMMERCE_ACCOUNT_NO = "909090";
const SUPPLIER_ACCOUNT_NO = "808080";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { database } = await connectToDatabase();
  const collection = database.collection("orders");

  if (req.method === "POST") {
    try {
      const { user, products, address, amount: _amount } = req.body;
      console.log({ user }, { products });
      const amount = parseFloat(_amount);

      const { accountNo } = user;
      const { data } = await axios.get(
        `http://localhost:4002/api/v1/account/${accountNo}`
      );
      const userAccount = data?.account;
      if (!userAccount) {
        throw new Error("Invalid account info!");
      }
      if (userAccount.balance - amount < 0) {
        throw new Error("Insufficient balance!");
      }

      const { data: user_ecommerce } = await axios.post(
        `http://localhost:4002/api/v1/transaction/make-transaction`,
        {
          senderAccountNo: userAccount.accountNo,
          receiverAccountNo: ECOMMERCE_ACCOUNT_NO,
          balance: amount,
        }
      );
      const userTransactionId = user_ecommerce.transactionId;

      const { data: ecommerce_supplier } = await axios.post(
        `http://localhost:4002/api/v1/transaction/make-transaction`,
        {
          senderAccountNo: ECOMMERCE_ACCOUNT_NO,
          receiverAccountNo: SUPPLIER_ACCOUNT_NO,
          balance: amount * 0.9,
        }
      );

      const supplierTransactionId = ecommerce_supplier.transactionId;

      const { data: order_data } = await axios.post(
        `http://localhost:4000/api/v1/createOrder`,
        {
          products,
          address,
          transactionId: supplierTransactionId,
          amount: amount * 0.9,
        }
      );

      res.status(200).json({ status: "Ok", transactionId: userTransactionId });
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error occurred!" });
    }
  }
}
