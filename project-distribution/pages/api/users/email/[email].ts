import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { database } = await connectToDatabase();
  const collection = database.collection(
    process.env.NEXT_ATLAS_COLLECTION as string
  );

  if (req.method === "GET") {
    const email = req.query.email;

    const results = await collection.find({ email }).limit(1).toArray();

    if (!results || results.length === 0) {
      res.status(200).json({ status: "error" });
      return;
    }

    res.status(200).json({ accountInfo: results[0] });
  } else if (req.method === "POST") {
    try {
      const { email, accountNo, accountName, secret, name, contactNo } =
        req.body;
      // const { data } = await axios.get(
      //   `http://localhost:4002/api/v1/account/${_accountNo}`
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
