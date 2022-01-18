import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import React from "react";

type WeatherIconProps = {
  icon: string;
  description: string;
};

const useStyles = makeStyles({
  pieChartContainer: {
    margin: "auto 2px 0 2px",
    backgroundColor: "skyblue",
    borderRadius: "18px",
  },
});

export default function WeatherIcon({ icon, description }: WeatherIconProps) {
  const classes = useStyles();
  return (
    <span className={classes.pieChartContainer}>
      <Image
        width={40}
        height={40}
        alt={description}
        title={description}
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      />
    </span>
  );
}
