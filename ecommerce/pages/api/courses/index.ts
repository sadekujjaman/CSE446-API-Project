// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../types/utils";
import { supabase } from "../../utils/supabaseClient";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects: any = await getCourseFromSupabase();

  res.status(200).json(JSON.stringify(projects.data));
}
const getCourseFromSupabase = async () => {
  const { data, error, status } = await supabase.from("Course").select(
    `*,
        Project(*,
          Course(*),
          Review(id, userId, message,
            User(name)), 
          Team( name, 
              Student(
                  User(id, name)
              )
          )
        ),
        Teacher(*, 
            User(id, name)
        ),
        Student(id, 
            User(id, name)
        )
        `
  );

  if (error || !data) {
    return { status: 403, message: error?.message };
  }

  const formattedData = data.map((course) => {
    const { Project, Teacher, Student, ...courseInfo } = course;
    courseInfo["projects"] = Project.map((project: any) => {
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
    courseInfo["teachers"] = Teacher.map((teacher: any) => ({
      id: teacher.id,
      userId: teacher.User.id,
      name: teacher.User.name,
      designation: teacher.designation,
    }));
    courseInfo["students"] = Student.map((teacher: any) => ({
      id: teacher.id,
      userId: teacher.User.id,
      name: teacher.User.name,
    }));
    return courseInfo;
  });
  return { status: 200, data: formattedData };
};
