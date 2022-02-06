import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import Page from '../../Components/Page';

import styles from '../../assets/jss/material-kit-react/views/basePageStyle.js';

// Sections for this page
import * as Sections from './Sections';

const useStyles = makeStyles(styles);

export default function LandingPage() {
  const classes = useStyles();

  const Header = () => (
    <>
      <h1 className={classes.title}>Welcome.</h1>
      <h4 className={classes.subtitle}>
        Hello, you&apos;ve accidentally stumbled upon my personal website. You poor soul! Joking
        aside, you&apos;ll find some general information about my professional self as well as links
        to social media for getting in touch.
      </h4>
    </>
  );

  return (
    <Page HeaderContent={Header} largeHeader>
      <div className={classes.container}>
        <Sections.Intro />
        <Sections.SummaryInfo />
      </div>
    </Page>
  );
}
