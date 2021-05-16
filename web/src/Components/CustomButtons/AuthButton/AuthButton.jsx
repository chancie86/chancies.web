import React from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import Button from '../Button';
import { withStyles, withTheme } from "@material-ui/core";

//const useStyles = makeStyles(styles);

function AuthButton({classes}) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated
    ? <Button
        className={classes.navLink}
        color="transparent"
        onClick={() => logout()}
      >
        Logout
      </Button>
    : <Button
        className={classes.navLink}
        color="transparent"
        onClick={() => loginWithRedirect()}
      >
        Login
      </Button>
}

AuthButton.propTypes = {
  classes: PropTypes.shape({
    navLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTheme(withStyles(styles)(AuthButton));
