import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import Button from '../CustomButtons';
import { withStyles, withTheme } from '@material-ui/core';

function HeaderButton({ classes, children, isLoading, onClick }) {
  return isLoading ? (
    <Skeleton />
  ) : (
    <Button className={classes.navLink} color="transparent" onClick={onClick}>
      {children}
    </Button>
  );
}

HeaderButton.propTypes = {
  classes: PropTypes.shape({
    navLink: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

HeaderButton.defaultProps = {
  isLoading: false,
};

export default withTheme(withStyles(styles)(HeaderButton));
