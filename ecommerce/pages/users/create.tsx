import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import { WrapperPage } from "../components/page-component/page-wrapper";
import { Student, Teacher, User } from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import { FormControlLabel, Switch } from "@mui/material";

const UserInfoSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  contactNo: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
});

const UserInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      {/* <widgets.TextField
        name="id"
        label="Id"
        fullWidth={true}
        disabled={true}
      /> */}
      <widgets.TextField name="name" label="Name" fullWidth={true} />
      <widgets.TextField
        name="email"
        label="Email"
        fullWidth={true}
        disabled={true}
      />
      <widgets.TextField name="contactNo" label="ContactNo" fullWidth={true} />
      <widgets.TextField
        name="department"
        label="Department"
        fullWidth={true}
      />
      <widgets.TextField name="avatarURL" label="AvatarURL" fullWidth={true} />

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

const UserInfoPromt = ({ email }: { email: string }) => {
  const router = useRouter();
  const user: User = {
    id: "",
    name: "",
    email: email,
    contactNo: "",
    department: "",
    avatarURL: "",
  };

  const { query } = useRouter();

  const saveUserInfo = async (userData: User, { setSubmitting }: any) => {
    try {
      console.log(userData);
      try {
        const { data } = await axios.post(`/api/users/create`, {
          user: userData,
        });
        if (data && data.status === 200) {
          console.log("User saved...");
          router.push(`/users/${data.data.id}`);
        }
      } catch (e) {}
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        User Info
      </Typography>
      <formik.Formik
        initialValues={{
          ...user,
        }}
        validationSchema={UserInfoSchema}
        validate={extraValidate}
        onSubmit={saveUserInfo}
      >
        <UserInfoForm />
      </formik.Formik>
    </>
  );
};

const UserCreateProfile = () => {
  const router = useRouter();
  const email = router.query.email as string;
  if (!email) {
    return null;
  }

  return (
    <>
      <ShortPageForm>{email && <UserInfoPromt email={email} />}</ShortPageForm>
    </>
  );
};

const UserCreatePage = () => {
  return (
    <>
      <WrapperPage title="User Create">
        {() => <UserCreateProfile />}
      </WrapperPage>
    </>
  );
};

export default UserCreatePage;
function initialValues(
  initialValues: any,
  arg1: { name: string; email: string }
) {
  throw new Error("Function not implemented.");
}
