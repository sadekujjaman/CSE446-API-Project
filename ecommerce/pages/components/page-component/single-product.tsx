import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Product, Project } from "../../types/utils";
import { WrapperPage } from "./page-wrapper";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Link as MuiLink, Typography } from "../widgets";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Popover,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Row } from "../layout/row";
import { Col } from "../layout/col";
import ImageCard from "../common/card/image-card";
import { modalStyle } from "./commons";
import * as widgets from "../widgets";
import { MultiLineTruncate } from "../layout/dashboard-wrapper";
import { DeleteOutline } from "@mui/icons-material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useCart } from "../../hooks/cart";

interface SingleProjectProps {
  id: string;
  title: string;
  summary: string;
  team: string;
  active: boolean;
  url?: string;
}
interface Author {
  id: string;
  name: string;
}
export const authorsNormalized = (authors: Array<string>): string =>
  authors.length > 0 ? `by ${authors.join(", ")}` : ``;

export const SingleProduct = (product: Product): JSX.Element => {
  const [isAddedToBag, setAddedToBag] = useState(false);
  const { products, addProduct, deleteProduct } = useCart();
  //   useEffect(() => {
  //     setAddedToBag(products.filter((p) => p.id === product.id).length > 0);
  //   }, [products]);

  const addToBag = () => {
    setAddedToBag(true);
    addProduct(product, 1);
  };
  const removeFromBag = () => {
    setAddedToBag(false);
    deleteProduct(product);
  };

  return (
    <Col md={4} sm={6} sx={{ maxHeight: 500 }} xs={12}>
      <ImageCard
        active={true}
        image={"/demo-thumbnail.jpg"}
        title={product.name}
        url={`/product/${product._id}`}
        queryData={product}
      >
        <Box component="div">
          <MultiLineTruncate maxLines={2}>
            <Typography variant="h6">{`${product.price} Tk`}</Typography>
          </MultiLineTruncate>
          <MultiLineTruncate maxLines={2}>
            <Typography variant="body1">{product.description}</Typography>
          </MultiLineTruncate>

          {!isAddedToBag && (
            <Button
              variant="outlined"
              onClick={addToBag}
              startIcon={<ShoppingBagOutlinedIcon />}
            >
              Add to bag
            </Button>
          )}

          {isAddedToBag && (
            <Button
              variant="outlined"
              onClick={removeFromBag}
              startIcon={<DeleteForeverOutlinedIcon />}
              sx={{ marginTop: "10px" }}
            >
              Remove from bag
            </Button>
          )}
        </Box>
      </ImageCard>
    </Col>
  );
};
