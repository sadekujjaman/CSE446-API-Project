import { WrapperPage } from "../components/page-component/page-wrapper";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import { Course, Project, Review, Team, User } from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import {
  Avatar,
  Breadcrumbs,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
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
import { useUser } from "../utils/hooks-context";

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

const CoureseInfoPromt = ({ course }: { course: Course }) => {
  console.log("INFO:", course);
  const route = useRouter();
  const { user } = useUser();
  const { teacher } = user as User;
  const [initialValues, setInitialValues] = useState<Course>({ ...course });

  const saveCoureseInfo = async (
    courseData: Course,
    { setSubmitting }: any
  ) => {
    try {
      console.log(courseData);
      const { data } = await axios.post("/api/courses/create", {
        ...courseData,
        teacherId: teacher?.id,
      });
      console.log(data);
      console.log("Course saved...");
      // route.push(`/courses/${data.data.data.id}`);
      const url = `/courses/${data.id}`;
      route.push(
        { pathname: url, query: { data: JSON.stringify(data) } },
        { pathname: url }
      );
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

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        Course Info
      </Typography>
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

const CourseDashboard = () => {
  const course = {
    id: "",
    name: "",
    code: "",
    session: "",
    credit: "",
    description: "",
  };
  return (
    <>
      <ShortPageForm>
        <>
          <CoureseInfoPromt course={course as Course} />
        </>
      </ShortPageForm>
    </>
  );
};
const Home = () => {
  return (
    <>
      <WrapperPage title="Create Courese">
        {() => <CourseDashboard />}
      </WrapperPage>
    </>
  );
};

export default Home;
