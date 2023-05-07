import React from 'react';
import Sidebar from '../Sidebar';

function Layout({ breadcrum, children }) {
    const width = 112;
    const [openSidebar, setSideBar] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setSideBar(open);
    };
    return (
        <div>
            {/* <h1>Layout</h1> */}
            <Sidebar
                width={width}
                openSidebar={openSidebar}
                toggleDrawer={toggleDrawer}
            />
            {/* <div
                className={`layout before px-5 `}
                style={{ marginLeft: openSidebar ? 250 : width }}
            >
                <div className=' '>
                    {children}
                </div>
            </div> */}

            <div className={` pl-5 `}>
                <div className='h-14 w-full bg-white' />

                <div
                    className='pt-8 pr-5'
                    style={{ marginLeft: openSidebar ? 250 : width }}
                >
                    <h2 className='text-base font-bold'>Customer Page</h2>
                    <div className='breadcrum'>
                        <h6 className='text-slate-500'>
                            {' '}
                            <span
                                className={`${breadcrum ? 'text-red-500' : ''}`}
                            >
                                Main Menu
                            </span>{' '}
                            {`> ${breadcrum}`}
                        </h6>
                    </div>

                    <div className='layout-content bg-white w-full p-4 mt-8'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
