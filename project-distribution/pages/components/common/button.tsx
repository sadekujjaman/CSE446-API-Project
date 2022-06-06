import { ReactElement } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export type ButtonProps = {
  /**
   * icon
   */
  icon?: ReactElement;
  /**
   * label
   */
  label: string;
  /**
   * loading
   */
  loading?: boolean;
} & Partial<MuiButtonProps>;

const StyledButton = styled(MuiButton)(() => ({
  lineHeight: 1.5,
}));

/**
 * A Button
 */
const Button = ({
  icon,
  label,
  loading,
  ...props
}: ButtonProps): ReactElement => (
  <StyledButton
    aria-label={label}
    color="primary"
    disableElevation
    startIcon={icon}
    variant="outlined"
    {...props}
  >
    {label}
    {loading && <CircularProgress color="inherit" size={14} sx={{ ml: 1 }} />}
  </StyledButton>
);

export { Button };
