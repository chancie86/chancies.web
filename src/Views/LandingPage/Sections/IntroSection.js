import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../../../Components/Grid/GridContainer.js";
import GridItem from "../../../Components/Grid/GridItem.js";
import Button from "../../../Components/CustomButtons/Button.js";
import Card from "../../../Components/Card/Card.js";
import CardBody from "../../../Components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/hoi.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Who am I?</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Hoi Fong Chan
                <br />
                <small className={classes.smallTitle}>Senior Software Engineer</small>
              </h4>
              <CardBody>
              <Button
                  color="transparent"
                  className={classes.margin5}
                  href="https://github.com/chancie86"
                  justIcon
                  target="_blank"
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.linkedin.com/in/hoifongchan/"
                  justIcon
                  target="_blank"
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} container alignItems="center">
            <p className={classes.description}>
              Whilst studying Computer Science MEng in a top 10 ranked university my humbled beginnings began with an internship
              working on mobile OS software at Motorola. Since graduating with a 1st Hons. degree I have accumulated over 10 years experience
              working in a variety of areas including virtualisation, devops, desktop app and full stack web development. I adapt quickly to
              new environments and have used many technologies from backend such as C#, Java, C++, ASP.NET Core, SQL, PowerShell, to the frontend such
              as WPF, WinForms, Javascript, TypeScript, Angular and React. These days I find myself firmly rooted in the .NET world though
              often end up dabbling with some front end too.
            </p>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
