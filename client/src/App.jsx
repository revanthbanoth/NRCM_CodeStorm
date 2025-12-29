import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import EventSchedule from './pages/EventSchedule';
import ProgramPlan from './pages/ProgramPlan';
import Process from './pages/Process';
import Themes from './pages/Themes';
import Register from './pages/Register';
import IdeaSubmission from './pages/IdeaSubmission';
import Schedule from './pages/Schedule';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-purple-500/30 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-schedule" element={<EventSchedule />} />
          <Route path="/program-plan" element={<ProgramPlan />} />
          <Route path="/process" element={<Process />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/idea-submission" element={<IdeaSubmission />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
