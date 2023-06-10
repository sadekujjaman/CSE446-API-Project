import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { WrapperPage } from "./components/page-component/page-wrapper";
import { ProductList } from "./components/page-component/product-list";
import { Product } from "./types/utils";

import { Container } from "@mui/material";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/products/",
      {}
    );

    setProducts(data.products);
  };
  const contents = (
    <Container sx={{ maxWidth: "800px", margin: "auto" }}>
      {products && products.length > 0 && (
        <ProductList title={"Recommended products"} products={products} />
      )}
    </Container>
  );
  return (
    <>
      <WrapperPage title="Goodies">{() => contents}</WrapperPage>
    </>
  );
};

export default Home;
