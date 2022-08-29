import type { NextApiRequest, NextApiResponse } from "next";
import { Student } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const student: any = await getUserFromSupabase(req.query.userId as string);
  res.status(200).json(student);
}

const getUserFromSupabase = async (userId: string) => {
  const { data, error, status } = await supabase
    .from("Student")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    return { status: 403, message: error.message };
  }
  return { status: 200, data: data };
};
