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
        Yes, absolutely! It&apos;s not yet as simple as a regular desktop printer where you can buy one
        from the shop, take a picture on your phone and then send it straight to the printer to make. That would be super
        cool if you could replicate 3D objects like that!
      </p>
      <p>
        If anyone was interested in getting into 3D printing I would fully support it as a hobby but you need a little bit
        of technical know-how. It has gotten to the point where it's cheap enough and easy enough for the regular consumer
        to pick up. You will, like any hobby, need to invest some time and effort into it, but at the end you will be able to
        craft your own pieces for practical use or entertainment.
      </p>
    </div>
  );
}
