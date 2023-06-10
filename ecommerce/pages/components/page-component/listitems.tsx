import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { List, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ExpandLess,
  ExpandMore,
  LocalLibrary,
  Workspaces,
} from "@mui/icons-material";
import { CollapsibleList, CollapsibleListItem } from "./collapse-list";
import Link from "next/link";
import { useUser } from "../../utils/hooks-context";

export const MainListItems = () => {
  const { user, getProjects, getCourses } = useUser();
  const [projectOpen, setProjectOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);

  const projects: CollapsibleListItem[] = getProjects()
    .filter((project) => project.active)
    .map((project) => ({
      title: project.title,
      url: `/projects/${project.id}`,
      queryData: project,
    }));

  const courses: CollapsibleListItem[] = getCourses().map((course) => ({
    title: course.name,
    url: `/courses/${course.id}`,
    queryData: course,
  }));

  return (
    <List>
      <Link href={{ pathname: `/users/${user?.id}` }} passHref>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={() => setCourseOpen(!courseOpen)}>
        <ListItemIcon>
          <LocalLibrary />
        </ListItemIcon>
        <ListItemText primary="Courses" />
        {courseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={courseOpen} listItems={courses} />
      <ListItemButton onClick={() => setProjectOpen(!projectOpen)}>
        <ListItemIcon>
          <Workspaces />
        </ListItemIcon>
        <ListItemText primary="Projects" />
        {projectOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={projectOpen} listItems={projects} />
    </List>
  );
};

export const SecondaryListItems = () => {
  const { getProjects } = useUser();
  const [archievedOpen, setArchievedOpen] = useState(false);
  const archievedProjects: CollapsibleListItem[] = getProjects()
    .filter((project) => !project.active)
    .map((project) => ({
      title: project.title,
      url: `/projects/${project.id}`,
      queryData: project,
    }));

  return (
    <div>
      <ListSubheader inset>More</ListSubheader>
      <ListItemButton onClick={() => setArchievedOpen(!archievedOpen)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Archieved Projects" />
        {archievedOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={archievedOpen} listItems={archievedProjects} />
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </div>
  );
};
