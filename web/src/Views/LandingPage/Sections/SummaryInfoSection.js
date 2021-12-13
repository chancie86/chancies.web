import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import SchoolIcon from '@material-ui/icons/School';

// core components
import ExternalLink from '../../../Components/ExternalLink';
import GridContainer from '../../../Components/Grid/GridContainer.js';
import GridItem from '../../../Components/Grid/GridItem.js';
import NavPills from '../../../Components/NavPills/NavPills.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/pillsStyle.js';

const useStyles = makeStyles(styles);

export default function SummaryInfo() {
  const classes = useStyles();

  return (
    <div>
      <GridContainer direction="column" alignItems="center">
        <h2 className={classes.title}>Summaries</h2>
        <GridItem xs={12} sm={12} md={8} container>
          <NavPills
            color="rose"
            horizontal={{
              tabsGrid: { xs: 12, sm: 4, md: 3, lg: 2 },
              contentGrid: { xs: 12, sm: 12, md: 9, lg: 10 },
            }}
            tabs={[
              {
                tabButton: 'Education',
                tabIcon: SchoolIcon,
                tabContent: (
                  <span>
                    <p>
                      I am extremely proud of my educational achievements. Coming from a migrant
                      family who moved to seek better standards of living and work, I am part of my
                      family&apos;s first generation to attend higher education, let alone be able
                      to complete formal education. Whilst studying in state schools I discovered a
                      passion for science and technology and had tenatively chosen my degree course
                      by the age of 13. By this point, all of my choices of study subjects were
                      guided by the desire to learn more about physics, electronics and computing.
                    </p>
                    <p>
                      I joined the{' '}
                      <ExternalLink href="https://warwick.ac.uk/fac/sci/dcs/">
                        Department of Computer Science
                      </ExternalLink>
                      &nbsp; at{' '}
                      <ExternalLink href="https://warwick.ac.uk/">
                        The University of Warwick
                      </ExternalLink>{' '}
                      which consistently ranks amongst the top 10 UK universities for Computer
                      Science in&nbsp;
                      <ExternalLink href="https://www.thecompleteuniversityguide.co.uk/league-tables/rankings/computer-science">
                        university league tables
                      </ExternalLink>
                      . My optional subject choices included further programming, robotics, and
                      image processing amongst many others. Two years in, I decided to further my
                      time there by switching to a Masters degree course, which I would eventually
                      graduate with 1st Hons.
                    </p>
                  </span>
                ),
              },
              {
                tabButton: 'Work',
                tabIcon: AssignmentIcon,
                tabContent: (
                  <span>
                    <p>
                      During my studies at university I had attended two internship programs. The
                      first was at Motorola where, using Java and C++, I would be working on the
                      Java runtime integration into their mobile applications platform, known
                      as&nbsp;
                      <ExternalLink href="https://en.wikipedia.org/wiki/AJAR_(applications_software_platform)">
                        AJAR
                      </ExternalLink>
                      , which was licensed to many other OEMs (these were the days before iOS and
                      Android existed!). The second placement was with Citrix Systems where I would
                      work on a C++ based metric reporting subsystem in their flagship product,
                      Presentation Server (now Citrix Virtual Apps and Desktops).
                    </p>
                    <p>
                      After graduation I rejoined Citrix full time to start my career where I would
                      stay for nearly 10 years refocusing on C# and other .NET related technologies.
                      Projects varied from application deployment and management, backend service
                      infrastructure, desktop app and front end web development. I also became
                      involved in many side projects including the running of hardware
                      infrastructure, test environments, graduate recruitment and the setup team for
                      the annual Citrix Synergy conferences.
                    </p>
                    <p>
                      After working for a very large company I decided that I wanted experience
                      working for smaller companies. My next position would be at InPhase who have a
                      web based performance management tool. The skills I gained here were mostly
                      related to ASP.NET back end and Razor front end.
                    </p>
                    <p>
                      My position at&nbsp;
                      <ExternalLink href="https://www.hvmd.io">Hivemind</ExternalLink> took me to
                      the world of startups as a full stack software engineer. My first major task
                      was to productize their prediction market product&nbsp;
                      <ExternalLink href="https://www.hvmd.io/agora">AGORA</ExternalLink> to prepare
                      for its beta and full product launches. Later, I would contribute to the
                      Hivemind task platform which helped their clients to create bespoke datasets
                      from messy unstructured data. My time at Hivemind afforded me the opportunity
                      to work on all aspects of the stack including Azure, AWS, Kubernetes, .NET
                      Core and ReactJS.
                    </p>
                  </span>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
