import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Course } from "../../types/utils";
import { WrapperPage } from "./page-wrapper";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Link as MuiLink, Typography } from "../widgets";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  CardContent,
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

export const authorsNormalized = (authors: Array<string>): string =>
  authors.length > 0 ? `by ${authors.join(", ")}` : ``;

export const SingleCourse = (course: Course): JSX.Element => {
  return (
    <Col md={4} sm={6} sx={{ maxHeight: 500 }} xs={12}>
      <ImageCard
        active={true}
        image={"/demo-thumbnail.jpg"}
        subtitle={authorsNormalized(
          course.teachers?.map((author) => author.name) ?? []
        )}
        title={course.name}
        url={`/courses/${course.id}`}
        queryData={course}
      >
        <Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {`Code - ${course.code}`}
          </Typography>
          <MultiLineTruncate maxLines={2}>
            <Typography color="text.secondary" variant="caption">
              {course.description}
            </Typography>
          </MultiLineTruncate>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              sx={{ mb: 1.5, justifyContent: "flex-start" }}
              color="text.secondary"
            >
              {`Credit ${course.credit}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1.5, justifyContent: "flex-end" }}
              color="text.secondary"
            >
              {course.session}
            </Typography>
          </Box>
        </Box>
        {/* </Box> */}
      </ImageCard>
    </Col>
  );
};
