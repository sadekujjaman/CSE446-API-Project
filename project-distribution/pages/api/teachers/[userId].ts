import type { NextApiRequest, NextApiResponse } from "next";
import { Teacher } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const teacher: any = await getUserFromSupabase(req.query.userId as string);
  res.status(200).json(teacher);
}

const getUserFromSupabase = async (userId: string) => {
  const { data, error, status } = await supabase
    .from("Teacher")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    return { status: 403, message: error.message };
  }
  return { status: 200, data: data };
};
