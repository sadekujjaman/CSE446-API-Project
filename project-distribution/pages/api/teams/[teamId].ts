import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user: any = await getTeamFromSupabase(req.query.teamId as string);
  res.status(200).json(user);
}

const getTeamFromSupabase = async (id: string) => {
  const { data, error, status } = await supabase
    .from("Team")
    .select(
      `
      name, 
      Student(id, registrationNo, 
      User(name))`
    )
    .eq("id", id)
    .single();

  if (error) {
    return { status: 403, message: error.message };
  }
  return { status: 200, data: data };
};
