import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function SummarySection() {
  const classes = useStyles();
  
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Was it worth it?</h2>
      <p>
        In a nutshell, yes! If anyone was interested in getting into 3D printing I would fully support it as a hobby.
        It has gotten to the point where it's cheap enough and easy enough for the regular consumer to pick up. You will,
        like any hobby, need to invest some time and effort into it, but at the end you will be able to craft your own
        pieces for your own practical use or entertainment.
      </p>
    </div>
  );
}
