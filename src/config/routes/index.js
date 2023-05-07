import React from 'react';
import { BrowserRouter, Routes as RoutesDom, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Create from '../../pages/Home/create';
function Routes() {
    return (
        <BrowserRouter>
            <RoutesDom>
                <Route path='/' index element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/create' element={<Create />} />
                <Route path='/update/:id' element={<Create />} />
            </RoutesDom>
        </BrowserRouter>
    );
}

export default Routes;
