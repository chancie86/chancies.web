import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import ExternalLink from '../../../Components/ExternalLink'

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function Covid19Section() {
  const classes = useStyles();
  
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>What&apos;s this about a PPE shortage?</h2>
      <p>
        The shortage of PPE that the UK and the rest of the world has experienced during the Covid-19 outbreak has been
        well covered in news. About the time I received delivery of my printer I had read a&nbsp;
        <ExternalLink href="https://www.bbc.co.uk/news/technology-52111522">BBC article</ExternalLink> during my research (thanks
        Google Assistant for bubbling it up to me) about a group of 3D printer owners based here in the UK who had pledged to
        use their printers to produce face shields for front line workers. At first I dismissed this on the basis that, at
        the time, I didn&apos;t have a clue what I was doing with it. However, once I had a working printer set up and had achieved
        a couple of prints working one of my friends mentioned it to me in passing and I read into it a bit more.
      </p>
      <p>
        Prusa, the manufacturer of my printer, decided to try to find a way of helping with the PPE shortage using 3D printer technology
        and they came up with a design to create face shields. Each shield has two printed parts, the frame and a bottom reinforcement
        bracket. These are both attached to a transparent plastic sheet and then and piece of elastic is attach to the main frame. Their
        design was approved in the Czech Republic (where they are based) by their Ministry of Health. The designs and <code>.gcode</code>&nbsp;
        for it were released publically and it has been a hit world wide.
      </p>
      <p>
        So all I had to do was download the <code>.gcode</code> and press the print button? But what about the other aspects of it? Materials,
        distribution, the non-printable parts and cleaning? The organisation I had read about,&nbsp;
        <ExternalLink href="https://3dcrowd.org.uk/">3DCrowd UK</ExternalLink>, were expanding nation wide and actively seeking volunteers. They
        are entirely volunteer led and were in the process of setting up regional hubs to deal with all of the logistics. All the printer
        owners had to do is print and get the frames and brackets to the hubs, whether that be by post or via one of the volunteers who do do shuttle
        runs and relays to get parts and materials between places.
      </p>
      <p>
        I signed up and started printing immediately. At the start, a well oiled machine it was not. 3DCrowd UK had amassed thousands of volunteers
        dotted around the country and all working separately in their own homes. Some were lucky enough to have facilities at schools or workplaces
        which were capable of much higher output. Policies were put in place only to be outgrown within a matter of hours forcing them to adapt
        quickly. It really has been an enourmous effort on their behalf and it has been impressive to see it all improve and come together day by day.
      </p>
      <p>
        One of the issues I experienced was the sourcing of filament. We had been advised only to use PLA and PETG though I had read somewhere that
        PLA can melt with some sanitisers so I opted to use PETG. This was fine at first and I quickly used up my 1kg of filament and went to buy
        some more. At this point I discovered that prices for PETG had generally hiked up by around 50% presumably due to increased demand. I was
        forced to switch to PLA due to costs for the time being. Prusa were offering discounted PETG specifically for the purpose of producing PPE,
        which I have ordered 3kg of, though the delivery times are expected to be 2-3 weeks. More recently, I've noticed they've also approved use
        of ABS which will help matters.
      </p>
      <p>
        At time of writing 3DCrowd UK have over 8000 volunteers, made over 102,000 face shields and have had total orders for more than 600,000.
        My tiny contribution to this currently stands at about 100 sets of frames, most of which have already been sent to the local hub for cleaning,
        assembly and distribution. I&apos;ve kindly been sent some pictures of my parts being assembled which is gratifying. Since I also have use of
        a car which has been doing very little since lockdown, I&apos;ve also started to help with distribution, be it delivery of fully assembled shields
        to the front line or distributing materials. Volunteer drivers form a relay so that no one has to drive too far away from their local area.
      </p>
    </div>
  );
}
