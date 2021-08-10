import React, { useState } from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ClearIcon from '@material-ui/icons/Clear';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import Button from "../CustomButtons/Button";
import ImageCarousel from '../ImageCarousel';
import ImageSelectorDialog from './ImageSelectorDialog';

const useStyles = makeStyles({
  deleteButton: {
      color: "red"
  }
});

export default function ImageElementEditor({
  images,
  onAdd,
  onUp,
  onDown,
  onRemove
}) {
  const classes = useStyles();
  const [importDialogVisible, setImportDialogVisible] = useState(false);

  const handleSave = (caption, path) => {
    onAdd(caption, path);
    setImportDialogVisible(false);
  };
  
  return (
    <Grid container direction="column">
      <ImageCarousel images={images} />
      <List dense>
        {images.map((x, index) => <ListItem key={x.path}>
          <ListItemIcon>
            <IconButton onClick={() => onRemove(index)} className={classes.deleteButton}>
              <ClearIcon />
            </IconButton>
            {index !== 0 && <IconButton onClick={() => onUp(index)}>
              <ArrowUpwardIcon />
            </IconButton>}
            {(index !== images.length-1) && <IconButton onClick={() => onDown(index)}>
              <ArrowDownwardIcon />
            </IconButton>}
          </ListItemIcon>
          <ListItemText primary={x.path} secondary={x.title} />
        </ListItem>)}
      </List>
      <Button
        onClick={() => setImportDialogVisible(true)}
      >
        <WebAssetIcon /> Add Existing Image
      </Button>
      <ImageSelectorDialog
        isOpen={importDialogVisible}
        onCancel={() => setImportDialogVisible(false)}
        onSave={handleSave}
      />
    </Grid>
  );
};

ImageElementEditor.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string,
  })).isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};
