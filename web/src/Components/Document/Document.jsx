import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

// nodejs library that concatenates classes
import classNames from 'classnames';

import parseHtml from 'html-react-parser';
import ResponsiveEmbed from 'react-responsive-embed';

// @material-ui/core components
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import SubjectIcon from '@material-ui/icons/Subject';

// styles for table of contents
import tocbot from 'tocbot/src/js';

// core components
import { showSuccessStatus } from '../../actions/statusActions';
import { useAuth } from '../../Hooks/useAuth';
import Button from '../../Components/CustomButtons/Button';
import Editor from '../../Components/Editor';
import GridContainer from '../../Components/Grid/GridContainer.js';
import GridItem from '../../Components/Grid/GridItem.js';
import ImageCarousel from '../../Components/ImageCarousel';
import Page from '../../Components/Page';
import styles from '../../assets/jss/material-kit-react/views/basePageStyle.js';
import { getDocument, saveDocument, publishDocument } from '../../actions/documentActions';
import { listDocuments } from '../../actions/headerActions';
import EditTitleDialog from './EditTitleDialog';

const useStyles = makeStyles(styles);

const getDate = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function Document({ id }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const mediaMatch = useMediaQuery(theme.breakpoints.up('lg'));
  const [isEditing, setIsEditing] = useState(false);
  const [isEditTitleDialogOpen, setIsEditTitleDialogOpen] = useState(false);

  const document = useSelector((state) => state.document);
  const isLoading = useSelector((state) => state.document.isLoading);
  const isPublished = useSelector((state) => state.header?.documents.byId[id]?.published);

  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: false,
      scrollSmoothDuration: 1000,
    });
  }, [mediaMatch]);

  React.useEffect(
    () => {
      if (!id) {
        return;
      }

      if (!isPublished && !isAuthenticated) {
        return;
      }

      dispatch(getDocument(id));
    },
    // eslint-disable-next-line
    [id, dispatch, isPublished, isAuthenticated]
  );

  const onSave = async (elements) => {
    if (!document) {
      return;
    }

    await dispatch(saveDocument(document.id, document.name, elements, document.section.id));
    dispatch(showSuccessStatus('Saved'));
    await dispatch(getDocument(id));
    setIsEditing(false);
  };

  const onSaveTitle = async (title) => {
    if (!document) {
      return;
    }

    await dispatch(saveDocument(document.id, title, document.elements, document.section.id));
    await dispatch(listDocuments());
    dispatch(showSuccessStatus('Saved'));
  };

  const getContent = () => {
    let elements = [];

    if (document?.elements) {
      document.elements.forEach((x) => {
        switch (x.type) {
          case 'Html':
            elements.push(<div key={x.id}>{parseHtml(x.content)}</div>);
            break;
          case 'Images':
            elements.push(
              <div key={x.id} style={{ display: 'flex' }}>
                <ImageCarousel images={x.images} />
              </div>,
            );
            break;
          case 'Video':
            elements.push(
              <div key={x.id}>
                <ResponsiveEmbed src={x.url} allowFullScreen />
              </div>,
            );
            break;
          default:
            break;
        }
      });
    }

    return elements;
  };

  const handlePublish = (id) => {
    dispatch(publishDocument(id, !document.published));
  };

  if (document?.created) {
    const date = new Date(document.created);
    document.created = getDate(date);
  }

  if (document?.lastUpdated) {
    const date = new Date(document.lastUpdated);
    document.lastUpdated = getDate(date);
  }

  const Header = () => (
    <>
      <h1 className={classes.title}>
        {document?.name}
        {isAuthenticated && (
          <IconButton
            aria-label="Edit title"
            onClick={() => setIsEditTitleDialogOpen(true)}
            style={{ color: 'white' }}
          >
            <EditIcon />
          </IconButton>
        )}
      </h1>
      <br />
      <p className={classes.title}>
        {document?.created}{' '}
        {document?.created !== document?.lastUpdated ? `(updated ${document?.lastUpdated})` : null}
      </p>
    </>
  );

  return (
    <Page HeaderContent={Header}>
      <GridItem container alignItems="center">
        <GridItem sm={1} md={2} lg={3}></GridItem>
        <GridItem xs={12} sm={10} md={8} lg={6}>
          <nav
            className={classNames('js-toc', classes.toc, mediaMatch ? classes.tocVisible : '')}
          />
          {isLoading && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: '10rem' }}
            >
              <CircularProgress />
            </Grid>
          )}
          {!isLoading && isEditing && document && (
            <GridContainer>
              <GridItem>
                <Editor
                  documentElements={document.elements}
                  onSave={onSave}
                  onCancel={() => setIsEditing(false)}
                />
              </GridItem>
            </GridContainer>
          )}
          {!isLoading && !isEditing && document && (
            <div className="js-toc-content" style={{ padding: '70px 0 0 0' }}>
              {isAuthenticated && (
                <GridContainer justifyContent="flex-end">
                  <Button onClick={() => setIsEditing(true)}>
                    <SubjectIcon />
                    Edit Content
                  </Button>
                  <Button onClick={() => handlePublish(document.id)}>
                    <PublishIcon />
                    {document.published ? 'Unpublish' : 'Publish'}
                  </Button>
                </GridContainer>
              )}
              <GridItem>{getContent()}</GridItem>
            </div>
          )}
        </GridItem>
        <GridItem sm={1} md={2} xl={3}></GridItem>
      </GridItem>
      {!!document?.name && (
        <EditTitleDialog
          isOpen={isEditTitleDialogOpen}
          onClose={() => setIsEditTitleDialogOpen(false)}
          onSave={(x) => onSaveTitle(x)}
          title={document.name}
        />
      )}
    </Page>
  );
}

Document.propTypes = {
  id: PropTypes.string,
};
