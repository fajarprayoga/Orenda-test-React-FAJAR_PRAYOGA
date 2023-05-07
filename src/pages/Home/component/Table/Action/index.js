import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router';

export default function Action({ edit, funcDelete }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (link = null) => {
        setAnchorEl(null);
        if (link) {
            navigate(link);
        } else {
            funcDelete();
        }
    };

    return (
        <div>
            <IconButton
                id='positioned-demo-button'
                aria-controls={open ? 'positioned-demo-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                variant='outlined'
                color='neutral'
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id='positioned-demo-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-labelledby='positioned-demo-button'
                placement='bottom-end'
            >
                <MenuItem onClick={() => handleClose(edit)}>
                    <ListItemDecorator>
                        <Edit />
                    </ListItemDecorator>{' '}
                    Edit post
                </MenuItem>
                <ListDivider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                    }}
                    variant='soft'
                    color='danger'
                >
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                        <DeleteForever />
                    </ListItemDecorator>{' '}
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}
