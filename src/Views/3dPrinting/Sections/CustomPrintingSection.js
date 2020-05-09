import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Card from "../../../Components/Card/Card.js";
import ExternalLink from "../../../Components/ExternalLink";
import GridContainer from "../../../Components/Grid/GridContainer.js";

import websImage from "../../../assets/img/projects/3dprinting/webs.jpg";
import benderSlicedImage from "../../../assets/img/projects/3dprinting/benderSliced.png";

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function CustomPrintingSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
  );
  
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>But how to do I print those <code>.stl</code> files?</h2>
      <p>
        Previously, I mentioned that <code>.stl</code> files are commonly distributed by people sharing 3D drawings they've made such as those
        distributed on <ExternalLink href="https://www.thingiverse.com/">thingiverse</ExternalLink>. <code>.stl</code> files describe an object only
        by specifying its surface geometry. The file format the printer reads is <code>.gcode</code> which contains all the information the printer needs
        to know to perform the print including the speed the motors move, the speed at which the plastic comes out, the temperature of the
        heatbed and extruder, etc. Now, this doesn't sound very interesting but it's actually very important for one reason - the
        filament material. I mentioned at the start that you need to learn a little bit about <b>how</b> the machine prints and with which <b>material</b>.
        Let&apos;s have a skim over the details. The extruder is fed plastic filament, which is just a reel of plastic. It turns out not all plastics are equal
        so when you buy filament you will have to choose what it&apos;s made from. There are many different common types available such
        as ABS, PETG, PLA, nylon, etc. and these all have different physical characteristics meaning that they need different speeds and heat to be applied.
        For instance, PETG requires a temperature around 15-30°C hotter than PLA. It also has a tendency to ooze when it goes between positions
        which can result in a print that appears to have stringy cobwebs strewn all over it. This can be mitigated by adjusting a setting called <b>retraction</b>;
        which pulls the filament away from the extrator nozzle when the extractor head is relocating to another position.
      </p>
      <GridContainer className={classes.imageCenter}>
        <Card className={classes.singleImage}>
          <img src={websImage} alt="Cobwebs" className={imageClasses} style={{ maxHeight: '30em' }} />
        </Card>
      </GridContainer>
      <p>
        If this all sounds very complicated it's because, well, it is! All these parameters are encoded into the <code>.gcode</code> file which means that each
        of these files is specific for a particular material and potentially even a specific printer. The easiest material to use I've come across so far is PLA 
        (and the Prusa came with a reel of it included) so I would recommend sticking with that unless there's a specific need to use something else.
      </p>
      <p>
        So how do we go about taking a <code>.stl</code> file and adding all of the necessary info to create a printable <code>.gcode</code> file? This is where&nbsp;
        <b>slicers</b> come into play. A slicer is an app which can import a model, including an <code>.stl</code>, and provides the tools you need to specify
        all the necessary parameters. Prusa has a free one called PrusaSlicer which is very easy to use. In the simplest case, you simply import your model,
        select one of the built in profiles that represents your material, e.g. &apos;Generic PLA&apos;, and then hit the &apos;Slice Now&apos; button. You can
        then export the <code>.gcode</code> straight to an SD card and it's ready to print.
      </p>
      <p>
        The profiles are a great starting point but once you get more experienced it&apos;s useful to start modifying some of the individual parameters. For instance,
        you can change the amount of <b>infill</b> in your print. Consider printing a simple cube... the plastic that&apos;s laid down usually doesn't form a solid
        structure inside the six faces. Rather, it is hollowed out and filled with intricate patterns inside to ensure structure. The slicer generates this for you
        and the way in which it generates these patterns is configurable. You may also want to adjust things like the height of the layers and speed of the motors.
        All of these options have an effect on how much material is used and how long the print takes.
      </p>
      <GridContainer className={classes.imageCenter}>
        <Card className={classes.singleImage}>
          <img src={benderSlicedImage} alt="Bender Sliced" className={imageClasses} style={{ maxHeight: '30em' }} />
        </Card>
      </GridContainer>
      <p>
        The final thing about slicing I wanted to mention is <b>supports</b>. An FDM printer prints by putting layers on top of each other. But what happens when your
        model has an overhang with nothing underneath it, perhaps like a bridge or the letter T? There is nothing underneath the parts that overhang, so nothing for
        the new layer to be placed on top of. That's where supports come in. The idea is that they are temporary structures that the slicer generates for you which use
        a minimal amount of materal and are easy to snap away after the print is complete. The support structures give the overhanging parts of the model something to
        rest on. In practice, sometimes they work well and other times they are difficult to remove but either way, they are necessary. It simply depends on your model
        and where the support is generated. It&apos;s also worth mentioning that the support does attach to the model so when you snap it off it will leave bits of plastic
        on the surface of the printed part which you may have to smooth off with tools like a knife or a file. You don&apos;t need supports for all overhangs, though.
        Generally the rule of thumb is that you can get away for up to a 45° overhang without supports.
      </p>
    </div>
  );
}
