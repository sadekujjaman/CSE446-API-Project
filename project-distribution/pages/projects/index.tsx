import React, { useEffect, useRef, useState } from "react";
import { Project } from "../types/utils";
import { WrapperPage } from "../components/page-component/page-wrapper";
import Box from "@mui/material/Box";
import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ProjectList } from "../components/page-component/project-list";
import { useUser } from "../utils/hooks-context";

const ProjectListPage = () => {
  const [alignment, setAlignment] = useState<string>("all_projects");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const { getProjects } = useUser();
  const projects = getProjects();

  const handleChange = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    setFilteredProjects(
      projects?.filter((project) => {
        return (
          (alignment === "running_projects" && project.active) ||
          (alignment === "archived_projects" && !project.active) ||
          alignment === "all_projects"
        );
      })
    );
  }, [alignment, projects]);

  const getTitle = (): string => {
    if (alignment === "all_projects") {
      return "All Projects";
    } else if (alignment === "running_projects") {
      return "Running Projects";
    } else if (alignment === "archived_projects") {
      return "Archived Projects";
    }
    return "";
  };

  return (
    <Container sx={{ maxWidth: "800px", margin: "auto" }}>
      {/* {!isLoading && ( */}
      <>
        <Box className="project-heading" sx={{ mb: 4, mt: 15 }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <ToggleButton value="all_projects">All Projects</ToggleButton>
            <ToggleButton value="running_projects">
              Running Projects
            </ToggleButton>
            <ToggleButton value="archived_projects">
              Archived Projects
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <ProjectList title={getTitle()} projects={filteredProjects} />
      </>
      {/* )} */}
    </Container>
  );
};

const ProjectsPage = () => {
  return (
    <>
      <WrapperPage title="Projects">{() => <ProjectListPage />}</WrapperPage>
    </>
  );
};

export default ProjectsPage;
