import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import { BANK_API_ROUTE } from "../../../utils/constant";

const ecommerceDatabaseName = process.env.NEXT_ECOMMERCE_DB_NAME as string;
const userCollectionName = "users";

const getBankInfo = async (email: string) => {
  const { data } = await axios.get(`${BANK_API_ROUTE}/account/email/${email}`);
  const account = data?.account;
  return account;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { database } = await connectToDatabase(ecommerceDatabaseName);
  const collection = database.collection(userCollectionName);

  if (req.method === "GET") {
    const email = req.query.email;

    const results = await collection.find({ email }).limit(1).toArray();

    if (!results || results.length === 0) {
      res.status(200).json({ status: "error" });
      return;
    }
    const bank = await getBankInfo(email as string);
    const { balance } = bank || { balance: 0 };
    res.status(200).json({ accountInfo: { ...results[0], balance } });
  } else if (req.method === "POST") {
    try {
      const { email, accountNo, accountName, secret, name, contactNo } =
        req.body;
      // const { data } = await axios.get(
      //   `${BANK_API_ROUTE}/account/${_accountNo}`
      // );
      // const account = data?.account;
      // if (!account) {
      //   res.status(200).json({ error: "Invalid account info!" });
      //   return;
      // }
      // const { accountNo, name } = account;

      const accountInfo = {
        email,
        accountName,
        secret,
        accountNo,
        name,
        contactNo,
      };
      const cleanedInfo = Object.fromEntries(
        Object.entries(accountInfo)
          .filter(([key, value]) => value)
          .map(([key, value]) => [key, value])
      );

      const results = await collection.updateOne(
        { email },
        {
          $set: cleanedInfo,
        },
        { upsert: true }
      );

      const resp = await collection.find({ email }).limit(1).toArray();

      res.status(200).json({ status: "Ok", accountInfo: resp[0] });
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error occurred!" });
    }
  }
}
