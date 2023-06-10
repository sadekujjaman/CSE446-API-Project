import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Project } from "../../types/utils";
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
import ImageCard from "../common/card/image-card";
import { modalStyle } from "./commons";
import * as widgets from "../widgets";
import { MultiLineTruncate } from "../layout/dashboard-wrapper";

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

export const SingleProject = (project: Project): JSX.Element => {
  return (
    <Col md={4} sm={6} sx={{ maxHeight: 500 }} xs={12}>
      <ImageCard
        active={project.active}
        image={"/demo-thumbnail.jpg"}
        subtitle={authorsNormalized(
          project.teamInfo?.authors.map((author) => author.name) ?? []
        )}
        title={project.title}
        url={`/projects/${project.id}`}
        queryData={project}
      >
        <Box component="div">
          <MultiLineTruncate maxLines={2}>
            <Typography variant="body1">{project.summary}</Typography>
          </MultiLineTruncate>
          {project.url && (
            <MultiLineTruncate maxLines={1}>
              <MuiLink
                href={`${project.url}`}
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="body1">{project.url}</Typography>
              </MuiLink>
            </MultiLineTruncate>
          )}
        </Box>
      </ImageCard>
    </Col>
  );
};
