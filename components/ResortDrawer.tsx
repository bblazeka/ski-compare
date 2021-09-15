import React, { useState } from "react";
import clsx from "clsx";
import { keyBy, orderBy } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import RoomIcon from "@material-ui/icons/Room";
import MapIcon from "@material-ui/icons/Map";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
  sortControl: {
    display: "flex",
    justifyContent: "center",
    margin: "0 1vw 0 1vw",
  },
});

export default function ResortDrawer({
  applyChanges,
  toggleDrawer,
  open,
}: ResortDrawerProps) {
  const [sorting, setSorting] = useState("");
  const { skiResorts } = useContext(SkiContext);
  const visibleSkiResortsList = keyBy(skiResorts, "name");
  function handleClick(checked: boolean, resort: SkiResort) {
    const updatedSelected = {
      ...visibleSkiResorts,
    };
    updatedSelected[resort.name].selected = checked;
    setVisibility(updatedSelected);
  }
  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setSorting(event.target.value as string);
  }
  const [visibleSkiResorts, setVisibility] = useState(visibleSkiResortsList);
  const classes = useStyles();
  const skiResortSelection = orderBy(skiResorts, [sorting]);
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
        <FormControl className={classes.sortControl}>
          <InputLabel htmlFor="demo-simple-select-label">
            Sortieren nach
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sorting}
            onChange={handleChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={"distance"}>Distanz</MenuItem>
            <MenuItem value={"slopes.rating"}>Bewertung</MenuItem>
            <MenuItem value={"slopes.total"}>Pisten</MenuItem>
          </Select>
        </FormControl>

        <List>
          {skiResortSelection.map((skiResort: SkiResort, index: number) => (
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
