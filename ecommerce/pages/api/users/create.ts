// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, ...data } = req.body.user;
    const user: any = await createUser(data);
    return res.status(200).json(user);
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}

const createUser = async (user: User) => {
  const { data, error } = await supabase.from("User").insert(user).single();
  if (error) {
    return { status: 403, message: "Invalid request!" };
  }

  return { status: 200, data: data };
};
