import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import history from '../../history';
import Button from '../CustomButtons';
import styles from './CookieConsentStyle';

const initialiseGa = () => {
  // Google analytics
  const trackingId = 'UA-165958574-1';
  ReactGA.initialize(trackingId); // Initialize google analytics page view tracking
  history.listen((location) => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
};

const useStyles = makeStyles(styles);

export default function CookieConsent() {
  const cookieSettingsKey = 'cookieSettings';
  const classes = useStyles();
  const [respondedToConsent, setRespondedToConsent] = useState(false);

  const updateConstent = (useGa) => {
    const cookieSettings = {
      useGoogleAnalytics: useGa,
    };

    localStorage.setItem(cookieSettingsKey, JSON.stringify(cookieSettings));

    if (useGa) {
      initialiseGa(history);
    }

    setRespondedToConsent(true);
  };

  useEffect(() => {
    // Check whether cookie consent has been granted
    const settingsValue = localStorage.getItem(cookieSettingsKey);
    if (settingsValue) {
      const settings = JSON.parse(settingsValue);

      // Don't ask for consent again
      setRespondedToConsent(true);

      if (settings.useGoogleAnalytics) {
        initialiseGa(history);
      }
    }
  }, []);

  return (
    respondedToConsent || (
      <Grid className={classes.container}>
        <Grid container>
          <Grid item xs={1} md={2} lg={3} />
          <Grid item xs={10} md={8} lg={6} container className={classes.content}>
            <Grid container className={classes.header}>
              <Icon className={classes.icon}>info_outline</Icon>
              <span className={classes.title}>
                <b>OM NOM NOM</b>. Would you like some cookies?
              </span>
              <Button style={{ marginRight: '1em' }} onClick={() => updateConstent(true)}>
                Allow
              </Button>
            </Grid>
            <IconButton
              className={classes.close}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => updateConstent(false)}
            >
              <Close />
            </IconButton>
            <Grid className={classes.message}>
              <span>
                This site uses Google Analytics which helps to analyze web traffic. This helps to
                understand how the website is being used to improve content. Click &apos;Allow&apos; to grant
                permission to collect tracking information about how you use the website.
              </span>
            </Grid>
          </Grid>
          <Grid item xs={1} md={2} lg={3} />
        </Grid>
      </Grid>
    )
  );
}

CookieConsent.propTypes = {
  history: PropTypes.object.isRequired,
};
