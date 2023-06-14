import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { BANK_API_ROUTE, SUPPLIER_API_ROUTE } from "../../utils/constant";

const ECOMMERCE_ACCOUNT_NO = process.env.NEXT_PUBLIC_ECOMMERCE_BANK_ACCOUNT_NO;
const SUPPLIER_ACCOUNT_NO = process.env.NEXT_PUBLIC_SUPPLIER_BANK_ACCOUNT_NO;
const ECOMMERCE_RATE = 0.1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { user, products, address, amount: _amount } = req.body;

      const amount = parseFloat(_amount);
      const { accountNo } = user;
      const { data } = await axios.get(
        `${BANK_API_ROUTE}/account/${accountNo}`
      );
      const userAccount = data?.account;

      if (!userAccount) {
        throw new Error("Invalid account info!");
      }
      if (userAccount.balance - amount < 0) {
        throw new Error("Insufficient balance!");
      }

      const { data: user_ecommerce } = await axios.post(
        `${BANK_API_ROUTE}/transaction/make-transaction`,
        {
          senderAccountNo: userAccount.accountNo,
          receiverAccountNo: ECOMMERCE_ACCOUNT_NO,
          balance: amount,
        }
      );
      const userTransactionId = user_ecommerce.transactionId;
      const supplierAmount = amount - amount * ECOMMERCE_RATE;
      const { data: ecommerce_supplier } = await axios.post(
        `${BANK_API_ROUTE}/transaction/make-transaction`,
        {
          senderAccountNo: ECOMMERCE_ACCOUNT_NO,
          receiverAccountNo: SUPPLIER_ACCOUNT_NO,
          balance: supplierAmount,
        }
      );
      const supplierTransactionId = ecommerce_supplier.transactionId;

      const { data: order_data } = await axios.post(
        `${SUPPLIER_API_ROUTE}/createOrder`,
        {
          products,
          address,
          transactionId: supplierTransactionId,
          amount: supplierAmount,
        }
      );

      res.status(200).json({ status: "Ok", transactionId: userTransactionId });
    } catch (err) {
      res.status(200).json({ error: "Error occurred!" });
    }
  }
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(`${SUPPLIER_API_ROUTE}/orders`);

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
