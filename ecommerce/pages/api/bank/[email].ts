// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const bankName = req.body.bankName as string;
    const accountNo = req.body.accountNo as string;
    const secret = req.body.secret as string;
    const email = req.body.email as string;
    console.log({ email }, { bankName });
    const { status, error } = await addBank(email, bankName, accountNo, secret);
    if (error) {
      res.status(403).json({ status: 403, message: "Invalid request!" });
    }
    return res.status(200).json({ status: "ok" });
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}
const addBank = async (
  email: string,
  bankName: string,
  accountNo: string,
  secret: string
) => {
  const { data, error } = await supabase
    .from("Bank")
    .insert({ name: bankName, accountNo, secret })
    .single();
  console.log({ data });
  console.log({ error });
  if (error) {
    return { error: "Request failed!" };
  }

  if (data) {
    const { id } = data ?? {};
    const { data: userData, error: userError } = await supabase
      .from("User")
      .update({ bankId: id })
      .eq("email", email)
      .single();
    if (userError) {
      return { error: "Request failed!" };
    }
  }
  return { status: "ok" };
};
