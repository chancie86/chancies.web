import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import ExternalLink from '../../../Components/ExternalLink';

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function IntroSection() {
  const classes = useStyles();
  
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Intro</h2>
      <p>
        In mid-March 2020 I had just started working from home amid the Covid-19 crisis. Being in the lockdown meant that I would have to find
        more ways to bide the time indoors which was the perfect opportunity to spend time on hobbies and to learn some new things. I picked up the
        guitar for the first time in years and also fixed the bike to enjoy the roads whilst they would be the quietest I'd probably ever see them.
        I also decided that I would buy a piece of tech to play with and it became a toss up between a VR headset and a 3D printer. Despite having a strong
        urge to play Half Life: Alyx, it was the printer that won out. 
      </p>
      <p>
        The idea of 3D printing in itself is simple: draw something in 3D and send it to a printer to make it. However, as a layman, the technicalities
        of it is a bit of a minefield. You don't have to be an expert in anything, but you need to learn just a little bit about <b>how</b> the machine
        creates the object and the <b>material</b> it uses. I won't be going into much technical detail here as I want to focus on my personal experiences
        so that anyone else who is as mystified as I was can perhaps get a sense of what&apos;s involved overall. By far, the most common and cheapest
        type of printer feeds a reel of plastic filament into a&nbsp;
        <ExternalLink href="https://en.wikipedia.org/wiki/Fused_filament_fabrication">fused deposition modeling [FDM]</ExternalLink> printer which works
        like a fancy hot glue gun. The plastic is melted and deposited onto the print bed surface in tiny layers on top of each other which eventually
        add up to form a full object.
      </p>
      <p>
        I reached out to a friend who is a Mechanical Engineer and regularly uses them for prototyping designs. He recommended the&nbsp;
        <ExternalLink href="https://www.prusa3d.com/">Prusa i3 MK3S</ExternalLink>, so after a bit of research on it, I decided they were a&nbsp;
        <ExternalLink href="https://www.youtube.com/watch?v=xX3pDDi9PeU&amp;feature=emb_title">pretty cool company</ExternalLink> and I gleefully bashed the
        buy button!
      </p>
    </div>
  );
}
