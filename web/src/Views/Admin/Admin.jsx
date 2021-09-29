import React, { useState } from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Components/Footer/Footer.js';
import Grid from '@material-ui/core/Grid';
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
import Header from '../../Components/Header/Header.js';
import HeaderLinks from '../../Components/Header/HeaderLinks.js';
import Parallax from '../../Components/Parallax/Parallax.js';
import EditSectionDialog from './EditSectionDialog';

import config from 'config.json';

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

  return (
    <div>
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
      <Parallax filter image={require('assets/img/office-bg.jpg')}>
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Manage</h1>
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
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
      </div>
      <Footer />
      <EditSectionDialog
        isOpen={Boolean(editSectionId)}
        onClose={() => setEditSectionId(null)}
        onSave={(x) => onSaveSection(x)}
        title={editSectionTitleValue}
      />
    </div>
  );
}
