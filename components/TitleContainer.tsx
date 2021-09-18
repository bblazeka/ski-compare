import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { loadCSS } from "fg-loadcss";
import Icon from "@material-ui/core/Icon";
import Link from "@material-ui/core/Link";
import { WeatherBadge } from "components";

type TitleContainerProps = {
  resort: any;
};

const useStyles = makeStyles({
  titleContainer: {
    display: "flex",
  },
  statusBar: {
    marginTop: "auto",
    "& > span": {
      marginLeft: "20px",
    },
  },
});

export default function TitleContainer({ resort }: TitleContainerProps) {
  const classes = useStyles();
  React.useEffect(() => {
    const fontAwesomeCss =
      document.querySelector("#font-awesome-css") ?? undefined;
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      fontAwesomeCss as any
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);
  return (
    <>
      <h1>{resort.name}</h1>
      <div className={classes.titleContainer}>
        <span
          style={{ fontSize: 25, fontWeight: 400, margin: "auto 10px 0 0px" }}
        >
          {resort.weather.current.weather[0].description}
        </span>
        <WeatherBadge
          description={resort.weather.current.weather[0].description}
          icon={resort.weather.current.weather[0].icon}
        />
        <span
          style={{ fontSize: 30, fontWeight: 500, margin: "auto 10px 0 10px" }}
        >
          {resort.weather.current.temp.toFixed(0)}°C
        </span>
        <div className={classes.statusBar}>
          <span style={{ fontSize: 20 }}>
            Gefühlte: {resort.weather.current.feels_like.toFixed(0)}°C
          </span>
          <span style={{ fontSize: 20 }}>
            <Icon className="fas fa-wind" style={{ fontSize: 20 }} />{" "}
            {resort.weather.current.wind_speed} m/s
          </span>
          <span style={{ fontSize: 20 }}>
            <Icon className="fas fa-snowflake" style={{ fontSize: 20 }} />{" "}
            {resort.slopes.snow}
          </span>
          <span style={{ fontSize: 20 }}>
            <Icon className="fas fa-skiing" style={{ fontSize: 20 }} />{" "}
            {resort.slopes.liftStatus}
          </span>
          <Link
            style={{ marginLeft: "20px" }}
            href={`https://www.bergfex.at/${resort.key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Mehr details...
          </Link>
        </div>
      </div>
    </>
  );
}
