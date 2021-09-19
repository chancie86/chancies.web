import React from "react";

import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import MaterialDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Dialog({ buttons, children, isOpen, onClose, title }) {
  return (
    <MaterialDialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {buttons.map(b => (
          <Button key={b.key} onClick={b.onClick} color={b.color}>
            {b.content}
          </Button>
        ))}
      </DialogActions>
    </MaterialDialog>
  );
}

Dialog.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      content: PropTypes.node,
      id: PropTypes.string,
      onClick: PropTypes.func
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
};
