// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // let projects: Project[] = [
  //   {
  //     id: "Id_1",
  //     courseId: "Course_Id_1",
  //     title: "Project 1",
  //     summary:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  //     content: "Content 1",
  //     active: false,
  //     team: "Team_Id_1",
  //   },
  //   {
  //     id: "Id_2",
  //     courseId: "Course_Id_2",
  //     title: "Project 2",
  //     summary:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  //     content: "Content 2",
  //     active: false,
  //     team: "Team_Id_2",
  //   },
  //   {
  //     id: "Id_3",
  //     courseId: "Course_Id_3",
  //     title: "Project 3",
  //     summary:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  //     content: "Content 3",
  //     active: true,
  //     team: "Team_Id_3",
  //   },
  // ];

  const projects: any = await getProjectFromSupabase();

  res.status(200).json(JSON.stringify(projects.data));
}
const getProjectFromSupabase = async () => {
  const { data, error, status } = await supabase.from("Project").select(
    `*,
    Course(*),
    Review(id, userId, message,
      User(name)),
    Team(name, 
      Student(
        User(id, name)))`
  );

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
