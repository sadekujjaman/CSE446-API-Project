import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  AutoCompleteData,
  Course,
  Teacher,
  TeacherInfo,
} from "../../types/utils";
import { WrapperPage } from "./page-wrapper";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Link as MuiLink, Typography } from "../widgets";
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
import { Row } from "../layout/row";
import { Col } from "../layout/col";
import { modalStyle } from "./commons";
import * as widgets from "../widgets";
import { SingleCourse } from "./single-course";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export const CourseList = ({
  title,
  courses,
}: {
  title: string;
  courses: Course[];
}) => {
  //   const [courses, setCourses] = useState<Course[]>(coursesData ?? []);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [courseTitles, setCourseTitles] = useState<AutoCompleteData[]>([]);
  const [courseAuthors, setCourseAuthors] = useState<AutoCompleteData[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const getCourseTitle = (data: Course[]) => {
    const titles: AutoCompleteData[] = data.map((course) => ({
      title: course.name,
    }));
    return titles;
  };

  const getCourseAuthors = (data: Course[]) => {
    let authors: AutoCompleteData[] = [];
    let authorIds: (number | string)[] = [];
    data.forEach((course) => {
      const { teachers } = course;
      const ids = new Set(teachers?.map((a) => a.id));
      const objs: AutoCompleteData[] =
        teachers
          ?.filter((a: TeacherInfo) => !authorIds.includes(a.id))
          .map((a: TeacherInfo) => ({ title: a.name, id: a.id })) ?? [];

      const idArr = Array.from(ids);
      authorIds = [...authorIds, ...idArr];
      authors = [...authors, ...objs];
    });
    return authors;
  };

  const addValue = (values: any[], isTitle: boolean) => {
    if (isTitle) {
      setSelectedTitles(values.map((value) => value.title));
    } else {
      setSelectedAuthors(values.map((value) => value.title));
    }
  };

  useEffect(() => {
    setFilteredCourses(courses);
    setCourseTitles(getCourseTitle(courses));
    setCourseAuthors(getCourseAuthors(courses));
  }, [courses]);

  useEffect(() => {
    if (selectedTitles.length === 0 && selectedAuthors.length === 0) {
      setFilteredCourses(() => courses);
    } else {
      setFilteredCourses(() =>
        courses.filter(
          (prevCourse) =>
            selectedTitles.includes(prevCourse.name) ||
            prevCourse.teachers
              ?.map((a) => a.name)
              .some((r) => selectedAuthors.indexOf(r) >= 0)
        )
      );
    }
  }, [selectedTitles, selectedAuthors, courses]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mb: 2,
        }}
      >
        {" "}
        <Autocomplete
          fullWidth
          multiple
          id="free-solo-with-text-demo"
          onChange={(event, newValue) => {
            addValue(newValue, true);
          }}
          options={courseTitles}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Search by name"
              placeholder="Title"
            />
          )}
        />
        <Autocomplete
          fullWidth
          multiple
          id="free-solo-with-text-demo"
          onChange={(event, newValue) => {
            addValue(newValue, false);
          }}
          options={courseAuthors}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Search by teacher"
              placeholder="Author"
            />
          )}
        />
      </Box>
      <Row spacing={3}>
        {filteredCourses.map((props) => (
          <SingleCourse key={props.id} {...props} />
        ))}
      </Row>
    </>
  );
};
