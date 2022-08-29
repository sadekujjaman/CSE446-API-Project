import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AutoCompleteData, Product, Project } from "../../types/utils";
import { WrapperPage } from "./page-wrapper";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Link as MuiLink, Typography } from "../widgets";
import AddIcon from "@mui/icons-material/Add";
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
import { modalStyle } from "./commons";
import * as widgets from "../widgets";
import { SingleProject } from "./single-project";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { SingleProduct } from "./single-product";

const filter = createFilterOptions();

export const ProductList = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  const [filteredProjects, setFilteredProjects] = useState<Product[]>([]);
  const [projectTitles, setProjectTitles] = useState<AutoCompleteData[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

  const getProjectTitle = (data: Product[]) => {
    const titles: AutoCompleteData[] = data.map((project) => ({
      title: project.name,
    }));
    return titles;
  };

  const addValue = (values: any[], isTitle: boolean) => {
    if (isTitle) {
      setSelectedTitles(values.map((value) => value.title));
    }
  };

  useEffect(() => {
    setFilteredProjects(products);
    setProjectTitles(getProjectTitle(products));
  }, [products]);

  useEffect(() => {
    if (selectedTitles.length === 0) {
      setFilteredProjects(() => products);
    } else {
      setFilteredProjects(() =>
        products.filter((prevProducts) =>
          selectedTitles.includes(prevProducts.name)
        )
      );
    }
  }, [selectedTitles, products]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
        {title}
      </Typography>
      {filteredProjects.length === 0 && (
        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
          No Visible Products
        </Typography>
      )}

      {filteredProjects.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              mb: 2,
            }}
          >
            {" "}
            <Autocomplete
              fullWidth
              multiple
              id="free-solo-with-text-demo"
              onChange={(event, newValue) => {
                addValue(newValue, true);
              }}
              options={projectTitles}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Search by name"
                  placeholder="Name"
                />
              )}
            />
          </Box>
          <Row spacing={3}>
            {filteredProjects.map((props) => (
              <SingleProduct key={props.id} {...props} />
            ))}
          </Row>
        </>
      )}
    </>
  );
};
