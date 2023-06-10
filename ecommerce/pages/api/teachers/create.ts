// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data, error } = await createTeacher({ ...req.body });
    if (error) {
      return res.status(403).json(error);
    }
    return res.status(200).json(data);
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}

const createTeacher = async (teacher: any) => {
  console.log(teacher);
  const { data, error } = await supabase
    .from("Teacher")
    .insert(teacher)
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: data };
};
