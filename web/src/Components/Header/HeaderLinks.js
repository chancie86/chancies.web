/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

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

import { listSections } from "../../actions/sectionActions";
import { listDocuments } from "../../actions/documentActions";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import AuthButton from "../CustomButtons/AuthButton";
import Button from "../CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const getSections = state => {
  const sections = state.sections.ids.map(id => state.sections.byId[id]);
  const result = [];
  
  sections.forEach(s => {
    const docList = state.documents.bySectionId[s.id];
    if (docList) {
      result.push({
        documents: docList,
        id: s.id,
        name: s.name
      });
    }
  });

  return result;
}

export default function HeaderLinks(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const sections = useSelector(state => getSections(state));

  React.useEffect(() => {
    dispatch(listSections()),
    dispatch(listDocuments());
  }, []);

  var auth = useAuth();

  const sectionButtons = sections.map(s => <ListItem className={classes.listItem}>
    <CustomDropdown
      noLiPadding
      buttonText={s.name}
      buttonProps={{
        className: classes.navLink,
        color: "transparent"
      }}
      buttonIcon={WorkOutlineIcon}
      dropdownList={s.documents.map(d =>
        <Link to={`document/${d.id}`} className={classes.dropdownLink}>
          {d.name}
        </Link>)
      }
    />
  </ListItem>)

  // if (auth.isAuthenticated) {
  //   projects.push(<Link to="/Sandbox" className={classes.dropdownLink}>
  //     Add new project
  // </Link>)
  // }

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
      {sectionButtons}
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
