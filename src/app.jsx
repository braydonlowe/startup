import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/home';


function App() {
    const AuthState = {
        Authenticated: 'Authenticated',
        Unauthenticated: 'Unauthenticated',
    }
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path = "/" element={<Home/>} />
                </Routes>

            </div>
        
        </BrowserRouter>
    )

}


export default App;