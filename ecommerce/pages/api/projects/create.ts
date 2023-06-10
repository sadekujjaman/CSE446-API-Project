// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data, error }: any = await createProject({ ...req.body });
    return res.status(200).json(data);
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}

const createProject = async ({ ...projectData }) => {
  const { teamName, members, id, ...projectInfo } = projectData.projectData;

  const teamResponse = await supabase
    .from("Team")
    .insert({ name: teamName })
    .single();
  console.log(teamResponse);
  const teamId = teamResponse.data?.id;

  const teamData = members.map((member: any) => ({
    teamId: teamId,
    studentId: member.id,
  }));
  const teamStudentResponse = await supabase
    .from("Team_Student")
    .insert(teamData);

  projectInfo["team"] = teamId;
  projectInfo["updatedAt"] = new Date().toLocaleString();
  console.log(projectInfo);
  const projectResponse = await supabase
    .from("Project")
    .insert(projectInfo)
    .single();

  console.log(projectResponse);
  const studentData = members.map((member: any) => ({
    studentId: member.id,
    projectId: projectResponse.data.id,
  }));

  const studentProjectResponse = await supabase
    .from("Student_Project")
    .insert(studentData);

  const { data, error } = await supabase
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
    .eq("id", projectResponse.data.id)
    .single();

  if (error || !data) {
    return { error: error?.message };
  }

  const { Team, Review, Course, ...updatedProjectData } = data;
  const name = Team.name;
  const authors = Team.Student.map((s: any) => ({ ...s.User }));
  updatedProjectData["teamInfo"] = { name, authors };
  updatedProjectData["courseInfo"] = { ...Course };
  updatedProjectData["reviews"] = Review.map((review: any) => {
    const { User, ...reviewInfo } = review;
    reviewInfo["userName"] = User.name;
    return reviewInfo;
  });

  return { data: updatedProjectData };
};
