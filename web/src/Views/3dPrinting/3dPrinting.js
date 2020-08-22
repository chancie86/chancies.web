import React, { useEffect } from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

// styles for table of contents
import tocbot from 'tocbot/src/js';

// core components
import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import HeaderLinks from "../../Components/Header/HeaderLinks.js";
import Parallax from "../../Components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/projectPage.js";

import config from 'config.json';

// Sections for this page
import * as Sections from "./Sections";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function Printing(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const theme = useTheme();
  const mediaMatch = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: false,
      scrollSmoothDuration: 1000
    });
  }, [mediaMatch]);

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={config.brandName}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/3dprinting.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>3D Printing</h1>
              <br />
              <p className={classes.title}>09 May 2020</p>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridItem container alignItems="center">
          <GridItem sm={1} md={2} lg={3}></GridItem>
          <GridItem xs={12} sm={10} md={8} lg={6}>
            <nav className={classNames('js-toc', classes.toc, (mediaMatch ? classes.tocVisible : ''))} />
            <div className="js-toc-content">
              <Sections.Abstract />
              <Sections.Intro />
              <Sections.Assembly />
              <Sections.PreMadePrinting />
              <Sections.Covid19 />
              <Sections.CustomPrinting />
              <Sections.Drawing />
              <Sections.Summary />
            </div>
          </GridItem>
          <GridItem sm={1} md={2} xl={3}></GridItem>
        </GridItem>
      </div>
      <Footer />
    </div>
  );
}