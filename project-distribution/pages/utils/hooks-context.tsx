import { createContext, useContext, useState } from "react";
import { Course, Project, User } from "../types/utils";

interface UserContextType {
  user: User | null;
  updateUser: (newUser: User) => void;
  getProjects: () => Project[];
  getCourses: () => Course[];
}

const UserContextDefaultValue: UserContextType = {
  user: null,
  updateUser: (newUser: User) => {},
  getProjects: () => [],
  getCourses: () => [],
};

export const UserContext = createContext<UserContextType>(
  UserContextDefaultValue
);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User) => {
    setUser(() => newUser);
  };

  const getProjects = (): Project[] => {
    if (!user || !user.student) {
      return [];
    }
    return user.student.projects ?? [];
  };
  const getCourses = (): Course[] => {
    if (!user || !user.teacher) {
      return [];
    }
    const coursesAsTeacher = user.teacher.courses ?? [];
    const coursesAsStudent = user.student?.courses ?? [];
    return [...coursesAsStudent, ...coursesAsTeacher];
    // return user.teacher.courses ?? [];
  };

  return (
    <UserContext.Provider value={{ user, updateUser, getProjects, getCourses }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
