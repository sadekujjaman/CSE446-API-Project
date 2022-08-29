import React, { ReactNode } from "react";
import {
  Link as MuiLink,
  LinkProps,
  Typography as MuiTypography,
  TypographyProps,
  FormGroup,
  TextFieldProps,
  TextField as MuiTextField,
  FormControlLabel,
} from "@mui/material";

import { Field, Formik, useField } from "formik";

type ReactChildren = { children: ReactNode };
export const Badge = ({ children }: ReactChildren): JSX.Element => (
  <sup className="badge">{children}</sup>
);

export const TextBlock = ({ children }: ReactChildren): JSX.Element => (
  <p className="text-block">{children}</p>
);

export const Subhead = ({ children, ...props }: ReactChildren): JSX.Element => (
  <Typography variant="h6" {...props}>
    {children}
  </Typography>
);

const Typography = ({ children, ...props }: TypographyProps): JSX.Element => (
  <MuiTypography gutterBottom {...props}>
    {children}
  </MuiTypography>
);
const Link = ({ children, ...props }: LinkProps): JSX.Element => (
  <MuiLink {...props}>{children}</MuiLink>
);

interface FieldProps {
  name: string;
  label: ReactNode;
  type?: string;
  fullWidth?: boolean;
  labelInfo?: ReactNode;
  helperText?: ReactNode;
  inline?: boolean;
  disabled?: boolean;
  multiline?: boolean;
}
function makeHelperText(meta: any, helperText: any) {
  const error = meta.touched && meta.error && (
    <span className="error-message">{meta.error}</span>
  );
  return error && helperText ? (
    <div>
      {helperText}
      <br />
      {error}
    </div>
  ) : (
    helperText || error
  );
}
export function TextField({
  name,
  label,
  type,
  labelInfo,
  helperText,
  fullWidth = false,
  inline = false,
  disabled = false,
  multiline = false,
}: FieldProps): JSX.Element {
  function TextFieldElement({ field, ...props }: { field: any }) {
    const { meta = undefined } = { ...props };
    return (
      <MuiTextField
        style={{ margin: "10px" }}
        {...field}
        {...props}
        fullWidth={fullWidth}
        label={label}
        disabled={disabled}
        multiline={multiline}
        helperText={makeHelperText(meta, helperText)}
      />
    );
  }
  return <Field name={name}>{TextFieldElement}</Field>;
}

/* -------------------------------------------------------------------------- */
// Text Area
/* -------------------------------------------------------------------------- */

// export function TextArea({
//   name,
//   label,
//   labelInfo,
//   helperText,
//   large = false,
//   inline = false,
// }: FieldProps): JSX.Element {
//   // TODO use field hook
//   function fieldElement({ field }: { field: any }) {
//     return (
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <MuiTextField
//               {...field}
//               large={large}
//               fill
//               growVertically
//               sx={{
//                 minHeight: "128px",
//                 fontFamily: "unset",
//                 lineHeight: "18px",
//               }}
//             />
//           }
//           label={label}
//         />
//       </FormGroup>
//     );
//   }
//   return <Field name={name}>{fieldElement}</Field>;
// }

export { Typography, Link };
function meta(meta: any) {
  throw new Error("Function not implemented.");
}
