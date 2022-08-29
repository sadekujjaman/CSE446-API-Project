import { AddBox, DeleteOutline } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import { Link as MuiLink } from "./components/widgets";
import { WrapperPage } from "./components/page-component/page-wrapper";
import { getTotalPrice, Transaction, useCart } from "./hooks/cart";
import { Typography } from "./components/widgets";
import { Product } from "./types/utils";
import Link from "next/link";
import { ShortPageForm } from "./components/layout/dashboard-wrapper";
import * as Yup from "yup";
import * as widgets from "./components/widgets";

import * as formik from "formik";
import { useEffect, useRef, useState } from "react";
import { Button } from "./components/common/button";
import { useUser } from "./utils/hooks-context";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import router, { useRouter } from "next/router";
import axios from "axios";
import { modalStyle } from "./components/page-component/commons";

const TransactionInfoSchema = Yup.object().shape({
  accountNo: Yup.string().required("Required"),
  accountName: Yup.string().required("Required"),
  payable: Yup.string().required("Required"),
});

const TransactionInfoForm = ({ isLoading }: { isLoading: boolean }) => {
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
        disabled={isSubmitting || !isValid || isLoading}
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState<string | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);
  const [orderFailed, setOrderFailed] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setModalErrorMessage(null);
  };

  const accountSecretRef = useRef(""); //creating a refernce for TextField Component
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

  const placeOrderRequest = async (
    transactionData: Transaction,
    { setSubmitting }: any
  ) => {
    setModalOpen(true);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }
  const matchSecret = () => {
    const value = accountSecretRef.current.value;
    console.log({ value });
    return value === user?.secret;
  };
  const matchSecretCode = async () => {
    if (matchSecret()) {
      setModalOpen(false);
      setLoading(true);
      setOrderFailed(false);
      try {
        const address = getAddress();

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
          setOrderFailed(false);
          router.push("/orders");
        } else {
          setOpen(true);
          setOrderFailed(true);
        }
      } catch (e) {
        console.log("Error occured during order creation... ", e);
        setOpen(true);
        setOrderFailed(true);
      }
      setLoading(false);
    } else {
      setModalErrorMessage("Secret not match, please try again!");
    }
  };
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
        <TransactionInfoForm isLoading={isLoading} />
      </formik.Formik>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {orderFailed ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Order can not placed! Please check your bank details or contact us!
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Order placed successfully!
          </Alert>
        )}
      </Snackbar>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6">
            Enter account secret
          </Typography>
          {modalErrorMessage && (
            <Typography
              id="modal-modal-title"
              variant="body1"
              sx={{ color: "red" }}
            >
              {modalErrorMessage}
            </Typography>
          )}
          <TextField
            id="outlined-basic"
            label="Secret"
            variant="outlined"
            inputRef={accountSecretRef}
          />

          <MuiButton
            variant="contained"
            // disabled={addingBankAccount}
            onClick={matchSecretCode}
          >
            {"Proceed"}
          </MuiButton>
        </Box>
      </Modal>
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

  return (
    <>
      <ShortPageForm>
        {products && products.length > 0 ? (
          <>
            {accountNo && transaction && (
              <>
                <TransactionInfoPromt
                  transaction={transaction as Transaction}
                />
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
          </>
        ) : (
          <>
            <Typography variant="h4">Your cart is empty!</Typography>
            <MuiLink underline="hover" sx={{ cursor: "pointer" }}>
              <Typography variant="h5">
                <Link href={{ pathname: "/products" }} prefetch={false}>
                  {"Order here"}
                </Link>
              </Typography>
            </MuiLink>
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
