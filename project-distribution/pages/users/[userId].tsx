import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import { WrapperPage } from "../components/page-component/page-wrapper";
import {
  Course,
  ProjectInfo,
  Student,
  StudentInfo,
  Teacher,
  TeacherInfo,
  User,
  UserInfo,
} from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useUser } from "../utils/hooks-context";
import Box from "@mui/material/Box";
import { CourseList } from "../components/page-component/course-list";
import { ProjectList } from "../components/page-component/project-list";

const TeacherInfoSchema = Yup.object().shape({
  designation: Yup.string().required("Required"),
});

const TeacherInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField
        name="designation"
        label="Designation"
        fullWidth={true}
      />

      <br />
      <Button
        disabled={isSubmitting || !isValid}
        label="Save"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const TeacherInfoPromt = ({
  teacher,
  userId,
  createNew,
}: {
  teacher: TeacherInfo;
  userId: string | number;
  createNew?: boolean;
}) => {
  const initialValues = teacher;

  const { query } = useRouter();

  const saveTeacherInfo = async (
    teacherData: Teacher,
    { setSubmitting }: any
  ) => {
    try {
      console.log(teacherData);
      if (!createNew) {
        const { name, ...teacherInfo } = teacherData;
        const { data } = await axios.post(`/api/teachers/update-info`, {
          ...teacherInfo,
        });
        console.log(data);
      } else {
        const { name, ...teacherInfo } = teacherData;
        teacherInfo["userId"] = userId;
        const { data } = await axios.post(`/api/teachers/create`, {
          ...teacherInfo,
        });
        console.log(data);
      }
      console.log("Teacher saved...");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        Teacher Info
      </Typography>
      <formik.Formik
        initialValues={{
          ...teacher,
        }}
        validationSchema={TeacherInfoSchema}
        validate={extraValidate}
        onSubmit={saveTeacherInfo}
      >
        <TeacherInfoForm />
      </formik.Formik>
    </>
  );
};

const StudentInfoSchema = Yup.object().shape({
  // id: Yup.string().required("Required"),
  registrationNo: Yup.string().required("Required"),
  session: Yup.string().required("Required"),
});

const StudentInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      {/* <widgets.TextField
        name="id"
        label="Id"
        fullWidth={true}
        disabled={true}
      /> */}
      <widgets.TextField
        name="registrationNo"
        label="Registration No"
        fullWidth={true}
      />
      <widgets.TextField name="session" label="Session" fullWidth={true} />

      <br />
      <Button
        disabled={isSubmitting || !isValid}
        label="Save"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const StudentInfoPromt = ({
  student,
  createNew,
  userId,
}: {
  student: StudentInfo;
  userId: string | number;
  createNew?: boolean;
}) => {
  const initialValues = student;

  const { query } = useRouter();

  const saveStudentInfo = async (
    studentData: Student,
    { setSubmitting }: any
  ) => {
    try {
      console.log(studentData);
      if (!createNew) {
        const { name, ...studentInfo } = studentData;
        const { data } = await axios.post(`/api/students/update-info`, {
          ...studentInfo,
        });
        console.log(data);
      } else {
        const { name, ...studentInfo } = studentData;
        studentInfo["userId"] = userId;
        const { data } = await axios.post(`/api/students/create`, {
          ...studentInfo,
        });
        console.log(data);
      }
      console.log("Student saved...");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        Student Info
      </Typography>
      <formik.Formik
        initialValues={{
          ...student,
        }}
        validationSchema={StudentInfoSchema}
        validate={extraValidate}
        onSubmit={saveStudentInfo}
      >
        <StudentInfoForm />
      </formik.Formik>
    </>
  );
};

const UserInfoSchema = Yup.object().shape({
  id: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  contactNo: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  avatarURL: Yup.string(),
});

const UserInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      {/* <widgets.TextField
        name="id"
        label="Id"
        fullWidth={true}
        disabled={true}
      /> */}
      <widgets.TextField name="name" label="Name" fullWidth={true} />
      <widgets.TextField name="email" label="Email" fullWidth={true} />
      <widgets.TextField name="contactNo" label="ContactNo" fullWidth={true} />
      <widgets.TextField
        name="department"
        label="Department"
        fullWidth={true}
      />
      <widgets.TextField name="avatarURL" label="AvatarURL" fullWidth={true} />

      <br />
      <Button
        disabled={isSubmitting || !isValid}
        label="Save"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const UserInfoPromt = ({ user }: { user: UserInfo }) => {
  const initialValues = user;

  const { query } = useRouter();
  const projectId = query.projectId as string;

  const saveUserInfo = async (userData: User, { setSubmitting }: any) => {
    try {
      console.log(userData);
      const { data } = await axios.post(`/api/users/update-info`, {
        ...userData,
      });
      console.log(data);
      console.log("User saved...");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        User Info
      </Typography>
      <formik.Formik
        initialValues={{
          ...user,
        }}
        validationSchema={UserInfoSchema}
        validate={extraValidate}
        onSubmit={saveUserInfo}
      >
        <UserInfoForm />
      </formik.Formik>
    </>
  );
};

export const StudentAlignment = {
  INFO: "info",
  PROJECTS: "projects",
  COURSES: "courses",
};

const StudentProfile = ({
  student,
  userId,
}: {
  student: Student;
  userId: string | number;
}) => {
  const [alignment, setAlignment] = useState<string>(StudentAlignment.INFO);
  const { projects, courses, ...info } = student;
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(info);

  const updateInfo = (newInfo: StudentInfo) => {
    setStudentInfo(newInfo);
  };
  const handleChange = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <Box className="project-heading" sx={{ mb: 4, mt: 15 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <ToggleButton value={StudentAlignment.INFO}>Info</ToggleButton>
          <ToggleButton value={StudentAlignment.COURSES}>Courses</ToggleButton>
          <ToggleButton value={StudentAlignment.PROJECTS}>
            Projects
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {alignment === StudentAlignment.INFO && (
        <>
          {student && (
            <ShortPageForm>
              <StudentInfoPromt
                student={studentInfo as StudentInfo}
                userId={userId}
              />
            </ShortPageForm>
          )}
        </>
      )}
      {alignment === StudentAlignment.COURSES && (
        <>
          {courses && courses.length > 0 && (
            <CourseList courses={courses} title={"All Courses"} />
          )}
        </>
      )}
      {alignment === StudentAlignment.PROJECTS && (
        <>
          {projects && projects.length > 0 && (
            <ProjectList title={"All Projects"} projects={projects} />
          )}
        </>
      )}
    </>
  );
};

export const TeacherAlignment = {
  INFO: "info",
  PROJECTS: "projects",
  COURSES: "courses",
};
const TeacherProfile = ({
  teacher,
  userId,
}: {
  teacher: Teacher;
  userId: string;
}) => {
  const [alignment, setAlignment] = useState<string>(TeacherAlignment.INFO);
  const { courses, ...info } = teacher;
  const projects = courses
    ?.map((course: Course) => course.projects)
    .reduce((a, b) => a?.concat(b ?? []));

  const [teacherInfo, setTeacherInfo] = useState<TeacherInfo>(info);

  const updateInfo = (newInfo: TeacherInfo) => {
    setTeacherInfo(newInfo);
  };
  const handleChange = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <Box className="project-heading" sx={{ mb: 4, mt: 15 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <ToggleButton value={TeacherAlignment.INFO}>Info</ToggleButton>
          <ToggleButton value={TeacherAlignment.COURSES}>Courses</ToggleButton>
          <ToggleButton value={TeacherAlignment.PROJECTS}>
            Projects
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {alignment === TeacherAlignment.INFO && (
        <>
          {teacher && (
            <ShortPageForm>
              <TeacherInfoPromt
                teacher={teacherInfo as TeacherInfo}
                userId={userId}
              />
            </ShortPageForm>
          )}
        </>
      )}
      {alignment === TeacherAlignment.COURSES && (
        <>
          {courses && courses.length > 0 && (
            <CourseList courses={courses} title={"All Courses"} />
          )}
        </>
      )}
      {alignment === TeacherAlignment.PROJECTS && (
        <>
          {projects && projects.length > 0 && (
            <ProjectList title={"All Projects"} projects={projects} />
          )}
        </>
      )}
    </>
  );
};

const UserProfile = () => {
  const { user, updateUser } = useUser();
  const { query } = useRouter();
  const userId = query.userId as string;
  const [type, setType] = useState(true);
  const [studentChecked, setStudentChecked] = useState(false);
  const [teacherChecked, setTeacherChecked] = useState(false);
  if (!user) {
    return <></>;
  }
  const { student, teacher, ...userInfo } = user as User;

  const handleStudentCheckbox = (isStudent: boolean) => {
    isStudent
      ? setStudentChecked(!studentChecked)
      : setTeacherChecked(!teacherChecked);
  };

  return (
    <>
      <Container sx={{ maxWidth: "800px", margin: "auto" }}>
        <ShortPageForm>
          <UserInfoPromt user={userInfo as UserInfo} />
        </ShortPageForm>

        {student && <StudentProfile student={student} userId={userId} />}
        {teacher && <TeacherProfile teacher={teacher} userId={userId} />}

        <Box sx={{ margin: 5 }}>
          {!student && (
            <>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={studentChecked}
                      onChange={() => handleStudentCheckbox(true)}
                    />
                  }
                  label="Register as a student"
                />
              </FormGroup>
              {studentChecked && (
                <StudentInfoPromt
                  student={student as unknown as Student}
                  userId={userId}
                  createNew={true}
                />
              )}
            </>
          )}
          {!teacher && (
            <>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={teacherChecked}
                      onChange={() => handleStudentCheckbox(false)}
                    />
                  }
                  label="Register as a teacher"
                />
              </FormGroup>
              {teacherChecked && (
                <TeacherInfoPromt
                  teacher={teacher as unknown as Teacher}
                  userId={userId}
                  createNew={true}
                />
              )}
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

const UserPage = () => {
  return (
    <>
      <WrapperPage title="User Profile">{() => <UserProfile />}</WrapperPage>
    </>
  );
};

export default UserPage;
function initialValues(
  initialValues: any,
  arg1: { name: string; email: string }
) {
  throw new Error("Function not implemented.");
}
