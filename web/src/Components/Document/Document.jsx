import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

// nodejs library that concatenates classes
import classNames from "classnames";

import parseHtml from "html-react-parser";
import ResponsiveEmbed from "react-responsive-embed";

// @material-ui/core components
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import PublishIcon from '@material-ui/icons/Publish';
import TitleIcon from "@material-ui/icons/Title";
import SubjectIcon from "@material-ui/icons/Subject";

// styles for table of contents
import tocbot from "tocbot/src/js";

// core components
import { showSuccessStatus } from "../../actions/statusActions";
import { useAuth } from "../../Hooks/useAuth";
import Button from "../../Components/CustomButtons/Button";
import Editor from "../../Components/Editor";
import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import HeaderLinks from "../../Components/Header/HeaderLinks.js";
import ImageCarousel from "../../Components/ImageCarousel";
import Parallax from "../../Components/Parallax/Parallax.js";
import styles from "../../assets/jss/material-kit-react/views/basePageStyle.js";
import { getDocument, saveDocument, publishDocument } from "../../actions/documentActions";
import EditTitleDialog from "./EditTitleDialog";
import config from "config.json";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const getDate = dateTime => {
  const date = new Date(dateTime);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

export default function Document({ id }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const mediaMatch = useMediaQuery(theme.breakpoints.up("lg"));
  const [isEditing, setIsEditing] = useState(false);
  const [isEditTitleDialogOpen, setIsEditTitleDialogOpen] = useState(false);

  const document = useSelector(state => state.document);
  const isLoading = useSelector(state => state.document.isLoading);

  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: false,
      scrollSmoothDuration: 1000
    });
  }, [mediaMatch]);

  React.useEffect(() => {
    if (id) {
      dispatch(getDocument(isAuthenticated, id));
    }
  }, [id, dispatch]);

  const onSave = async elements => {
    if (!document) {
      return;
    }

    await dispatch(saveDocument(document.id, document.name, elements, document.section.id))
    dispatch(showSuccessStatus("Saved"));
    await dispatch(getDocument(isAuthenticated, id));
    setIsEditing(false);
  };

  const onSaveTitle = async title => {
    if (!document) {
      return;
    }

    await dispatch(saveDocument(document.id, title, document.elements, document.section.id))
    dispatch(showSuccessStatus("Saved"));
  };

  const getContent = () => {
    let elements = [];

    if (document?.elements) {
      document.elements.forEach(x => {
        switch (x.type) {
          case "Html":
            elements.push(<div key={x.id}>{parseHtml(x.content)}</div>);
            break;
          case "Images":
            elements.push(
              <div key={x.id} style={{ display: "flex" }}>
                <ImageCarousel images={x.images} />
              </div>
            );
            break;
          case "Video":
            elements.push(
              <div key={x.id}>
                <ResponsiveEmbed src={x.url} allowFullScreen />
              </div>
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

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={config.brandName}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
      />
      <Parallax small filter image={require("assets/img/3dprinting.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>{document?.name}</h1>
              <br />
              <p className={classes.title}>{document?.created} {(document?.created !== document?.lastUpdated ? `(updated ${document?.lastUpdated})` : null)}</p>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridItem container alignItems="center">
          <GridItem sm={1} md={2} lg={3}></GridItem>
          <GridItem xs={12} sm={10} md={8} lg={6}>
            <nav
              className={classNames(
                "js-toc",
                classes.toc,
                mediaMatch ? classes.tocVisible : ""
              )}
            />
            {isLoading && <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '10rem' }}>
              <CircularProgress />
            </Grid>}
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
            {!isLoading && !isEditing && document &&
              <div className="js-toc-content" style={{ padding: "70px 0 0 0" }}>
                {isAuthenticated && (
                  <GridContainer justifyContent="flex-end">
                    <Button onClick={() => setIsEditing(true)}>
                      <SubjectIcon />
                      Edit Content
                    </Button>
                    <Button onClick={() => setIsEditTitleDialogOpen(true)}>
                      <TitleIcon />
                      Edit Title
                    </Button>
                    <Button onClick={() => handlePublish(document.id)}>
                      <PublishIcon />
                      {document.published ? "Unpublish" : "Publish"}
                    </Button>
                  </GridContainer>
                )}
                <GridItem>{getContent()}</GridItem>
              </div>
            }
          </GridItem>
          <GridItem sm={1} md={2} xl={3}></GridItem>
        </GridItem>
      </div>
      <Footer />
      <EditTitleDialog
        isOpen={isEditTitleDialogOpen}
        onClose={() => setIsEditTitleDialogOpen(false)}
        onSave={x => onSaveTitle(x)}
        title={document.name}
      />
    </div>
  );
}

Document.propTypes = {
  id: PropTypes.string
};
