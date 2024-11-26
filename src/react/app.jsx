import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './views/Login';
import About from './views/About';
import Play from './views/Play';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/play">Play</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}