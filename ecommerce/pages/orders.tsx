import { AddBox, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { getTotalPrice, useCart } from "./hooks/cart";
import { Typography } from "./components/widgets";
import { Order, Product } from "./types/utils";
import Link from "next/link";
import { ShortPageForm } from "./components/layout/dashboard-wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./utils/hooks-context";

const OrderDashboard = () => {
  const [orders, setOrders] = useState<Order[]>();
  const { user } = useUser();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders");
      setOrders(data.orders);
    } catch (err) {
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const simplyfiProductNames = (order: Order) => {
    console.log({ order });
    const names = (order?.products || []).map(
      ({ count, product }) => `${product.name} - ${count}x`
    );
    return names.join(",");
  };
  const simplyfiAddress = (order: Order) => {
    console.log({ order });
    const { address } = order || {};
    const addressStr = `${address?.city}, ${address?.area}, ${address?.houseNo}, ${address?.phone}`;
    return addressStr;
  };

  const handleChange = async (event: SelectChangeEvent, order: Order) => {
    // setAge(event.target.value as string);
    const updatedStatus = event.target.value as string;
    const { data } = await axios.post("/api/orders/updateStatus", {
      orderId: order.orderId,
      updatedStatus,
    });
    if (data?.status === "Ok") {
      await fetchOrders();
    }
  };

  const orderStatus = [
    { name: "Pending", value: "pending" },
    { name: "Accepted", value: "accepted" },
    { name: "Delivered", value: "delivered" },
    { name: "Canceled", value: "canceled" },
  ];

  const getStatusByValue = (value: string) => {
    return orderStatus.filter((s) => s.value === value)[0].name;
  };

  return (
    <Box>
      {orders && orders.length > 0 && (
        <>
          <Typography variant="h6" align="center">
            Your Orders
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "12%" }} align="center">
                  Order Id
                </TableCell>
                <TableCell style={{ width: "12%" }} align="center">
                  Products
                </TableCell>
                <TableCell style={{ width: "12%" }} align="center">
                  Address
                </TableCell>
                <TableCell style={{ width: "12%" }} align="center">
                  Amount
                </TableCell>
                <TableCell style={{ width: "12%" }} align="center">
                  Order time
                </TableCell>
                <TableCell style={{ width: "12%" }} align="center">
                  Status
                </TableCell>
                <TableCell style={{ width: "12%" }} align="center">
                  Delivered time
                </TableCell>
                <TableCell style={{ width: "12%" }} align="center">
                  TransactionId
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell
                    style={{ width: "12%" }}
                    align="center"
                    sx={{ textDecoration: "underline" }}
                  >
                    {order?.orderId}
                  </TableCell>
                  <TableCell style={{ width: "12%" }} align="center">
                    {simplyfiProductNames(order)}
                  </TableCell>
                  <TableCell style={{ width: "12%" }} align="center">
                    {simplyfiAddress(order)}
                  </TableCell>
                  <TableCell style={{ width: "12%" }} align="center">
                    {order.amount}
                  </TableCell>
                  <TableCell style={{ width: "12%" }} align="center">
                    {order.orderAt}
                  </TableCell>
                  <TableCell style={{ width: "12%" }} align="center">
                    {user?.isSupplier ? (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={order.status}
                          label="Status"
                          onChange={(e) => handleChange(e, order)}
                        >
                          {/* <MenuItem value={10}>Ten</MenuItem>
                     <MenuItem value={20}>Twenty</MenuItem>
                     <MenuItem value={30}>Thirty</MenuItem> */}
                          {orderStatus.map((s) => (
                            <MenuItem value={s.value}>{s.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <>{getStatusByValue(order.status as string)}</>
                    )}
                  </TableCell>
                  <TableCell style={{ width: "12%" }} align="center">
                    {order.status === "delivered" ? order.deliveredAt : "-"}
                  </TableCell>

                  <TableCell style={{ width: "12%" }} align="center">
                    {order.transactionId}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {!orders ||
        (orders.length === 0 && (
          <>
            <Typography variant="h4">No Orders!</Typography>
            <MuiLink underline="hover" sx={{ cursor: "pointer" }}>
              <Typography variant="h5">
                <Link href={{ pathname: "/products" }} prefetch={false}>
                  {"Order here"}
                </Link>
              </Typography>
            </MuiLink>
          </>
        ))}
    </Box>
  );
};
const Home = () => {
  return (
    <>
      <WrapperPage title="Orders">{() => <OrderDashboard />}</WrapperPage>
    </>
  );
};

export default Home;
