import { AddBox, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
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
import { getTotalPrice, useCart } from "./hooks/cart";
import { Typography } from "./components/widgets";
import { Order, Product } from "./types/utils";
import Link from "next/link";
import { ShortPageForm } from "./components/layout/dashboard-wrapper";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderDashboard = () => {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("/api/orders");
      console.log({ data });
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  const simplyfiProductNames = (order) => {
    console.log({ order });
    const names = order.products.map(
      ({ count, product }) => `${product.name} - ${count}x`
    );
    return names.join(",");
  };
  const simplyfiAddress = (order) => {
    console.log({ order });
    const address = `${order.address.city}, ${order.address.area}, ${order.address.houseNo}, ${order.address.phone}`;
    return address;
  };

  return (
    <Box>
      {orders && orders.length > 0 && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Order time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivered time</TableCell>
              <TableCell>TransactionId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell sx={{ textDecoration: "underline" }}>
                  {order?.orderId}
                </TableCell>
                <TableCell>{simplyfiProductNames(order)}</TableCell>
                <TableCell>{simplyfiAddress(order)}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.orderAt}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.status === "delivered" ? order.deliveredAt : "-"}
                </TableCell>
                <TableCell>{order.transactionId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
