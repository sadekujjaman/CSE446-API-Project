// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects: any = await getArchivedProjectFromSupabase();

  res.status(200).json(JSON.stringify(projects.data));
}
const getArchivedProjectFromSupabase = async () => {
  const { data, error, status } = await supabase
    .from("Project")
    .select(
      `*,
    Course(*),
    Review(id, userId, message,
      User(name)),
    Team(name, 
      Student(
        User(id, name)))`
    )
    .eq("active", false);

  if (error || !data) {
    return { status: 403, message: error?.message };
  }
  const formattedData = data.map((project) => {
    const { Team, Review, Course, ...projectData } = project;
    const name = Team.name;
    const authors = Team.Student.map((s: any) => ({ ...s.User }));
    projectData["teamInfo"] = { name, authors };
    projectData["courseInfo"] = { ...Course };
    projectData["reviews"] = Review.map((review: any) => {
      const { User, ...reviewInfo } = review;
      reviewInfo["userName"] = User.name;
      return reviewInfo;
    });
    return projectData;
  });
  return { status: 200, data: formattedData };
};
