import React from "react";

// react component for creating beautiful carousel
import Carousel from "react-slick";

// @material-ui/core components
import Link from '@material-ui/core/Link';
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function PrintingSection() {
  const classes = useStyles();
  
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>But how to do I print <code>.stl</code> files?</h2>
      <p>
        Now that the complicated assembly is out the way the printing bit is easy, right?! Hah, we're just getting started! So first of
        all there's a few things to note. I didn't buy the additional unit that allows you to send prints via Wi-Fi. Anything that is to
        be printed has to be copied onto an SD card first and then plugged in to the printer. On the printer you then use the LCD display
        to choose the file to print. The supplied SD card did come with some sample files loaded and ready to print which are useful to
        test that the printer works. 
      </p>
      <p>
        The file format the printer reads from is <code>.gcode</code>. This contains all the information the printer needs to know to perform
        the print including the speed the motors move, the speed at which the plastic comes out, the temperature of the
        heatbed and extruder, etc. Now, this doesn't really sound very interesting, but it's actually very important for one reason - the
        filament material. As mentioned earlier, you need to learn a little bit about how the printer works and with which material. The extruder
        is fed plastic filament, which is just a reel of plastic. It turns out that plastic isn't just plastic though so when you buy filament you'll
        have to choose what it's made from. There are many different common types available such as ABS, PETG, PLA, nylon, etc. and these all have
        different phyiscal characteristics meaning that they need different speeds and heat to be applied. For instance, PETG requires a temperature
        around 15-30°C hotter than PLA. It also has a tendency to &apos;ooze&apos; when it goes between positions which can result
        in a print that appears to have stringy cobwebs strewn all over it. This can be mitigated by adjusting a setting called &apos;retraction&apos;
        which pulls the filament away from the extrator nozzle when the extractor head is relocating to another position. If this all sounds
        very complicated it's because, well, it is! All these parameters are encoded into the <code>.gcode</code> file which means that each
        of these files is specific for a particular material. The easiest material to use I've come across so far is PLA (and the printer came with) a
        reel of it) and I would recommend sticking with that unless there's a specific need to use something else.
      </p>
      <p>
        Rewinding back to the <code>.gcode</code>... how do we change which material we want to use. Well, to add another layer of complexity,
        3D printers have a simple &apos;print&apos; button like normal printers do. 
      </p>
    </div>
  );
}
