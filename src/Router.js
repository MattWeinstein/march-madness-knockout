import { BrowserRouter as Router,RouterProvider,Route,Link,Routes, useSearchParams } from 'react-router-dom'
import Login from './Login.js'

export function RoutesFormat() {
    return (
        <div>
            <Router>
              <nav>
                <Link to='/'>Homepage</Link>
                <Link to='/user'>User Page</Link>
                <Link to='/picksboard'>Picks Board</Link>
              </nav>
              <Routes>
                <Route path='/' element={ <Login /> }></Route>
                <Route path='/user' element={ <h2>This is the </h2> }></Route>
                <Route path='/user/:username' element={ <h2>This is the </h2> }></Route>
                <Route path='/picksboard' element={ <h2>Displays everyone picks</h2> }></Route>
                <Route path='*' element={ <h2>Error that doesn't exist</h2> }></Route>
                </Routes>
            </Router>
        </div>
    );
}
