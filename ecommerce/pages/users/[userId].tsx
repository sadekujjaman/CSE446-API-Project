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
  Alert,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Snackbar,
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

const UserInfoSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
});

const UserInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField name="name" label="Name" fullWidth={true} />
      <widgets.TextField disabled name="email" label="Email" fullWidth={true} />
      <widgets.TextField name="contactNo" label="ContactNo" fullWidth={true} />

      <widgets.TextField
        name="accountName"
        label="Account name"
        fullWidth={true}
      />

      <widgets.TextField name="accountNo" label="Account No" fullWidth={true} />
      <widgets.TextField
        disabled
        name="balance"
        label="Current balance"
        fullWidth={true}
      />
      <widgets.TextField name="secret" label="Secret" fullWidth={true} />

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

const UserInfoPromt = ({ user: _user }: { user: User }) => {
  const { user, updateUser } = useUser();
  const { query } = useRouter();
  const projectId = query.projectId as string;

  const saveUserInfo = async (userData: User, { setSubmitting }: any) => {
    try {
      console.log(userData);
      const { data } = await axios.post(`/api/users/email/${user?.email}`, {
        ...userData,
      });
      console.log({ data });
      if (data && data?.accountInfo) {
        updateUser({
          ...user,
          ...data?.accountInfo,
        });
        console.log("User saved...");
        setOpen(true);
      }
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          ...(user as User),
        }}
        validationSchema={UserInfoSchema}
        validate={extraValidate}
        onSubmit={saveUserInfo}
      >
        <UserInfoForm />
      </formik.Formik>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

const UserProfile = () => {
  const { user, updateUser } = useUser();
  const { query } = useRouter();

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Container sx={{ maxWidth: "800px", margin: "auto" }}>
        <ShortPageForm>
          <UserInfoPromt user={user as User} />
        </ShortPageForm>

        <Box sx={{ margin: 5 }}></Box>
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
