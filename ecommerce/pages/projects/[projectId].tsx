import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import { WrapperPage } from "../components/page-component/page-wrapper";
import {
  CourseInfo,
  Project,
  ProjectInfo,
  Review,
  Team,
  TeamInfo,
} from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import {
  Avatar,
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
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
import Box from "@mui/material/Box";

const Accordion = styled((props: any) => (
  <MuiAccordion disableGutters elevation={0} square {...props}>
    {props.children}
  </MuiAccordion>
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ReviewPage = ({ review }: { review: Review }) => {
  const userLink = `/users/${review.userId}`;

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Link underline="hover" color="inherit" href={userLink}>
                {`${review.userName}`}
              </Link>
            </>
          }
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                // component="span"
                variant="body2"
                color="text.primary"
              >
                {`${review.message}`}
              </Typography>
              {/* {" — I'll be in your neighborhood doing errands this…"} */}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

const Reviews = ({
  projectId,
  reviews,
}: {
  projectId: string | number;
  reviews: Review[];
}) => {
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  const [reviewMessage, setReviewMessage] = useState<string>("");

  const submitReview = () => {
    // setReviews((prevReviews) => {
    //   const newReview: Review = {
    //     id: `${new Date().getMilliseconds()}`,
    //     userId: "User abc",
    //     message: review,
    //   };
    //   const newReviews = [...prevReviews, newReview];
    //   return newReviews;
    // });
    setReviewMessage("");
  };

  return (
    <>
      <Accordion
        expanded={reviewOpen}
        onChange={() => setReviewOpen(!reviewOpen)}
      >
        <AccordionSummary aria-controls="panel1d-content">
          <Typography>Reviews ({`${reviews.length}`})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {reviews &&
              reviews.map((review, idx) => (
                <ReviewPage key={`review-${review.id}`} review={review} />
              ))}
          </List>
          <Row>
            <TextField
              name="content"
              // label="Review"
              placeholder="Write your review here..."
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
            <Button
              label="Submit Review"
              variant="contained"
              type="submit"
              size="large"
              onClick={submitReview}
              style={{ margin: "10px" }}
            />
          </Row>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const TeamInfoPage = ({ teamInfo }: { teamInfo: TeamInfo }) => {
  const [teamOpen, setTeamOpen] = useState<boolean>(false);
  const getMemberList = (): CollapsibleListItem[] => {
    return teamInfo?.authors.map((author) => {
      return {
        title: author.name,
        url: `users/${author.id}`,
      } as CollapsibleListItem;
    }) as CollapsibleListItem[];
  };

  return (
    <>
      <ListItemButton onClick={() => setTeamOpen(!teamOpen)}>
        <ListItemIcon>
          {teamOpen ? <ArrowDropDown /> : <ArrowRight />}
        </ListItemIcon>
        <ListItemText primary={teamInfo?.name} />
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
      </ListItemButton>
      <CollapsibleList open={teamOpen} listItems={getMemberList()} />
    </>
  );
};

const ProjectInfoSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  summary: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const ProjectInfoForm = ({ active }: { active: boolean }) => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
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
      <widgets.TextField name="url" label="URL" fullWidth disabled={!active} />
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
  );
};

const ProjectInfoPromt = ({
  project,
  courseInfo,
}: {
  project: ProjectInfo;
  courseInfo: CourseInfo;
}) => {
  console.log("INFO:", project);
  const [initialValues, setInitialValues] = useState<ProjectInfo>({
    ...project,
  });
  const { query } = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    projectData: ProjectInfo,
    { setSubmitting }: any
  ) => {
    try {
      console.log(projectData);

      const { data } = await axios.post("/api/projects/update-info", {
        ...projectData,
      });
      console.log(data);
      console.log("Project saved...");
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
      {!initialValues.active && (
        <>
          <Typography variant="h6" sx={{ color: "#970707", marginTop: "20px" }}>
            *** This project archived at {project.completionDate} ***
          </Typography>
        </>
      )}
      <Button
        label={
          initialValues.active ? "Mark as archived" : "Remove from archived"
        }
        variant="outlined"
        type="submit"
        size="large"
        onClick={handleProjectStatusChange}
        style={{ margin: "10px" }}
      />
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
        <ProjectInfoForm active={initialValues.active} />
      </formik.Formik>
    </>
  );
};

const ProjectDashboard = () => {
  const { query } = useRouter();
  const projectId = query.projectId as string;
  const data = query.data as string;
  if (!data) {
    return <></>;
  }
  const project: Project = JSON.parse(data);

  const { reviews, courseInfo, teamInfo, ...projectInfo } = project;

  return (
    <>
      <ShortPageForm>
        {project && (
          <>
            <ProjectInfoPromt
              project={projectInfo as ProjectInfo}
              courseInfo={courseInfo as CourseInfo}
            />
            <TeamInfoPage teamInfo={teamInfo as TeamInfo} />
            <Reviews projectId={project.id} reviews={reviews as Review[]} />
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
