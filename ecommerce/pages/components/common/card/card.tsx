import { ReactChild, ReactElement, ReactFragment, ReactPortal } from "react";
import {
  Alert,
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  LinearProgress,
} from "@mui/material";

export type CardProps = {
  /**
   * Card actions
   * Renders in footer
   */
  actions?: Array<ReactElement>;
  /**
   * Main card content
   */
  children: boolean | ReactChild | ReactFragment | ReactPortal;
  /**
   * Error
   */
  error?: { message: string };
  /**
   * Header action
   */
  headerAction?: ReactElement;
  /**
   * Optional image to show on top
   */
  image?: string;
  /**
   * Media/image properties
   */
  imageProps?: any;
  /**
   * is card content loading?
   */
  loading?: boolean;
  /**
   * Card subtitle
   */
  subtitle?: string | ReactElement;
  /**
   * Card title
   */
  title?: string | ReactElement;
} & Partial<MuiCardProps>;

/**
 * A wrapper around Material UI Card
 */
const Card = ({
  actions,
  children,
  error,
  headerAction,
  image,
  imageProps,
  loading,
  subtitle,
  title,
  ...props
}: CardProps): ReactElement => (
  <MuiCard {...props}>
    {error && <Alert severity="error">{error.message}</Alert>}
    {loading && <LinearProgress />}
    {title ||
      (headerAction && (
        <CardHeader
          action={headerAction}
          subheader={subtitle}
          title={title}
          titleTypographyProps={{ variant: "h3" }}
        />
      ))}
    {image && <CardMedia {...imageProps} component="img" image={image} />}

    <CardContent>{children}</CardContent>
    <CardActions>{actions}</CardActions>
  </MuiCard>
);

export { Card };
