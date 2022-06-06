import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import { WrapperPage } from "../components/page-component/page-wrapper";
import {
  AutoCompleteData,
  CourseInfo,
  ProjectCreateInfo,
  ProjectInfo,
  Student,
} from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import {
  Autocomplete,
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  Popover,
  TextField,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";

const ProjectInfoSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  summary: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  teamName: Yup.string().required("Required"),
  memebrs: Yup.array().min(1).max(3),
});

const ProjectInfoForm = ({
  active,
  allMembers,
}: {
  active: boolean;
  allMembers: Student[];
}) => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  //   const [members, setMembers] = useState<AutoCompleteData[]>([]);
  console.log(values);
  return (
    <>
      <formik.Form>
        <widgets.TextField
          name="title"
          label="Title"
          fullWidth
          disabled={!active}
        />
        <widgets.TextField
          name="summary"
          label="Summary"
          fullWidth
          multiline
          disabled={!active}
        />
        <widgets.TextField
          name="content"
          label="Content"
          fullWidth
          multiline
          disabled={!active}
        />
        <widgets.TextField
          name="url"
          label="URL"
          fullWidth
          disabled={!active}
        />
        <widgets.TextField
          name="teamName"
          label="Team Name"
          fullWidth
          disabled={!active}
        />
        <Autocomplete
          multiple={true}
          fullWidth={true}
          id="members"
          options={allMembers}
          getOptionLabel={(option) => option.name as string}
          value={values.members}
          onChange={(e, value) => {
            setFieldValue("members", value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label="Team members"
              fullWidth={true}
              name="members"
            />
          )}
          sx={{ marginLeft: "12px" }}
        />
        <br />
        {active && (
          <Button
            disabled={isSubmitting || !isValid}
            label="Save"
            variant="contained"
            type="submit"
            size="large"
            style={{ margin: "10px" }}
          />
        )}
      </formik.Form>
    </>
  );
};

const ProjectInfoPromt = ({
  project,
  courseInfo,
}: {
  project: ProjectCreateInfo;
  courseInfo: CourseInfo;
}) => {
  console.log("INFO:", project);
  const [initialValues, setInitialValues] = useState<ProjectCreateInfo>({
    ...project,
  });
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    const { data } = await axios.get(`/api/students/course/${courseInfo.id}`);
    console.log(data);
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Courses
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={handleClick}
      sx={{ cursor: "pointer" }}
    >
      {courseInfo.name}
    </Link>,
    <Link underline="none" key="3" color="inherit">
      {project.title}
    </Link>,
  ];

  const saveProjectInfo = async (
    projectData: ProjectCreateInfo,
    { setSubmitting }: any
  ) => {
    try {
      console.log(projectData);
      const { data } = await axios.post(`/api/projects/create`, {
        projectData: projectData,
      });
      console.log(data);
      if (data) {
        const url = `/projects/${data.id}`;
        const route = {
          pathname: url,
          query: { data: JSON.stringify(data) },
        };
        const as = {
          pathname: url,
        };
        router.push(route, as);
      }
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  const handleProjectStatusChange = () => {
    setInitialValues((prevProject) => ({
      ...prevProject,
      active: !prevProject.active,
    }));
  };

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {`${courseInfo.name}(${courseInfo.code})`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {courseInfo.description}
            </Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                sx={{ mb: 1.5, justifyContent: "flex-start" }}
                color="text.secondary"
              >
                {`Credit ${courseInfo.credit}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1.5, justifyContent: "flex-end" }}
                color="text.secondary"
              >
                {courseInfo.session}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Popover>

      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        Project Info
      </Typography>
      <Divider />
      <formik.Formik
        initialValues={initialValues}
        validationSchema={ProjectInfoSchema}
        validate={extraValidate}
        onSubmit={saveProjectInfo}
      >
        <ProjectInfoForm active={initialValues.active} allMembers={students} />
      </formik.Formik>
    </>
  );
};

const ProjectDashboard = () => {
  const { query } = useRouter();
  const data = query.data as string;
  const courseInfo: CourseInfo = JSON.parse(data);
  //   const courseInfo: CourseInfo = {
  //     id: "100",
  //     name: "No name",
  //     description: "No description",
  //     credit: "No credit",
  //     session: "No session",
  //     code: "No code",
  //   };

  //   const { reviews, courseInfo, teamInfo, ...projectInfo } = project;
  const projectInfo: ProjectCreateInfo = {
    id: "",
    courseId: courseInfo.id,
    title: "",
    summary: "",
    content: "",
    active: true,
    url: "",
    teamName: "",
    members: [],
  };
  return (
    <>
      <ShortPageForm>
        {courseInfo && (
          <>
            <ProjectInfoPromt
              project={projectInfo as ProjectCreateInfo}
              courseInfo={courseInfo as CourseInfo}
            />
          </>
        )}
      </ShortPageForm>
    </>
  );
};

const Home = () => {
  return (
    <>
      <WrapperPage title="Project Profile">
        {() => <ProjectDashboard />}
      </WrapperPage>
    </>
  );
};

export default Home;
