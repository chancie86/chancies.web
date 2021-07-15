import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

// nodejs library that concatenates classes
import classNames from "classnames";

import parseHtml from 'html-react-parser';

// @material-ui/core components
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import EditIcon from "@material-ui/icons/Edit";

// styles for table of contents
import tocbot from "tocbot/src/js";

// core components
import { useAuth } from "../../Hooks/useAuth";
import Button from "../../Components/CustomButtons/Button";
import Editor from "../../Components/Editor";
import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import HeaderLinks from "../../Components/Header/HeaderLinks.js";
import Parallax from "../../Components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/basePageStyle.js";

import { getDocument, saveDocument } from "../../actions/documentActions";

import config from "config.json";
import { showSuccessStatus } from "actions/statusActions";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const getDate = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default function Document({ id }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const mediaMatch = useMediaQuery(theme.breakpoints.up("lg"));
  const [isEditing, setIsEditing] = useState(false);

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
      dispatch(getDocument(id));
    }
  }, [id]);

  const onSave = async elements => {
    if (!document) {
      return;
    }

    await dispatch(saveDocument(document.id, document.name, elements, document.section.id))
    dispatch(showSuccessStatus("Saved"));
    await dispatch(getDocument(id));
    setIsEditing(false);
  };

  const document = useSelector(state => state.document);
  const isLoading = useSelector(state => state.isLoading);

  const getContent = () => {
    let elements = [];

    if (document?.elements) {
      document.elements.forEach(x => 
        {
          switch(x.type) {
            case "Html":
              elements.push(<div key={x.id}>{parseHtml(x.content)}</div>);
              break;
            case "Images":
              elements.push(<div key={x.id}>"images"</div>);
              break;
          }
        });
    }

    return elements;
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
              <p className={classes.title}>{document?.created} {(document?.created != document?.lastUpdated ? `(updated ${document?.lastUpdated})` : null)}</p>
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
            {isLoading && <CircularProgress />}
            {!isLoading && isEditing && document
            ? (
              <GridContainer>
                <GridItem>
                  <Editor
                    documentElements={document.elements}
                    onSave={onSave}
                    onCancel={() => setIsEditing(false)}
                  />
                </GridItem>
              </GridContainer>
            ) : (
              <div className="js-toc-content" style={{ padding: "70px 0 0 0" }}>
                {isAuthenticated && (
                  <GridContainer justify="flex-end">
                    <Button onClick={() => setIsEditing(true)}>
                      <EditIcon />
                      Edit Content
                    </Button>
                  </GridContainer>
                )}
                <GridItem>{getContent()}</GridItem>
              </div>
            )}
          </GridItem>
          <GridItem sm={1} md={2} xl={3}></GridItem>
        </GridItem>
      </div>
      <Footer />
    </div>
  );
}

Document.propTypes = {
  id: PropTypes.string
};
