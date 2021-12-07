/*eslint-disable*/
import React, { useEffect, useState } from 'react';

// react components for routing our app without refresh
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import history from '../../history';

// @material-ui/core components
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';

// core components
import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import { useAuth } from '../../Hooks/useAuth';
import { createDocument, listSections, listDocuments } from '../../actions/headerActions';
import { showErrorStatus } from '../../actions/statusActions';
import { getIsLoading, getSections } from '../../selectors/sectionSelectors';
import AuthButton from '../CustomButtons/AuthButton';
import Button from '../CustomButtons/Button.js';
import AddDocumentDialog from './AddDocumentDialog';
import HeaderButton from './HeaderButton';

const useStyles = makeStyles(styles);

const SectionDropdown = ({ section, isAuthenticated, showAddDocumentDialog }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const dropDownList = section.documents
    .filter((d) => isAuthenticated || d.published)
    .map((d) => (
      <Link key={d.id} to={`/document/${d.id}`} className={classes.dropdownLink}>
        {d.name}
      </Link>
    ));

  if (isAuthenticated) {
    dropDownList.push(
      <div
        key={`${section.id}-add`}
        onClick={() => showAddDocumentDialog(section.id)}
        className={classes.dropdownLink}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AddIcon fontSize="small" /> New Document
        </div>
      </div>,
    );
  }

  return (
    <ListItem key={section.id} className={classes.listItem}>
      <HeaderButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        {section.name}
        <ArrowDropDownIcon style={{ margin: 0 }} />
      </HeaderButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {dropDownList.map((prop, key) => (
          <MenuItem key={key} onClick={() => setAnchorEl(null)}>
            {prop}
          </MenuItem>
        ))}
      </Menu>
    </ListItem>
  );
};

export default function HeaderLinks() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const sections = useSelector((state) => getSections(state), shallowEqual);
  const isLoading = useSelector((state) => getIsLoading(state));
  const [editSectionId, setEditSectionId] = useState(null);
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = useState(false);

  const handleCreateDocument = async (title) => {
    await dispatch(createDocument(title, editSectionId));
    await dispatch(listDocuments());
  };

  useEffect(() => {
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

  return (
    <>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button href="/" color="transparent" className={classes.navLink}>
            <HomeIcon /> Home
          </Button>
        </ListItem>
        {isLoading ? (
          <ListItem className={classes.listItem} style={{}}>
            <CircularProgress style={{ color: 'inherit', margin: '15px' }} size="1rem" />
          </ListItem>
        ) : (
          sections.map((s) => (
            <SectionDropdown
              section={s}
              key={s.id}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              showAddDocumentDialog={(sectionId) => {
                setEditSectionId(sectionId);
                setIsAddDocumentDialogOpen(true);
              }}
            />
          ))
        )}
        <ListItem className={classes.listItem}>
          <Button
            href="https://github.com/chancie86"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-github'} />
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="https://www.linkedin.com/in/hoifongchan/"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-linkedin'} />
          </Button>
        </ListItem>
        {isAuthenticated && (
          <ListItem className={classes.listItem}>
            <HeaderButton onClick={() => history.push('/admin')}>Admin</HeaderButton>
          </ListItem>
        )}
        <ListItem className={classes.listItem}>
          <AuthButton />
        </ListItem>
      </List>

      <AddDocumentDialog
        isOpen={isAddDocumentDialogOpen}
        onClose={() => setIsAddDocumentDialogOpen(false)}
        onSave={(title) => handleCreateDocument(title)}
      />
    </>
  );
}
