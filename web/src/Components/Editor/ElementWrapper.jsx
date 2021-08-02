import React from "react";
import PropTypes from "prop-types";

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    deleteButton: {
        color: "red"
    }
});
  
export default function ElementWrapper({
  children,
  onUp,
  onDown,
  onDelete
}) {  
  const classes = useStyles();

  return <Grid container direction="column">
    <Grid container justify="flex-end">
        <IconButton onClick={onUp}>
            <ArrowUpwardIcon />
        </IconButton>
        <IconButton onClick={onDown}>
            <ArrowDownwardIcon />
        </IconButton>
        <IconButton onClick={onDelete} className={classes.deleteButton}>
            <DeleteForeverIcon />
        </IconButton>
    </Grid>
    <Grid item style={{ width: "100%" }}>
        {children}
    </Grid>
  </Grid>;
}

ElementWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    onUp: PropTypes.func.isRequired,
    onDown: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
