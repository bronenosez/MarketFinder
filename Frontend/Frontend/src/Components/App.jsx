import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import '../styles/index.css';

import Search from "../Pages/Search";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import History from "../Pages/History";

function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/History" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;