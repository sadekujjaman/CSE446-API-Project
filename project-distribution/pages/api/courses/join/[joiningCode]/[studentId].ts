// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../../../types/utils";
import { supabase } from "../../../../utils/supabaseClient";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await checkCourse(
      req.query.joiningCode as string,
      req.query.studentId as string
    );
    if (error) {
      return res.status(403).json(error);
    }
    return res.status(200).json(data);
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}

const checkCourse = async (joiningCode: any, studentId: any) => {
  const { data, error } = await supabase
    .from("Course")
    .select("*")
    .eq("joiningCode", joiningCode)
    .single();
  if (error) {
    return { error: error.message };
  }
  const courseStudentResponse = await supabase
    .from("Student_Course")
    .insert({ courseId: data.id, studentId: studentId });

  return await getCourseFromSupabase(data.id);
};

const getCourseFromSupabase = async (courseId: any) => {
  const { data, error } = await supabase
    .from("Course")
    .select(
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
    )
    .eq("id", courseId)
    .single();

  if (error || !data) {
    return { error: error?.message };
  }

  console.log(data);
  const { Project, Teacher, Student, ...courseInfo } = data;
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

  return { data: courseInfo };
};
