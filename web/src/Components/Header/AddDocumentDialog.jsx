import React, { useState } from "react";
import PropTypes from "prop-types";

import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

import Dialog from "../Dialog";

export default function AddDocumentDialog({
    isOpen,
    onClose,
    onSave
}) {
    const [title, setTitle] = useState("");

    const buttons = [
        {
            color: "primary",
            content: "Create",
            onClick: () => {
                onSave(title);
                onClose();
            }
        },
        {
            color: "secondary",
            content: "Cancel",
            onClick: onClose
        }
    ];

    return <Dialog isOpen={isOpen} onClose={onClose} buttons={buttons}>
        <DialogContentText>
            Enter a name for the new document.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            onChange={(event) => setTitle(event.target.value)}
            value={title}
        />
    </Dialog>;
};

AddDocumentDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};
