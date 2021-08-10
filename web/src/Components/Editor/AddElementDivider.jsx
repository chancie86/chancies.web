import React from "react";
import PropTypes from "prop-types";

import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Divider from "../Divider";

export default function AddElementDivider({
    index,
    onAdd
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const showMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleAddHtml = () => {
        onAdd(index, {
            id: uuidv4(),
            type: "Html",
            content: ""
        });
        handleCloseMenu();
    };

    const handleAddImages = () => {
        onAdd(index, {
            id: uuidv4(),
            type: "Images",
            images: []
        });
        handleCloseMenu();
    };

    const handleAddVideo = () => {
        onAdd(index, {
            id: uuidv4(),
            type: "Video",
            url: ""
        });
        handleCloseMenu();
    };

    return <Divider>
        <IconButton onClick={showMenuClick} size="small">
            <AddIcon fontSize="inherit" />
        </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
        >
            <MenuItem onClick={handleAddHtml}>Text</MenuItem>
            <MenuItem onClick={handleAddImages}>Images</MenuItem>
            <MenuItem onClick={handleAddVideo}>Video</MenuItem>
        </Menu>
    </Divider>;
}

AddElementDivider.propTypes = {
    index: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired,
};
