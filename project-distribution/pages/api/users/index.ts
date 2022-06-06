import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users: any = await getUsersData();
  res.status(200).json(users);
}

const getUsersData = async () => {
  const { data, error, status } = await supabase.from("User").select("*");

  if (error) {
    return { status: 403, message: "Invalid request!" };
  }

  return { status: 200, data: data };
};
