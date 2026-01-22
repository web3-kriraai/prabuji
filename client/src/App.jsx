import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Accountability from './pages/Accountability';
import ChaloTirthyatra from './pages/ChaloTirthyatra';
import Login from './pages/Login';
import GaurangaVidhyapitha from './pages/GaurangaVidhyapitha';
import AdminDashboard from './pages/AdminDashboard';
import CounselorDashboard from './pages/CounselorDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="accountability" element={<Accountability />} />
        <Route path="chalo-tirthyatra" element={<ChaloTirthyatra />} />
        <Route path="gauranga-vidhyapitha" element={<GaurangaVidhyapitha />} />
        <Route path="login" element={<Login />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="counselor-dashboard" element={<CounselorDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
