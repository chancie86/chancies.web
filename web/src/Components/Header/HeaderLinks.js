/*eslint-disable*/
import React, { useState } from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

// core components
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { useAuth } from "Hooks/useAuth";

import { listSections, listDocuments } from "../../actions/headerActions";
import { saveSection } from "../../actions/sectionActions";
import { showErrorStatus } from "../../actions/statusActions";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import AuthButton from "../CustomButtons/AuthButton";
import Button from "../CustomButtons/Button.js";
import EditSectionDialog from "./EditSectionDialog";

const useStyles = makeStyles(styles);

const getSections = state => {
  const sections = state.header.sections.ids.map(id => state.header.sections.byId[id]);
  const result = [];
  
  sections.forEach(s => {
    const docList = state.header.documents.bySectionId[s.id];
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

const SectionDropdown = ({ section, showEdit, showEditDialog }) => {
  const classes = useStyles();

  return <ListItem key={section.id} className={classes.listItem}>
    <CustomDropdown
      noLiPadding
      primaryButtonNode={section.name}
      secondaryButtonNode={showEdit ? <EditIcon /> : null}
      secondaryButtonAction={() => showEditDialog(section.name)}
      buttonProps={{
        className: classes.navLink,
        color: "transparent"
      }}
      buttonIcon={WorkOutlineIcon}
      dropdownList={section.documents.map(d =>
        <Link key={d.id} to={`/document/${d.id}`} className={classes.dropdownLink}>
          {d.name}
        </Link>)
      }
    />
  </ListItem>
};

export default function HeaderLinks() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const sections = useSelector(state => getSections(state));
  const [isEditSectionDialogOpen, setIsEditSectionDialogOpen] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [editSectionTitleValue, setEditSectionTitleValue] = useState(null);
  
  const onSaveSection = async () => {
    await dispatch(saveSection(editSectionId, editSectionTitleValue));
  }

  React.useEffect(() => {
    const load = async () => {
      try {
        await dispatch(listSections());
        await dispatch(listDocuments());
      } catch (error) {
        dispatch(showErrorStatus(error));
      }
    };

    load();
  }, []);

  return <>
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
      {sections.map(s => <SectionDropdown
        section={s}
        key={s.id}
        showEdit={isAuthenticated}
        showEditDialog={(id, title) => {
          setEditSectionId(id)
          setEditSectionTitleValue(title);
          setIsEditSectionDialogOpen(true);
      }} />)}
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
    <EditSectionDialog
      isOpen={isEditSectionDialogOpen}
      title={editSectionTitleValue}
      onClose={() => setIsEditSectionDialogOpen(false)}
      onSave={() => onSaveSection()} />
  </>;
}
