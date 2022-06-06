import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const user: any = await getUserFromSupabase(req.query.userId as string);
    res.status(200).json(user);
  } else if (req.method === "POST") {
    const user: any = await setUserToSupabase(req.body.user);
    res.status(200).json(user.data);
  }
}

const setUserToSupabase = async (user: any) => {
  const { data, error, status } = await supabase
    .from("User")
    .update({ ...user })
    .match({ id: user.id });

  if (error) {
    return { status: 403, message: error.message };
  }
  return { status: 200, data: data ? data[0] : {} };
};

const getUserFromSupabase = async (userId: string) => {
  const { data, error, status } = await supabase
    .from("User")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return { status: 403, message: error.message };
  }
  return { status: 200, data: data };
};
