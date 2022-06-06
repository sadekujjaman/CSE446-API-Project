// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data, error } = await createCourse({ ...req.body });
    if (error) {
      return res.status(403).json(error);
    }
    return res.status(200).json(data);
  }
  return res.status(403).json({ status: 403, message: "Invalid request!" });
}

const createCourse = async (course: any) => {
  console.log(course);
  const { id, teacherId, ...courseInfo } = course;
  courseInfo["joiningCode"] = generateUniqueCode();
  const courseResponse = await supabase
    .from("Course")
    .insert(courseInfo)
    .single();
  console.log(courseResponse.data);

  const teacherCourseResponse = await supabase
    .from("Teacher_Course")
    .insert({ teacherId: teacherId, courseId: courseResponse.data.id })
    .single();

  const { data, error } = await getCourseFromSupabase(courseResponse.data.id);
  return { data, error };
};

const generateUniqueCode = () => {
  return Math.random().toString(36).slice(2, 8);
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
