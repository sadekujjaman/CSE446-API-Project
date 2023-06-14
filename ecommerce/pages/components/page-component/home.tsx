import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Course, Product, Project } from "../../types/utils";

import { Container } from "@mui/material";
import { ProductList } from "./product-list";
import { CourseList } from "./course-list";
import { Banner } from "./banner";
import { useUser } from "../../utils/hooks-context";
import { SUPPLIER_API_ROUTE } from "../../utils/constant";

const IntroPage = styled.div`
  .intro__page {
    align-items: center;
    text-align: center;
    color: black;
    font-family: Helvetica;
    font-weight: 300;
    margin: 30px;

    .__intro__title {
      margin-right: auto;
      font-size: 36px;
      font-weight: 600;
      padding: 12px 16px;
      color: #031323;
    }

    .__intro__body {
      font-size: 18px;
      color: black;
      margin-left: 150px;
      margin-right: 150px;
    }
  }
`;

export const Intro = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${SUPPLIER_API_ROUTE}/products/`, {});

      setProducts(data.products);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  };

  return (
    <Container sx={{ maxWidth: "800px", margin: "auto" }}>
      <Banner />
      <IntroPage>
        <div className="intro__page">
          <div className="__intro__title">
            Goodies is now in your next door!
          </div>
          <div className="__intro__body">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </IntroPage>
      {products && products.length > 0 && (
        <>
          {products && products.length > 0 && (
            <ProductList title={"Recommended products"} products={products} />
          )}
        </>
      )}
    </Container>
  );
};
