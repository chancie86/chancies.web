import React from "react";

import classNames from 'classnames';

// @material-ui/core components
import Link from '@material-ui/core/Link';
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../../assets/jss/material-kit-react/views/projectPageSections/sectionStyle.js";

const useStyles = makeStyles(styles);

export default function AbstractSection() {
  const classes = useStyles();
  
  return (
    <div className={classes.section}>
      <h2 id="abstract" className={classNames(classes.title, 'js-toc-ignore')}>TL;DR</h2>
      <p>
        Having seen 3D printers at university, industry and trade shows over the last 15 years I always thought it would be cool to have access
        to one. However, there&apos;s always been a few barriers to entry for me. The price was prohibitively expensive, the learning curve too
        high, and the whole thing didn't seem very consumer friendly. I am not someone who works in trade or manufacturing and will probably stare
        at you blankly if you start talking about extruding materials. However, since the early days they&apos;ve become more accessible, reduced
        in price significantly, and the quality of prints have improved along the way. Materials can now be bought on Amazon and there are several
        websites that offer freely available models that are ready to print. Drawing software is also free and there are plenty of videos on YouTube
        to teach you how to use them. I won&apos;t be going into deep technical details here but I wanted to share my initial experiences as a total novice.
      </p>
      <p>
        By the time I finally received and assembled the printer, the Covid-19 lockdown was in full swing and there was a huge shortage of Personal
        Protective Equipment [PPE]. The manufacturers of my printer had come up with a design for a printable face shield that they'd made available.
        3D printer owners around the world were forming groups in a national effort to supply these face shields for whoever needed and reqested them.
        I joined one of these groups, <Link href="https://3dcrowd.org.uk/" target="_blank">3DCrowd UK</Link>, and have been doing my small part in
        printing and delivering these shields to the local community.
      </p>
    </div>
  );
}
