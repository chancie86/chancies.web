import React from "react";

// react component for creating beautiful carousel
import Carousel from "react-slick";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import ExternalLink from '../../../Components/ExternalLink';
import GridContainer from "../../../Components/Grid/GridContainer.js";
import GridItem from "../../../Components/Grid/GridItem.js";
import Card from "../../../Components/Card/Card.js";

import cameraMountImage from "../../../assets/img/projects/3dprinting/cameraMount.jpg";
import cameraMountRingImage from "../../../assets/img/projects/3dprinting/cameraMountRing.jpg";
import cameraMountedImage from "../../../assets/img/projects/3dprinting/cameraMounted.jpg";
import dysonAdaptorImage from "../../../assets/img/projects/3dprinting/dysonAdaptor.jpg";
import dysonAdaptorSanderImage from "../../../assets/img/projects/3dprinting/dysonAdaptorSander.jpg";
import phoneStandImage from "../../../assets/img/projects/3dprinting/phoneStand.jpg";
import phoneStandWithChargerImage from "../../../assets/img/projects/3dprinting/phoneStandWithCharger.jpg";
import guitarPedalSwitchCoverImage from "../../../assets/img/projects/3dprinting/guitarPedalSwitchCover.jpg";
import guitarPedalImage from "../../../assets/img/projects/3dprinting/guitarPedal.jpg";

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function DrawingSection() {
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
      <h2 className={classes.title}>What about making my own objects?</h2>
      <p>
        This were there&apos;s no real shortcuts. You simply have to choose a drawing package and learn how to use it.
        I went with a popular and free package (for hobbyists) called <ExternalLink href="https://www.autodesk.co.uk/products/fusion-360/overview">AutoDesk
        Fusion 360</ExternalLink>. There are free tutorials available which are enough to get you started and you&apos;ll also find loads of helpful guides
        on YouTube. Drawing simply geometric shapes was very easy to pick up, but go deeper than that and it starts to get quite tricky. One object I made
        was an adaptor that allowed me to plug in my Dyson vacuum cleaner into a Makita orbital sander power tool. This required drawing a shape onto
        a cylinder. Learning to draw onto a curved surface was suprisingingly tricky! Here are a few pictures of the models I have made so far.
      </p>
      <GridContainer className={classes.imageCenter}>
        <GridItem xs={12} sm={12} md={9}>
          <Card carousel>
            <Carousel {...carouselSettings}>
              <div>
                <img src={phoneStandImage} alt="Phone stand" className="slick-image" />
                <div className="slick-caption">
                  <h4>Phone stand</h4>
                </div>
              </div>
              <div>
                <img src={phoneStandWithChargerImage} alt="Phone stand with Qi charger" className="slick-image" />
                <div className="slick-caption">
                  <h4>Phone stand with Qi charger</h4>
                </div>
              </div>
              <div>
                <img src={cameraMountImage} alt="Ring camera mount" className="slick-image" />
                <div className="slick-caption">
                  <h4>Ring camera mount</h4>
                </div>
              </div>
              <div>
                <img src={cameraMountRingImage} alt="Ring camera mount with holders" className="slick-image" />
                <div className="slick-caption">
                  <h4>Ring camera mount with holders</h4>
                </div>
              </div>
              <div>
                <img src={cameraMountedImage} alt="Ring camera mounted" className="slick-image" />
                <div className="slick-caption">
                  <h4>Ring camera mounted</h4>
                </div>
              </div>
              <div>
                <img src={dysonAdaptorImage} alt="Dyson adaptor" className="slick-image" />
                <div className="slick-caption">
                  <h4>Dyson adaptor</h4>
                </div>
              </div>
              <div>
                <img src={dysonAdaptorSanderImage} alt="Dyson adaptor with sander" className="slick-image" />
                <div className="slick-caption">
                  <h4>Dyson adaptor with sander</h4>
                </div>
              </div>
              <div>
                <img src={guitarPedalSwitchCoverImage} alt="Replacement guitar stomp pedal switch cover" className="slick-image" />
                <div className="slick-caption">
                  <h4>Replacement guitar stomp pedal switch cover</h4>
                </div>
              </div>
              <div>
                <img src={guitarPedalImage} alt="Guitar pedal with new switch" className="slick-image" />
                <div className="slick-caption">
                  <h4>Guitar pedal with new switch</h4>
                </div>
              </div>
            </Carousel>
          </Card> 
        </GridItem>
      </GridContainer>
      <p>
        In the spirit of sharing I will be making available the models I create on my&nbsp;
        <ExternalLink href="https://www.thingiverse.com/chancie86/designs">thingiverse account</ExternalLink>.
      </p>
    </div>
  );
}
