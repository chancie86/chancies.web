import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EditSectionDialog({ isOpen, onClose, onSave, title }) {
  const [newTitle, setNewTitle] = useState("");

  const handleSave = () => {
    if (newTitle) {
      onSave(newTitle);
      onClose();
    }
  };

  useEffect(() => {
    if (title) {
      setNewTitle(title);
    }
  }, [title]);

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Section Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the new name for this section.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          onChange={event => setNewTitle(event.target.value)}
          value={newTitle}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditSectionDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
