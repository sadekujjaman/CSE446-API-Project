import React, { forwardRef, ReactElement, useState } from "react";
import { Typography, IconButton, styled, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import Box from "@mui/material/Box";
import {
  AbsoluteRightUpper,
  MultiLineTruncate,
} from "../../layout/dashboard-wrapper";
import { Badge } from "../../widgets";
import { Card, CardProps } from "./card";
import { Link as MuiLink } from "../../widgets";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";

export type ImageCardProps = {
  /**
   * Card image/thumbnail
   */
  image?: string;
  /**
   * Icon in top right corner
   */
  icon?: ReactElement;
  /**
   * is the project active? (display thumbnail or badge)
   */
  active?: boolean;
  url: string;
  queryData?: any;
} & CardProps;

const StyledTurnedInIcon = styled(TurnedInIcon)(({ theme }) => ({
  fill: theme.palette.error.main,
  stroke: grey[600],
  strokeWidth: 1,
}));

/**
 * Project card
 *
 * TODO:
 * - rename or make a general image card (e.g. where icon can be anything, not just bookmark)
 * - probably move the action elsewhere, maybe to the footer
 */
const ImageCard = (
  {
    image,
    title,
    subtitle,
    actions,
    children,
    active,
    url,
    queryData,
  }: ImageCardProps,
  ref: any
): JSX.Element => {
  const [bookmarked, setBookmarked] = useState(false);
  // const router = useRouter();
  // const route = {
  //   pathname: url,
  //   query: { data: JSON.stringify(queryData) },
  // };
  // const as = {
  //   pathname: url,
  // };
  return (
    <Card
      actions={actions}
      image={image}
      imageProps={{
        alt: `Thumbnail image showing one of the charts from ${title} landscape`,
        height: "48%",
        sx: { display: "block" },
      }}
      sx={{ position: "relative", height: 370 }}
    >
      {!active && <Badge>Archived</Badge>}

      <AbsoluteRightUpper>
        <IconButton
          aria-label="bookmarked"
          edge="end"
          onClick={() => setBookmarked(!bookmarked)}
          size="small"
        >
          <StyledTurnedInIcon
            fontSize="large"
            sx={!bookmarked ? { fill: grey[300] } : {}}
          />
        </IconButton>
      </AbsoluteRightUpper>
      <MultiLineTruncate>
        {/* <Button
          type="button"
          sx={{
            padding: "0px",
            width: "100%",
            textAlign: "left",
            justifyContent: "start",
          }}
          onClick={() => router.push(route, as)}
        >
          <MuiLink underline="hover" sx={{ cursor: "pointer" }}>
            <Typography variant="h5">{title}</Typography>
          </MuiLink>
        </Button> */}
        <MuiLink underline="hover" sx={{ cursor: "pointer" }}>
          <Typography variant="h5">
            <Link href={{ pathname: url }} prefetch={false}>
              {title ?? ""}
            </Link>
          </Typography>
        </MuiLink>
      </MultiLineTruncate>
      <MultiLineTruncate maxLines={2}>
        <Typography color="text.secondary" variant="caption">
          {subtitle}
        </Typography>
      </MultiLineTruncate>
      <Box component="div">{children}</Box>
    </Card>
  );
};
export default forwardRef(ImageCard);
