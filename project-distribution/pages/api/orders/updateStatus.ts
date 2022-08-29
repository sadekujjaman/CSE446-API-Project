import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

const ECOMMERCE_ACCOUNT_NO = "909090";
const SUPPLIER_ACCOUNT_NO = "808080";
const ECOMMERCE_RATE = 0.1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { database } = await connectToDatabase();
  const collection = database.collection("orders");

  if (req.method === "POST") {
    try {
      const { orderId, updatedStatus } = req.body;

      const { data: order_data } = await axios.post(
        `http://localhost:4000/api/v1/order/updateOrderStatus`,
        {
          orderId,
          updatedStatus,
        }
      );

      res.status(200).json({ status: "Ok" });
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error occurred!" });
    }
  }
}
