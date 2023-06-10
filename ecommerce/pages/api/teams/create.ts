// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const team: any = await createTeam({ ...req.body });
    return res.status(200).json(team);
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}

const createTeam = async (team: any) => {
  const { data, error, status } = await supabase.from("Team").insert({
    name: team.name,
  });
  if (data) {
    const teamId = data[0].id;
    for (const std_id of team.studentId) {
      const { data, error, status } = await supabase
        .from("Team_Student")
        .insert({
          teamId: teamId,
          studentId: std_id,
        });
      if (error) {
        return { status: 403, message: "Invalid request!" };
      }
    }
  } else if (error) {
    return { status: 403, message: "Invalid request!" };
  }

  return { status: 200, data: data };
};
