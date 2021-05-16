/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import HomeIcon from '@material-ui/icons/Home';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

// core components
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { useAuth } from "Hooks/useAuth";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import AuthButton from "../CustomButtons/AuthButton";
import Button from "../CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  var auth = useAuth();

  const projects = [
    <Link to="/3dPrinting" className={classes.dropdownLink}>
      3D Printing
    </Link>
  ];

  if (auth.isAuthenticated) {
    projects.push(<Link to="/3dPrinting" className={classes.dropdownLink}>
      Add new project
  </Link>)
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
        >
          <HomeIcon />
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Projects"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={WorkOutlineIcon}
          dropdownList={projects}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://github.com/chancie86"
          target="_blank"
          color="transparent"
          className={classes.navLink}
        >
          <i className={classes.socialIcons + " fab fa-github"} />
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.linkedin.com/in/hoifongchan/"
          target="_blank"
          color="transparent"
          className={classes.navLink}
        >
          <i className={classes.socialIcons + " fab fa-linkedin"} />
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <AuthButton />
      </ListItem>
    </List>
  );
}
