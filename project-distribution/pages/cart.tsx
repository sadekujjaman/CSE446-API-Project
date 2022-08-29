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
import { Product } from "./types/utils";
import Link from "next/link";
import { ShortPageForm } from "./components/layout/dashboard-wrapper";

const CartDashboard = () => {
  const { products, addProduct, deleteProduct } = useCart();
  const removeProduct = (product: Product) => {
    deleteProduct(product);
  };
  const incrementProduct = (product: Product, count: number) => {
    addProduct(product, count + 1);
  };
  const decrementProduct = (product: Product, count: number) => {
    if (count - 1 < 0) {
      return;
    }
    addProduct(product, count - 1);
  };

  //   console.log({ products });
  return (
    <Box>
      {products && products.length > 0 && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.product._id}>
                <TableCell>
                  <img
                    key={`item-${product.product._id}`}
                    src={"/cashew5.jpg"}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{product.product.name}</TableCell>
                <TableCell>{product.product.price}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={() =>
                      decrementProduct(product.product, product.count)
                    }
                    sx={{ marginRight: "10px" }}
                  >
                    <RemoveIcon fontSize="medium" />
                  </IconButton>
                  {product.count}

                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={() =>
                      incrementProduct(product.product, product.count)
                    }
                    sx={{ marginLeft: "10px" }}
                  >
                    <AddIcon fontSize="medium" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {product.count * (product.product.price ?? 0)}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={() => removeProduct(product.product)}
                  >
                    <ClearIcon fontSize="medium" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow key={"abc"}>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="h5">Total</Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="h5">
                  {getTotalPrice({ products })}
                </Typography>
              </TableCell>
              <TableCell>
                <Button variant="contained">
                  <Link href={{ pathname: "/checkout" }} prefetch={false}>
                    {"Checkout"}
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {!products ||
        (products.length === 0 && (
          <ShortPageForm>
            <Typography variant="h4">Your cart is empty!</Typography>
            <MuiLink underline="hover" sx={{ cursor: "pointer" }}>
              <Typography variant="h5">
                <Link href={{ pathname: "/products" }} prefetch={false}>
                  {"Order here"}
                </Link>
              </Typography>
            </MuiLink>
          </ShortPageForm>
        ))}
    </Box>
  );
};
const Home = () => {
  return (
    <>
      <WrapperPage title="Your Cart">{() => <CartDashboard />}</WrapperPage>
    </>
  );
};

export default Home;
