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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

// core components
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { useAuth } from "Hooks/useAuth";

import { createDocument, listSections, listDocuments, saveSection } from "../../actions/headerActions";
import { showErrorStatus } from "../../actions/statusActions";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import AuthButton from "../CustomButtons/AuthButton";
import Button from "../CustomButtons/Button.js";
import AddDocumentDialog from "./AddDocumentDialog";
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

const SectionDropdown = ({ section, isAuthenticated, showSectionEditDialog, showAddDocumentDialog }) => {
  const classes = useStyles();

  const dropDownList = section.documents.map(d =>
    <Link key={d.id} to={`/document/${d.id}`} className={classes.dropdownLink}>
      {d.name}
    </Link>);

  if (isAuthenticated) {
    dropDownList.push(<Link key={`${section.id}-add`} onClick={() => showAddDocumentDialog(section.id)} className={classes.dropdownLink}>
      <div style={{
        display: "flex",
        alignItems: "center"
      }}>
        <AddIcon fontSize="small" /> New Document
      </div>
    </Link>);
  }

  return <ListItem key={section.id} className={classes.listItem}>
    <CustomDropdown
      noLiPadding
      primaryButtonNode={section.name}
      secondaryButtonNode={isAuthenticated ? <EditIcon /> : null}
      secondaryButtonAction={() => showSectionEditDialog(section.id, section.name)}
      buttonProps={{
        className: classes.navLink,
        color: "transparent"
      }}
      buttonIcon={WorkOutlineIcon}
      dropdownList={dropDownList}
    />
  </ListItem>
};

export default function HeaderLinks() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const sections = useSelector(state => getSections(state));
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = useState(false);
  const [isEditSectionDialogOpen, setIsEditSectionDialogOpen] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [editSectionTitleValue, setEditSectionTitleValue] = useState(null);
  
  const onSaveSection = async (newTitle) => {
    await dispatch(saveSection(editSectionId, newTitle));
  }

  const handleCreateDocument = async (title) => {
    await dispatch(createDocument(title, editSectionId))
    await dispatch(listDocuments());
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
        isAuthenticated={isAuthenticated}
        showSectionEditDialog={(id, title) => {
          setEditSectionId(id)
          setEditSectionTitleValue(title);
          setIsEditSectionDialogOpen(true);
        }}
        showAddDocumentDialog={(sectionId) => {
          setEditSectionId(sectionId);
          setIsAddDocumentDialogOpen(true);
        }}
      />)}
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
      onClose={() => setIsEditSectionDialogOpen(false)}
      onSave={(x) => onSaveSection(x)}
      title={editSectionTitleValue}
    />
    <AddDocumentDialog
      isOpen={isAddDocumentDialogOpen}
      onClose={() => setIsAddDocumentDialogOpen(false)}
      onSave={(title) => handleCreateDocument(title)}
    />
  </>;
}
