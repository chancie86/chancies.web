import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  radio: {
    color: 'white',
  },
});

export default function ImageSelectorDialog({ isOpen, onSave, onCancel }) {
  const classes = useStyles();

  const imageRefs = useSelector((state) => state.document.imageReferences);
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = React.useState();

  return (
    <Dialog onClose={onCancel} aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle onClose={onCancel}>Select Existing Image</DialogTitle>
      <DialogContent dividers>
        <form>
          <Typography gutterBottom>Select an image to add to the image carousel.</Typography>
          <TextField
            id="caption"
            label="Caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            fullWidth
            style={{ marginBottom: '0.5em' }}
          />
          <RadioGroup>
            <ImageList>
              {Object.keys(imageRefs).map((path) => {
                const image = {
                  path,
                  url: imageRefs[path],
                };

                return (
                  <ImageListItem key={image.path}>
                    <img src={image.url} alt={image.path} />
                    <ImageListItemBar
                      title={image.path}
                      actionIcon={
                        <Radio
                          value={path}
                          selected={selectedImage === path}
                          onChange={() => setSelectedImage(path)}
                          classes={{ colorSecondary: classes.radio }}
                        />
                      }
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </RadioGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onSave(caption, selectedImage)} color="primary">
          Save
        </Button>
        <Button autoFocus onClick={onCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ImageSelectorDialog.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
