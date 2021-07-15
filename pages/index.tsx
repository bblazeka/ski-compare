import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../styles/Home.module.css';
import Dashboard from '../components/Dashboard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    name: {
      flexGrow: 1,
      textAlign: 'center'
    }
  }),
);

export default function Home({ data }: any) {
  const classes = useStyles();
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Ski compare</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.name}>
            skivergleich
          </Typography>
          <IconButton color="inherit" aria-label="menu">
            <Link
              color="inherit"
              href="https://github.com/bblazeka/ski-compare"
              target="_blank"
              rel="noopener noreferrer">
              <GitHubIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      {data && data.skiResorts && <Dashboard skiResorts={data.skiResorts} />}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const dev = process.env.NODE_ENV !== 'production';
  
  var host = process.env.VERCEL_URL ?? 'ski-compare.vercel.app';
  host = 'ski-compare.vercel.app';
  const server = dev ? 'http://localhost:3000/api/data' : `https://${host}/api/data`;
  const res = await axios.get(server);
  
  return {
    props: {
      data: res.data
    },
  }
}
