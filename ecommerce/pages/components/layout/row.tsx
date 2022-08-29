import { Grid, GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * Responsive Row (aka \<Grid container /\>)
 * https://mui.com/components/grid/
 *
 * @returns Element
 */
const Row = ({ children, ...props }: GridProps): JSX.Element => (
  <Grid container sx={{ mb: 3 }} {...props}>
    {children}
  </Grid>
);

const PaddedRow = styled(Row)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
}));

export { Row, PaddedRow };
export type RowProps = GridProps;
