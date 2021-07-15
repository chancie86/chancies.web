import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: "flex",
        alignItems: "center"
    },
    border: {
        borderBottom: "1px solid black",
        width: "100%"
    },
    content: {
        padding: "0 10px 0 10px"
    }
});

export default function Divider({ children }) {
    const classes = useStyles();
    return (
      <div className={classes.container}>
        <div className={classes.border} />
        <span className={classes.content}>
          {children}
        </span>
        <div className={classes.border} />
      </div>
    );
};

Divider.propTypes = {
  children: PropTypes.node.isRequired,
};
