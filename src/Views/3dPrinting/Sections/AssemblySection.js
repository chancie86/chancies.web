import React from "react";

// react component for creating beautiful carousel
import Carousel from "react-slick";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import ExternalLink from '../../../Components/ExternalLink';
import GridContainer from "../../../Components/Grid/GridContainer.js";
import GridItem from "../../../Components/Grid/GridItem.js";
import Card from "../../../Components/Card/Card.js";

import boxImage from "../../../assets/img/projects/3dprinting/box.jpg";
import brainsImage from "../../../assets/img/projects/3dprinting/brains.jpg";
import manualImage from "../../../assets/img/projects/3dprinting/manual.jpg";
import eatHariboImage from "../../../assets/img/projects/3dprinting/eatharibo.jpg";
import frameImage from "../../../assets/img/projects/3dprinting/frame.jpg";
import hariboImage from "../../../assets/img/projects/3dprinting/haribo.jpg";
import spaghettiImage from "../../../assets/img/projects/3dprinting/spaghetti.jpg";
import subBoxesImage from "../../../assets/img/projects/3dprinting/subboxes.jpg";
import tadaImage from "../../../assets/img/projects/3dprinting/tada.jpg";

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function AssemblySection() {
  const classes = useStyles();
  
  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 15000,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={classes.section}>
      <h2 id="assembly" className={classes.title}>Some Assembly Required</h2>
      <p>
        Whilst Prusa do have an option where they ship you a pre-built printer, it costed an additional $150 and meant there would a further
        delay in an already long delivery time (they were in exceptionally high demand during the start of the Covid-19 crisis). I figured
        the 'flat pack' self build would give me something to do and it would pretty much be like building IKEA furniture. Well, it was,
        although the instruction manual was 215 A4 pages long! To be fair, it was very spaced out and had lots of helpful pictures so it only
        took a few evenings to complete the build and part of the instructions included eating a bag of Haribo (included).
      </p>
      <GridContainer className={classes.imageCenter}>
        <GridItem xs={12} sm={12} md={9}>
          <Card carousel>
            <Carousel {...carouselSettings}>
              <div>
                <img src={boxImage} alt="Product box" className="slick-image" />
                <div className="slick-caption">
                  <h4>Product box</h4>
                </div>
              </div>
              <div>
                <img src={subBoxesImage} alt="Box contents" className="slick-image" />
                <div className="slick-caption">
                  <h4>What's inside</h4>
                </div>
              </div>
              <div>
                <img src={manualImage} alt="Frame" className="slick-image" />
                <div className="slick-caption">
                  <h4>Assembly manual</h4>
                </div>
              </div>
              <div>
                <img src={hariboImage} alt="Frame" className="slick-image" />
                <div className="slick-caption">
                  <h4>Haribo</h4>
                </div>
              </div>
              <div>
                <img src={frameImage} alt="Frame" className="slick-image" />
                <div className="slick-caption">
                  <h4>Bare frame</h4>
                </div>
              </div>
              <div>
                <img src={eatHariboImage} alt="Frame" className="slick-image" />
                <div className="slick-caption">
                  <h4>Haribo time!</h4>
                </div>
              </div>
              <div>
                <img src={brainsImage} alt="Frame" className="slick-image" />
                <div className="slick-caption">
                  <h4>Brains (Einsy board)</h4>
                </div>
              </div>
              <div>
                <img src={spaghettiImage} alt="Frame" className="slick-image" />
                <div className="slick-caption">
                  <h4>Spaghetti junction. Motors, fans and power wired up</h4>
                </div>
              </div>
              <div>
                <img src={tadaImage} alt="Frame" className="slick-image" />
                <div className="slick-caption">
                  <h4>Tada! The finished product</h4>
                </div>
              </div>
            </Carousel>
          </Card> 
        </GridItem>
      </GridContainer>
      <p>
        The main components here are 3 motors for XYZ axis control respectively, the extruder which heats and spits out the plastic, and the heatbed which is
        a hot metal plate which moves back and forth (controlled by the Y axis motor). The reason the bed is heated (to about 60°C) is because when the plastic
        starts cooling it shrinks and this can cause the object to start warping and lift off the print bed before the object has completed printing. This can
        be further mitigated by ensuring that the print surface is super clean and you can use various chemicals to do this which include anything from window
        cleaning spray to isopropanol, available on Amazon. There are lots of features this particular model includes like the LCD display, SD Card, reader and
        removable/flexible print bed, as well as optional features to add wifi support and to print with multiple plastic materials and/or colours. You read
        about these on the <ExternalLink href="https://www.prusa3d.com/">Prusa website</ExternalLink> if you're interested.
      </p>
    </div>
  );
}
