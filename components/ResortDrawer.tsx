import React, { useState } from "react";
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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { keyBy } from "lodash";
import { useContext } from "react";
import { SkiContext } from "context/SkiContext";

type ResortDrawerProps = {
  readonly resorts: SkiResort[];
  toggleDrawer: any;
  applyChanges: any;
  readonly open: boolean;
};

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function ResortDrawer({
  applyChanges,
  toggleDrawer,
  open,
}: ResortDrawerProps) {
  const { skiResorts } = useContext(SkiContext);
  const visibleSkiResortsList = keyBy(skiResorts, "name");
  function handleClick(checked: boolean, resort: SkiResort) {
    const updatedSelected = {
      ...visibleSkiResorts,
    };
    updatedSelected[resort.name].selected = checked;
    setVisibility(updatedSelected);
  }
  const [visibleSkiResorts, setVisibility] = useState(visibleSkiResortsList);
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
          {skiResorts.map((key: SkiResort, index: number) => (
            <ListItem button key={index}>
              <ListItemAvatar>
                <Avatar>
                  <FilterHdrIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={key.name} secondary={key.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={key.selected}
                  onClick={() => handleClick(!key.selected, key)}
                  color="primary"
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button onClick={() => applyChanges(skiResorts)}>Apply</Button>
      </div>
    </Drawer>
  );
}
