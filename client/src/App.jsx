import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/Register';
import Process from './pages/Process';
import ProgramPlan from './pages/ProgramPlan';
import EventSchedule from './pages/EventSchedule';
import Themes from './pages/Themes';
import IdeasSubmission from './pages/IdeaSubmission';

// Placeholder components for other pages
const Placeholder = ({ title }) => (
  <div className="pt-32 pb-20 px-6 text-center min-h-[60vh] flex flex-col items-center justify-center">
    <h1 className="text-4xl font-heading font-bold text-gradient mb-4">{title}</h1>
    <p className="text-gray-400">Coming Soon</p>
  </div>
);

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-hack-base text-gray-100 font-sans selection:bg-hack-accent selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program-plan" element={<ProgramPlan />} />
          <Route path="/event-schedule" element={<EventSchedule />} />
          <Route path="/process" element={<Process />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/register" element={<Register />} />

        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
