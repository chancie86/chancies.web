import React from "react";

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
            Urls: []
        });
        handleCloseMenu();
    };

    return <Divider>
        <IconButton size="small">
            <AddIcon onClick={showMenuClick} fontSize="inherit" />
        </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
        >
            <MenuItem onClick={handleAddHtml}>Html</MenuItem>
            <MenuItem onClick={handleAddImages}>Image Carousel</MenuItem>
        </Menu>
    </Divider>;
}

