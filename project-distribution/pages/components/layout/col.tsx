import { Grid, GridProps } from "@mui/material";

/**
 * Responsive Column (aka \<Grid item /\>)
 * https://mui.com/components/grid/
 * Use inside of a Row (aka \<Grid container /\>)
 *
 * @returns Element
 */
const Col = ({ children, ...props }: GridProps): JSX.Element => {
  return (
    <Grid item {...props}>
      {children}
    </Grid>
  );
};

export { Col };
export type ColProps = GridProps;
