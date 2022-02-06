import React from 'react';

// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridContainer from '../../../Components/Grid/GridContainer.js';
import GridItem from '../../../Components/Grid/GridItem.js';
import Button from '../../../Components/CustomButtons/Button.js';
import Card from '../../../Components/Card/Card.js';
import CardBody from '../../../Components/Card/CardBody.js';

import styles from '../../../assets/jss/material-kit-react/views/landingPageSections/introStyle.js';

import team1 from 'assets/img/faces/hoi.jpg';

const useStyles = makeStyles(styles);

export default function IntroSection() {
  const classes = useStyles();
  const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>What do I do?</h2>
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
                  <i className={classes.socials + ' fab fa-github'} />
                </Button>
                <Button
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.linkedin.com/in/hoifongchan/"
                  justIcon
                  target="_blank"
                >
                  <i className={classes.socials + ' fab fa-linkedin'} />
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} container alignItems="center">
            <p className={classes.description}>
              I have been a software developer for over 15 years. At my humbled beginnings I began
              with an internship working on mobile OS software. Since then I have progressed my
              career as an engineer at companies ranging from large multibillion dollar enterprises
              to small startups in a variety of areas including virtualisation, devops, desktop app
              and full stack web development. I adapt quickly to new environments and have used many
              technologies from backend such as C#, Java, C++, ASP.NET Core, SQL, PowerShell, to the
              frontend such as WPF, WinForms, JavaScript, TypeScript, Angular and React. These days
              I find myself firmly rooted in the .NET world though often end up dabbling with
              infrastructure and front end too.
            </p>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
