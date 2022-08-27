import { AddBox, DeleteOutline } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  IconButton,
  Snackbar,
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
import { getTotalPrice, Transaction, useCart } from "./hooks/cart";
import { Typography } from "./components/widgets";
import { Product } from "./types/utils";
import Link from "next/link";
import { ShortPageForm } from "./components/layout/dashboard-wrapper";
import * as Yup from "yup";
import * as widgets from "./components/widgets";

import * as formik from "formik";
import { useEffect, useState } from "react";
import { Button } from "./components/common/button";
import { useUser } from "./utils/hooks-context";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import router from "next/router";
import axios from "axios";

const TransactionInfoSchema = Yup.object().shape({
  accountNo: Yup.string().required("Required"),
  accountName: Yup.string().required("Required"),
  payable: Yup.string().required("Required"),
});

const TransactionInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField
        disabled
        name="accountNo"
        label="Account No"
        fullWidth
      />
      <widgets.TextField
        disabled
        name="accountName"
        label="Name"
        fullWidth
        multiline
      />
      <widgets.TextField
        disabled
        name="payable"
        label="Pay"
        fullWidth
        multiline
      />

      <Button
        disabled={isSubmitting || !isValid}
        label="Confirm"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TransactionInfoPromt = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
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

  const { user } = useUser();
  const { products, getAddress, clearCart } = useCart();

  const [initialValues, setInitialValues] = useState<Transaction>({
    accountName: transaction?.accountName ?? "",
    accountNo: transaction?.accountNo ?? "",
    payable: transaction?.payable ?? "",
  });
  console.log({ initialValues });
  const placeOrderRequest = async (
    transactionData: Transaction,
    { setSubmitting }: any
  ) => {
    try {
      const address = getAddress();
      console.log(transactionData);
      console.log({ products });

      const orderInfo = {
        address,
        products,
        user,
        amount: transaction?.payable,
      };

      const { data } = await axios.post("/api/orders", orderInfo);
      console.log({ data });
      if (data?.transactionId) {
        setOpen(true);
        clearCart();
      }
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h3">Bank Info</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ marginTop: "15px" }}
              variant="text"
              label="Change bank account"
              onClick={() => router.push(`/users/${user?.email}`)}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />
      <formik.Formik
        initialValues={initialValues}
        validationSchema={TransactionInfoSchema}
        validate={extraValidate}
        onSubmit={placeOrderRequest}
      >
        <TransactionInfoForm />
      </formik.Formik>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

const PlaceOrderPage = () => {
  const { products } = useCart();
  const { user } = useUser();
  const { accountNo, accountName } = user || {};
  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    if (accountNo) {
      const total = getTotalPrice({ products });
      setTransaction({
        accountName: accountName,
        accountNo: accountNo,
        payable: `${total}`,
      });
    }
  }, [user, products]);

  console.log({ transaction });

  return (
    <>
      <ShortPageForm>
        {accountNo && transaction && (
          <>
            <TransactionInfoPromt transaction={transaction as Transaction} />
          </>
        )}
        {!accountNo && (
          <>
            <Button
              variant="contained"
              label="Add bank account"
              onClick={() => router.push(`/users/${user?.email}`)}
            />
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
        {() => <PlaceOrderPage />}
      </WrapperPage>
    </>
  );
};

export default Home;
