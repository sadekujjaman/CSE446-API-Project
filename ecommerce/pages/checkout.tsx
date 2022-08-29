import { AddBox, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button as MuiButton,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link as MuiLink } from "./components/widgets";
import { WrapperPage } from "./components/page-component/page-wrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "./hooks/cart";
import { Typography } from "./components/widgets";
import { Address, Product } from "./types/utils";
import Link from "next/link";
import { ShortPageForm } from "./components/layout/dashboard-wrapper";
import * as Yup from "yup";
import * as widgets from "./components/widgets";

import * as formik from "formik";
import { useState } from "react";
import { Button } from "./components/common/button";
import router from "next/router";

const AddressInfoSchema = Yup.object().shape({
  city: Yup.string().required("Required"),
  area: Yup.string().required("Required"),
  houseNo: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});

const AddressInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField name="city" label="City" fullWidth />
      <widgets.TextField name="area" label="Area" fullWidth multiline />
      <widgets.TextField name="houseNo" label="House No" fullWidth multiline />
      <widgets.TextField name="phone" label="Phone" fullWidth />

      <Button
        disabled={isSubmitting || !isValid}
        label="Next"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const AddressInfoPromt = ({ address }: { address: Address }) => {
  const { addAddress } = useCart();
  const [initialValues, setInitialValues] = useState<Address>({
    city: address?.city ?? "",
    area: address?.area ?? "",
    houseNo: address?.houseNo ?? "",
    phone: address?.phone ?? "",
  } as Address);

  const saveAddress = async (addressData: Address, { setSubmitting }: any) => {
    try {
      console.log(addressData);
      addAddress({ ...addressData });
      router.push("/make-transaction");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  //   const handleProjectStatusChange = () => {
  //     setInitialValues((prevProject) => ({
  //       ...prevProject,
  //       active: !prevProject.active,
  //     }));
  //   };

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        Address Info
      </Typography>
      <Divider />
      <formik.Formik
        initialValues={initialValues}
        validationSchema={AddressInfoSchema}
        validate={extraValidate}
        onSubmit={saveAddress}
      >
        <AddressInfoForm />
      </formik.Formik>
    </>
  );
};

const CheckoutDashboard = () => {
  const { products, getAddress } = useCart();
  const address = getAddress();
  return (
    <>
      <ShortPageForm>
        {products && (
          <>
            <AddressInfoPromt address={address} />
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
        {() => <CheckoutDashboard />}
      </WrapperPage>
    </>
  );
};

export default Home;
