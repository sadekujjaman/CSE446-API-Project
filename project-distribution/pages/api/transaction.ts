// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Address, CartProduct } from "../hooks/cart";
import { Bank } from "../types/utils";
import { supabase } from "../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userBank = req.body.userBank as Bank;
    const cartProducts = req.body.cartProducts as CartProduct[];
    const address = req.body.address as Address;
    const email = req.body.email as string;
    const { status, error } = await makeTransaction(
      userBank,
      cartProducts,
      address,
      email
    );
    if (error) {
      res.status(403).json({ status: 403, message: "Invalid request!" });
    }
    return res.status(200).json({ status: "ok" });
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}
const makeTransaction = async (
  userBank: Bank,
  cartProducts: CartProduct[],
  address: Address,
  email: string
) => {
  //   const order = { ...userBank, ...address };
  //   const { data, error } = await supabase
  //     .from("Bank")
  //     .insert({ name: bankName, accountNo, secret })
  //     .single();
  //   console.log({ data });
  //   console.log({ error });
  //   if (error) {
  //     return { error: "Request failed!" };
  //   }

  //   if (data) {
  //     const { id } = data ?? {};
  //     const { data: userData, error: userError } = await supabase
  //       .from("User")
  //       .update({ bankId: id })
  //       .eq("email", email)
  //       .single();
  //     if (userError) {
  //       return { error: "Request failed!" };
  //     }
  //   }
  return { status: "ok", error: "error" };
};
