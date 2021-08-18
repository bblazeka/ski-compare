import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";

type ResortDrawerProps = {};

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function ResortDrawer({ resorts, toggleDrawer, open }: any) {
  const classes = useStyles();
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: false,
        })}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {resorts.map((resort: any, index: number) => (
            <ListItem button key={index}>
              <ListItemAvatar>
                <Avatar>
                  <FilterHdrIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={resort.name} secondary={resort.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button onClick={toggleDrawer(false)}>Apply</Button>
      </div>
    </Drawer>
  );
}
