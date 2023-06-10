import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const ECOMMERCE_ACCOUNT_NO = "909090";
const SUPPLIER_ACCOUNT_NO = "808080";
const ECOMMERCE_RATE = 0.1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      const supplierAmount = amount - amount * ECOMMERCE_RATE;
      const { data: ecommerce_supplier } = await axios.post(
        `http://localhost:4002/api/v1/transaction/make-transaction`,
        {
          senderAccountNo: ECOMMERCE_ACCOUNT_NO,
          receiverAccountNo: SUPPLIER_ACCOUNT_NO,
          balance: supplierAmount,
        }
      );

      const supplierTransactionId = ecommerce_supplier.transactionId;

      const { data: order_data } = await axios.post(
        `http://localhost:4000/api/v1/createOrder`,
        {
          products,
          address,
          transactionId: supplierTransactionId,
          amount: supplierAmount,
        }
      );

      res.status(200).json({ status: "Ok", transactionId: userTransactionId });
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error occurred!" });
    }
  }
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/orders`);

      if (data?.orders) {
        const updatedOrders = data?.orders?.map((order: { amount: number }) => {
          const updatedOrder = {
            ...order,
            amount: order.amount + order.amount * ECOMMERCE_RATE,
          };
          return updatedOrder;
        });
        res.status(200).json({ status: "Ok", orders: updatedOrders });
      } else {
        res.status(200).json({ error: "Error occurred!" });
      }
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error occurred!" });
    }
  }
}
