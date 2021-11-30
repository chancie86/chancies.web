import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Footer from '../../Components/Footer/Footer.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../assets/jss/material-kit-react/views/basePageStyle.js';
import Header from '../../Components/Header/Header.js';
import HeaderLinks from '../../Components/Header/HeaderLinks.js';
import Parallax from '../../Components/Parallax/Parallax.js';

import config from 'config.json';

const useStyles = makeStyles(styles);

export default function Page({ HeaderContent, headerImageSrc, largeHeader, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Header
        color="transparent"
        brand={config.brandName}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />
      <Parallax small={!largeHeader} filter image={headerImageSrc}>
        <Grid container className={classes.container}>
          <Grid item>
            <HeaderContent />
          </Grid>
        </Grid>
      </Parallax>
      <div className={classNames(classes.main, isMdBreakpoint ? classes.mainRaised : null)}>
        {children}
      </div>
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  HeaderContent: PropTypes.elementType.isRequired,
  headerImageSrc: PropTypes.string,
  largeHeader: PropTypes.bool,
};

Page.defaultProps = {
  HeaderContent: null,
  headerImageSrc: require('assets/img/office-bg.jpg'),
  largeHeader: false,
};
