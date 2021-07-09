import React from "react";
import PropTypes from "prop-types";

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Button from "../CustomButtons/Button";

const useStyles = makeStyles({
    button: {
        width: '1em'
    },
    child: {
        outline: "2px solid #F3F3F3"
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
        <Button color="primary" onClick={onUp} className={classes.button}>
            <ArrowUpwardIcon />
        </Button>
        <Button color="primary" onClick={onDown} className={classes.button}>
            <ArrowDownwardIcon />
        </Button>
        <Button color="danger" onClick={onDelete} className={classes.button}>
            <DeleteForeverIcon />
        </Button>
    </Grid>
    <Grid item>
        <div className={classes.child}>{children}</div>
    </Grid>
  </Grid>;
}

ElementWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    onUp: PropTypes.func.isRequired,
    onDown: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
