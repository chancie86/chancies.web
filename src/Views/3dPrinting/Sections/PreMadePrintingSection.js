import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import benderImage from "../../../assets/img/projects/3dprinting/bender.jpg";

import Card from "../../../Components/Card/Card.js";
import ExternalLink from '../../../Components/ExternalLink';
import GridContainer from "../../../Components/Grid/GridContainer.js";

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function PreMadePrintingSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
  );
  
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Phew, now let's print something!</h2>
      <p>
        Now that the complicated assembly is out the way the printing bit is easy, right?! Sort of, let&apos;s start with the easy stuff.
        So, first off, I didn't buy the additional unit that allows you to send prints via Wi-Fi. The printer needs files in <code>.gcode</code>&nbsp;
        format which are copied onto an SD card first and which is then plugged in to the printer. On the printer you then use the LCD display
        to choose the file to print. The supplied SD card did come with some sample files preloaded and ready to print which are useful to
        test that the printer works.
      </p>
      <p>
        Now to find some cool stuff to print! There are several websites out there where people have already created and uploaded their own 3D models
        to make them freely available for anyone to use. They're easy enough to find on Google, but here&apos;s a few:
      </p>
        <ul>
          <li><ExternalLink href="https://www.prusaprinters.org/">Prusa Printers</ExternalLink></li>
          <li><ExternalLink href="https://www.thingiverse.com/">Thingiverse</ExternalLink></li>
          <li><ExternalLink href="https://cults3d.com//">Cults</ExternalLink></li>
        </ul>
      <p>
        If you download files from these websites you'll quickly find that the most common file format is <code>.stl</code>. The printer
        is unable to use this file type directly to print (more on this later). Prusa Printers, however, has <code>.gcode</code> files available for download
        and there are plenty of useful things on there from toys, hangers, tools, etc. Just download, copy to the SD card, plug it into the printer
        and select it to print. Pretty simple, right? Just ask Bender...
      </p>
      <GridContainer className={classes.imageCenter}>
        <Card className={classes.singleImage}>
          <img src={benderImage} alt="Bender bin" className={imageClasses} style={{ maxHeight: '30em' }} />
        </Card>
      </GridContainer>
      <p>
        It&apos;s worth mentioning that the printer is neither quiet nor fast, despite what the marketing literature would have you believe. I have the
        machine set up in my home office and with the door shut I can still hear it whirring away from downstairs. It&apos;s not too loud though so I can
        happily leave it running overnight in the other room with the door shut without it disturbing my sleep. The Bender bin, above, took 12 hours and
        19 minutes to print. It is relatively tall standing at about 18cm although it is hollow on the inside. When curves are printed it sings to you with
        some weird and delightful digital sounds which make me reminisce about watching The Matrix. Check it out below.
      </p>
      <GridContainer className={classes.imageCenter}>
        <Card className={classes.singleImage}>
          <iframe title="singing" width="560" height="315" src="https://www.youtube.com/embed/hts7AdCdYMU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Card>
      </GridContainer>
    </div>
  );
}
