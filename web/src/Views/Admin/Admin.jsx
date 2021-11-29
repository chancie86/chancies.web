import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

import { saveSection } from '../../actions/headerActions';
import styles from '../../assets/jss/material-kit-react/views/basePageStyle.js';
import { getSections } from '../../selectors/sectionSelectors';
import Page from '../../Components/Page';
import EditSectionDialog from './EditSectionDialog';

const useStyles = makeStyles(styles);

export default function Admin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sections = useSelector((state) => getSections(state));
  const [editSectionId, setEditSectionId] = useState(null);
  const [editSectionTitleValue, setEditSectionTitleValue] = useState(null);

  const onSaveSection = (newTitle) => {
    dispatch(saveSection(editSectionId, newTitle));
  };

  const Header = () => <h1 className={classes.title}>Admin</h1>;

  return (
    <Page HeaderContent={Header}>
      <div className={classes.container}>
        <List subheader={<ListSubheader>Sections</ListSubheader>} className={classes.root}>
          {sections.map((section) => (
            <ListItem key={section.id} button>
              <ListItemText id={section.id} primary={section.name} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setEditSectionId(section.id);
                    setEditSectionTitleValue(section.name);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <EditSectionDialog
        isOpen={Boolean(editSectionId)}
        onClose={() => setEditSectionId(null)}
        onSave={(x) => onSaveSection(x)}
        title={editSectionTitleValue}
      />
    </Page>
  );
}
