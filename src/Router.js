import React from 'react';
import { BrowserRouter as Router,RouterProvider,Route,Link,Routes, useSearchParams } from 'react-router-dom'
import Login from './Login.js'
import NavBar from './NavBar.js';
import UserHomepage from './UserHomepage.js';

export function RoutesFormat() {
    return (
        <div>
            <Router>
              <NavBar/>
              <Routes>
                <Route path='/' element={ <Login /> }></Route>
                <Route path='/user/:username' element={ <UserHomepage/> }></Route>
                <Route path='/picksboard' element={ <h2>Displays everyone picks</h2> }></Route>
                <Route path='*' element={ <h2>Error that doesn't exist</h2> }></Route>
                </Routes>
            </Router>
        </div>
    );
}
