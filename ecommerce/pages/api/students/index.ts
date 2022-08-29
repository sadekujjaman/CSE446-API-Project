import type { NextApiRequest, NextApiResponse } from "next";
import { Student } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await getStudentsFromSupabase(
    req.query.userId as string
  );
  res.status(200).json(data);
}

const getStudentsFromSupabase = async (userId: string) => {
  const { data, error } = await supabase
    .from("Student")
    .select(`*, User(name)`);

  if (error) {
    return { error: error.message };
  }

  const updatedData = data?.map((student) => {
    const { User, ...studentInfo } = student;
    studentInfo["name"] = User.name;
    return studentInfo;
  });

  return { data: updatedData };
};
