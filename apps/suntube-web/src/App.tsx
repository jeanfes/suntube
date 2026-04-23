import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Home } from './pages/Home';
import { VideoDetail } from './pages/VideoDetail';
import { History } from './pages/History';
import { Favorites } from './pages/Favorites';
import { Search } from './pages/Search';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="st-shell">
        <Header />
        <div className="st-main-container">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="st-viewport">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:id" element={<VideoDetail />} />
              <Route path="/history" element={<History />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
