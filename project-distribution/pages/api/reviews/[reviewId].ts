import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const review: any = await getReviewFromSupabase(req.query.reviewId as string);
  res.status(200).json(review);
}

const getReviewFromSupabase = async (id: string) => {
  const { data, error, status } = await supabase
    .from("Review")
    .select(
      `
      id,
      userId,
      message
      `
    )
    .eq("projectId", id)

  if (error) {
    return { status: 403, message: error.message };
  }
  return { status: 200, data: data };
};
