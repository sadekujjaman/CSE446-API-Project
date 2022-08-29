import { StarBorder } from "@mui/icons-material";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Link as MuiLink } from "../widgets";

export interface CollapsibleListItem {
  title: string;
  url: string;
  queryData?: any;
}

export interface CollapsibleListProps {
  open: boolean;
  listItems?: CollapsibleListItem[];
}

export const CollapsibleList = ({ open, listItems }: CollapsibleListProps) => {
  const router = useRouter();
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {listItems &&
          listItems.map((item, idx) => (
            <ListItemButton
              key={idx}
              sx={{ pl: 4 }}
              onClick={() =>
                router.push(
                  {
                    pathname: item.url,
                    query: { data: JSON.stringify(item?.queryData) },
                  },
                  {
                    pathname: item.url,
                  }
                )
              }
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        {listItems && listItems.length === 0 && (
          <ListItemButton sx={{ pl: 4 }} disabled>
            <ListItemText primary={"No items"} />
          </ListItemButton>
        )}
      </List>
    </Collapse>
  );
};
