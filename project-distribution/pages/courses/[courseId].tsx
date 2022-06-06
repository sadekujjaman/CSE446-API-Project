import { WrapperPage } from "../components/page-component/page-wrapper";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import {
  Course,
  CourseInfo,
  Project,
  Review,
  StudentInfo,
  TeacherInfo,
  Team,
} from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import {
  Alert as MuiAlert,
  Avatar,
  Breadcrumbs,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import PeopleIcon from "@mui/icons-material/People";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { ArrowRight, ArrowDropDown } from "@mui/icons-material";
import {
  CollapsibleList,
  CollapsibleListItem,
} from "../components/page-component/collapse-list";

import { Row } from "../components/layout/row";
import FolderIcon from "@mui/icons-material/Folder";
import { ProjectList } from "../components/page-component/project-list";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CourseMember = ({
  courseId,
  teachers,
  students,
}: {
  courseId: string;
  teachers: TeacherInfo[];
  students?: StudentInfo[];
}) => {
  return (
    <>
      <Box>
        <Divider>
          <Chip label="Teachers" />
        </Divider>
        <Grid item xs={12} md={6}>
          {/* <Demo> */}
          <List>
            {teachers.map((teacher, idx) => (
              <ListItem key={`${courseId}-${idx}`}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={teacher.name}
                  // secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            ))}{" "}
          </List>
          {/* </Demo> */}
        </Grid>
        {students && students?.length > 0 && (
          <>
            <Divider>
              <Chip label="Students" />
            </Divider>
            <Grid item xs={12} md={6}>
              {/* <Demo> */}
              <List>
                {students.map((teacher, idx) => (
                  <ListItem key={`${courseId}-${idx}`}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={teacher.name}
                      // secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                ))}{" "}
              </List>
              {/* </Demo> */}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

const CoureseInfoSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  session: Yup.string().required("Required"),
  credit: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const CoureseInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField name="name" label="Course Name" fullWidth />
      <widgets.TextField name="code" label="Code" fullWidth />
      <widgets.TextField name="session" label="Session" fullWidth />
      <widgets.TextField name="credit" label="Credit" fullWidth />
      <widgets.TextField name="description" label="Description" fullWidth />
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

const CoureseInfoPromt = ({
  courseInfo,
  setCourseInfo,
}: {
  courseInfo: CourseInfo;
  setCourseInfo: (newInfo: CourseInfo) => void;
}) => {
  const route = useRouter();
  const [initialValues, setInitialValues] = useState<CourseInfo>({
    ...courseInfo,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = () => {};

  const handleSnackbarClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const saveCoureseInfo = async (
    courseData: CourseInfo,
    { setSubmitting }: any
  ) => {
    try {
      console.log(courseData);
      // const { id, ...courseInfo } = courseData;
      const { data } = await axios.post("/api/courses/update-info", {
        ...courseData,
      });
      console.log(data);
      console.log("Course saved...");
      setCourseInfo(data);
      // route.push(`/courses/${response.data.data.id}`);
    } catch (e) {
      console.log("Error occured during course info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  const handleJoiningCodeClick = () => {
    navigator.clipboard.writeText(
      courseInfo.joiningCode ? courseInfo.joiningCode : ""
    );
    setSnackbarOpen(true);
  };

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        Course Info
      </Typography>
      <Tooltip sx={{ mb: 2 }} title="Course joining code">
        <Chip
          label={`${courseInfo.joiningCode}`}
          onClick={handleJoiningCodeClick}
        />
      </Tooltip>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="" sx={{ width: "100%" }}>
          Code copied to clickboard!
        </Alert>
      </Snackbar>
      <Divider />
      <formik.Formik
        initialValues={initialValues}
        validationSchema={CoureseInfoSchema}
        validate={extraValidate}
        onSubmit={saveCoureseInfo}
      >
        <CoureseInfoForm />
      </formik.Formik>
    </>
  );
};

export const CourseAlignment = {
  COURSE_INFO: "info",
  COURSE_MEMBERS: "members",
  COURSE_PROJECTS: "projects",
};

const CourseDashboard = () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const data = router.query.data as string;

  const course: Course = data ? JSON.parse(data) : {};
  const [alignment, setAlignment] = useState<string>(
    CourseAlignment.COURSE_INFO
  );
  const { projects, teachers, students, ...info } = course;
  const [courseInfo, setCourseInfo] = useState<CourseInfo>(info);
  const updateCourseInfo = (newInfo: CourseInfo) => {
    setCourseInfo(newInfo);
  };
  const handleChange = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    setAlignment(newAlignment);
  };

  const createProject = () => {
    const url = "/projects/create";
    const route = {
      pathname: url,
      query: { data: JSON.stringify(courseInfo) },
    };
    const as = {
      pathname: url,
    };
    router.push(route, as);
  };

  return (
    // <>
    //   <ShortPageForm>
    //     {course && <>{<CoureseInfoPromt course={course as Course} />}</>}
    //   </ShortPageForm>
    // </>
    <Container sx={{ maxWidth: "800px", margin: "auto" }}>
      <Box className="project-heading" sx={{ mb: 4, mt: 15 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <ToggleButton value={CourseAlignment.COURSE_INFO}>Info</ToggleButton>
          <ToggleButton value={CourseAlignment.COURSE_MEMBERS}>
            Members
          </ToggleButton>
          <ToggleButton value={CourseAlignment.COURSE_PROJECTS}>
            Projects
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {alignment === CourseAlignment.COURSE_INFO && (
        <ShortPageForm>
          {course && (
            <CoureseInfoPromt
              courseInfo={courseInfo as CourseInfo}
              setCourseInfo={updateCourseInfo}
            />
          )}
        </ShortPageForm>
      )}
      {alignment === CourseAlignment.COURSE_MEMBERS && (
        <>
          {course && (
            <CourseMember
              courseId={courseId}
              students={students as StudentInfo[]}
              teachers={teachers as TeacherInfo[]}
            />
          )}
        </>
      )}
      {alignment === CourseAlignment.COURSE_PROJECTS && (
        <>
          <Button
            variant="outlined"
            label="Create Project"
            sx={{ mb: 4 }}
            onClick={createProject}
          />
          {projects && projects.length > 0 && (
            <ProjectList title={""} projects={projects} />
          )}
        </>
      )}
    </Container>
  );
};
const Home = () => {
  return (
    <>
      <WrapperPage title="Courese Info">
        {() => <CourseDashboard />}
      </WrapperPage>
    </>
  );
};

export default Home;
