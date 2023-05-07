import { Close, Inventory } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import * as React from 'react';
import { useNavigate } from 'react-router';
function Sidebar({ width, openSidebar, toggleDrawer }) {
    const navigate = useNavigate();
    const listItem = [
        {
            name: 'Menu',
            icon: openSidebar ? <Close /> : <MenuIcon />,
            text: openSidebar ? 'Open' : 'Close',
            link: '',
        },
        {
            name: 'Customer',
            icon: <Inventory />,
            text: 'Customer',
            link: '/home',
        },
    ];

    return (
        <div
            className='fixed top-0 left-0 bg-red-500 h-[100%]'
            style={{ width: openSidebar ? width + 130 : width }}
        >
            <List>
                {listItem.map((item, index) => (
                    <div
                        key={index}
                        className={`${
                            openSidebar ? 'text-center' : 'text-center'
                        } text-white line mt-4`}
                    >
                        <div
                            className='item mb-8 hover:cursor-pointer'
                            onClick={
                                item.name === 'Menu'
                                    ? toggleDrawer(!openSidebar)
                                    : () => navigate(item.link)
                            }
                        >
                            {item.icon}{' '}
                            {openSidebar && item.name !== 'Menu'
                                ? item.text
                                : null}
                        </div>
                    </div>
                ))}
            </List>
        </div>
    );
}

export default Sidebar;
