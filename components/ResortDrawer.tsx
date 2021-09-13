import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import RoomIcon from "@material-ui/icons/Room";
import MapIcon from "@material-ui/icons/Map";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { keyBy } from "lodash";
import { useContext } from "react";
import { SkiContext } from "src/SkiContext";

type ResortDrawerProps = {
  readonly resorts: SkiResort[];
  toggleDrawer: any;
  applyChanges: any;
  readonly open: boolean;
};

const useStyles = makeStyles({
  list: {
    width: 350,
    overflowX: "hidden",
  },
  fullList: {
    width: "auto",
  },
  drawerTitle: {
    textAlign: "center",
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
        <Typography variant="h6" className={classes.drawerTitle}>
          Skigebiete
        </Typography>
        <List>
          {skiResorts.map((skiResort: SkiResort, index: number) => (
            <ListItem button key={index}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  alt={skiResort.name}
                  src={skiResort.slopes.logoPath}
                />
              </ListItemAvatar>
              <ListItemText
                primary={skiResort.name}
                secondary={
                  <React.Fragment>
                    <MapIcon fontSize="small" />
                    {`${skiResort.slopes.total} km`}
                    <RoomIcon fontSize="small" />
                    {`${skiResort.distance} km`}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={skiResort.selected}
                  onClick={() => handleClick(!skiResort.selected, skiResort)}
                  color="primary"
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button onClick={() => applyChanges(skiResorts)}>Anwenden</Button>
      </div>
    </Drawer>
  );
}
