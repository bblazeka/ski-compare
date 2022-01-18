import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import React from "react";

type FooterProps = {
  date: Date;
};

const useStyles = makeStyles({
  footer: {
    width: "100%",
    height: "100px",
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerVercelLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  logo: {
    height: "1em",
    marginLeft: "0.5rem",
  },
});

export default function Footer({ date }: FooterProps) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <a
        className={classes.footerVercelLink}
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className={classes.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
      {date && <span>updated: {date.toLocaleString().split("T")[0]}</span>}
    </footer>
  );
}
