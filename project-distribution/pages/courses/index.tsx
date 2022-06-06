import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Course } from "../types/utils";
import { WrapperPage } from "../components/page-component/page-wrapper";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Link as MuiLink, Typography } from "../components/widgets";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Popover,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Row } from "../components/layout/row";
import { Col } from "../components/layout/col";
import { modalStyle } from "../components/page-component/commons";
import * as widgets from "../components/widgets";
import { SingleCourse } from "../components/page-component/single-course";
import { CourseList } from "../components/page-component/course-list";
import { useUser } from "../utils/hooks-context";

const CourseListPage = () => {
  const [isLoading, setLoading] = useState(true);
  // const [courses, setCourses] = useState<Course[]>([]);
  const { getCourses } = useUser();
  const courses = getCourses();

  return (
    <Container sx={{ maxWidth: "800px", margin: "auto" }}>
      {/* {!isLoading && ( */}
      <>
        <Box className="project-heading" sx={{ mb: 4, mt: 15 }}>
          <Typography variant="h4">{"My Courses"}</Typography>
        </Box>
        <CourseList title={""} courses={courses} />
      </>
      {/* )} */}
    </Container>
  );
};

const CoursesPage = () => {
  return (
    <>
      <WrapperPage title="Courses">{() => <CourseListPage />}</WrapperPage>
    </>
  );
};

export default CoursesPage;
