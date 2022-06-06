// To help keep spacing consistent across the app.

import { styled } from "@mui/material/styles";

/**
 * To wrap dashboards
 */
const DashboardWrapper = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

/**
 * To wrap anything where the items should be vertically aligned
 */
const VerticalAlignWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

/**
 * To wrap select boxes
 */
const SelectWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  minWidth: 300,
}));

/**
 * For a page containing a short form, such as meta.tsx
 */
const ShortPageForm = styled("div")(({ theme }) => ({
  margin: "0 auto",
  maxWidth: 800,
  paddingTop: theme.spacing(3),
}));

/**
 * multi line truncate
 *
 * TODO
 * - line-clamp is supported by all browsers but IE
 * (including Edge). IE is slated to be discontinued in 2022,
 * but we still might want to adjust this so it works ok for
 * IE.
 */
const MultiLineTruncate = styled("div", {
  shouldForwardProp: (prop) => prop !== "maxLines",
})(({ maxLines }: { maxLines?: number }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkitBoxOrient": "vertical",
  lineClamp: maxLines || 2,
  // space is deliberate workaround: https://github.com/emotion-js/emotion/issues/561
  " -webkit-line-clamp": maxLines || 2,
}));

/**
 * Absolute position
 *
 * TODO
 * - make general absolute positioning util
 */
const AbsoluteRightUpper = styled("div")(() => ({
  position: "absolute",
  padding: 0,
  top: 0,
  right: 0,
}));

export {
  AbsoluteRightUpper,
  DashboardWrapper,
  MultiLineTruncate,
  SelectWrapper,
  ShortPageForm,
  VerticalAlignWrapper,
};
