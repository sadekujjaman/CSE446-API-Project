import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../types/utils";
import { supabase } from "../../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await getUserFromSupabase(
      req.query.email as string
    );
    if (error) {
      return res.status(403).json({ error: error });
    }
    return res.status(200).json(data);
  }
}

const getUserFromSupabase = async (email: string) => {
  const { data, error } = await supabase
    .from("User")
    .select(
      `name,
      email,
      contactNo,
      id,
      Bank(id, accountNo, name, secret)
      `
    )
    .eq("email", email)
    .single();

  if (error || !data) {
    return { error: error?.message };
  }
  const { Bank, ...userInfo } = data;
  userInfo["bank"] = Bank ? { ...Bank } : null;
  return { data: userInfo };
};

const getTeacherInfo = (teacher: any) => {
  if (!teacher) {
    return null;
  }
  const { Course, User, ...teacherInfo } = teacher;
  teacherInfo["name"] = User.name;
  teacherInfo["courses"] = Course.map((course: any) => {
    const { Project, Teacher, Student, ...courseInfo } = course;
    courseInfo["projects"] = getProjectsInfo(Project);
    courseInfo["teachers"] = Teacher.map((teacher: any) => {
      const { User, ...teacherInfo } = teacher;
      teacherInfo["name"] = User.name;
      return teacherInfo;
    });
    courseInfo["students"] = Student.map((student: any) => ({
      id: student.id,
      userId: student.User.id,
      name: student.User.name,
    }));
    return courseInfo;
  });

  return teacherInfo;
};

const getStudentInfo = (student: any) => {
  if (!student) {
    return null;
  }
  const { Course, Project, ...studentInfo } = student;
  studentInfo["projects"] = getProjectsInfo(Project);

  studentInfo["courses"] = Course.map((course: any) => {
    const { Teacher, ...courseInfo } = course;
    courseInfo["teachers"] = Teacher.map((teacher: any) => {
      const { User, ...teacherInfo } = teacher;
      teacherInfo["name"] = User.name;
      return teacherInfo;
    });
    return courseInfo;
  });
  return studentInfo;
};

const getProjectsInfo = (projects: any) => {
  if (!projects) {
    return null;
  }
  return projects.map((project: any) => {
    const { Team, Review, Course, ...projectInfo } = project;
    const { name } = Team;
    const teamId = Team.id;
    const authors = Team.Student.map((s: any) => ({ ...s.User }));
    projectInfo["teamInfo"] = { teamId, name, authors };
    projectInfo["courseInfo"] = { ...Course };
    projectInfo["reviews"] = Review.map((review: any) => {
      const { User, ...reviewInfo } = review;
      reviewInfo["userName"] = User.name;
      return reviewInfo;
    });
    return projectInfo;
  });
};
