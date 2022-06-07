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

const TransactionInfoSchema = Yup.object().shape({
  accountNo: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
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
        name="name"
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

const TransactionInfoPromt = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  console.log({ transaction });
  const [initialValues, setInitialValues] = useState<Transaction>({
    name: transaction?.name ?? "",
    accountNo: transaction?.accountNo ?? "",
    payable: transaction?.payable ?? "",
  });
  console.log({ initialValues });
  const saveProjectInfo = async (
    transactionData: Transaction,
    { setSubmitting }: any
  ) => {
    try {
      console.log(transactionData);
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
        Transaction Info
      </Typography>
      <Divider />
      <formik.Formik
        initialValues={initialValues}
        validationSchema={TransactionInfoSchema}
        validate={extraValidate}
        onSubmit={saveProjectInfo}
      >
        <TransactionInfoForm />
      </formik.Formik>
    </>
  );
};

const TransactionPage = () => {
  const { products } = useCart();
  const { user } = useUser();
  const { bank: bankData } = user || {};
  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    const { bank } = user || {};
    if (bank) {
      const total = getTotalPrice({ products });
      setTransaction({
        name: bank.name,
        accountNo: bank.accountNo,
        payable: `${total}`,
      });
    }
  }, [user, products]);

  //   console.log({ transaction });

  return (
    <>
      <ShortPageForm>
        {bankData && transaction && (
          <>
            <TransactionInfoPromt transaction={transaction as Transaction} />
          </>
        )}
        {!bankData && (
          <>
            <Button variant="contained" label="Add bank account" />
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
        {() => <TransactionPage />}
      </WrapperPage>
    </>
  );
};

export default Home;
