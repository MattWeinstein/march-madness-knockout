import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom';

const GlobalNav = styled.nav`
    display:flex;
    justify-content: space-around;
    color:red;
`

styled(Link)`
    display:flex;
    color:red;
`

function NavBar () {
return(
    <GlobalNav>
        <Link to='/'>Homepage</Link>
        <Link to='/user/:username'>User Page</Link>
        <Link to='/picksboard'>Picks Board</Link>
    </GlobalNav>
)
}


export default NavBar;
