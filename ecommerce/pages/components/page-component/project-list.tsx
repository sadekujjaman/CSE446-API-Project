import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AutoCompleteData, Project } from "../../types/utils";
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
import { SingleProject } from "./single-project";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export const ProjectList = ({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) => {
  //   const [projects, setProjects] = useState<Project[]>(projectsData ?? []);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [projectTitles, setProjectTitles] = useState<AutoCompleteData[]>([]);
  const [projectAuthors, setProjectAuthors] = useState<AutoCompleteData[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const getProjectTitle = (data: Project[]) => {
    const titles: AutoCompleteData[] = data.map((project) => ({
      title: project.title,
    }));
    return titles;
  };

  const getProjectAuthors = (data: Project[]) => {
    let authors: AutoCompleteData[] = [];
    let authorIds: (number | string)[] = [];
    data.forEach((project) => {
      const { teamInfo } = project;
      const ids = new Set(teamInfo?.authors.map((a) => a.id));
      const objs: AutoCompleteData[] =
        teamInfo?.authors
          .filter((a) => !authorIds.includes(a.id))
          .map((a) => ({ title: a.name, id: a.id })) ?? [];

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
    setFilteredProjects(projects);
    setProjectTitles(getProjectTitle(projects));
    setProjectAuthors(getProjectAuthors(projects));
  }, [projects]);

  useEffect(() => {
    if (selectedTitles.length === 0 && selectedAuthors.length === 0) {
      setFilteredProjects(() => projects);
    } else {
      setFilteredProjects(() =>
        projects.filter(
          (prevProject) =>
            selectedTitles.includes(prevProject.title) ||
            prevProject.teamInfo?.authors
              .map((a) => a.name)
              .some((r) => selectedAuthors.indexOf(r) >= 0)
        )
      );
    }
  }, [selectedTitles, selectedAuthors, projects]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
        {title}
      </Typography>
      {filteredProjects.length === 0 && (
        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
          No Visible Projects
        </Typography>
      )}
      {filteredProjects.length > 0 && (
        <>
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
              options={projectTitles}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Search by title"
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
              options={projectAuthors}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Search by author"
                  placeholder="Author"
                />
              )}
            />
          </Box>
          <Row spacing={3}>
            {filteredProjects.map((props) => (
              <SingleProject key={props.id} {...props} />
            ))}
          </Row>
        </>
      )}
    </>
  );
};
