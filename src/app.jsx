import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/home';
import Dashboard from './Pages/Dashboard/dashboard';
import Calendar from './Pages/Calendar/calendar';
import Login from './Pages/LoginRegister/login_register';
import { Header } from './Pages/Components/Header/Header';


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
                    <Route path = "/dashboard" element={<Dashboard />} />
                    <Route path = "/calendar" element={<Calendar />} />
                    <Route path = "/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}


export default App;