import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
// import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Footer from './components/Footer/Footer';
import './App.css';
import { theme } from './theme';
import trackEvent from './utils/analytics';

function App() {
  useEffect(() => {
    document.body.style.background = `linear-gradient(to right, ${theme.colors.lavender}, ${theme.colors.lightBlue})`;
    trackEvent('Page View', { page: window.location.pathname });
  }, []);

  return (
    <div className="App app-fade-in">
      <Navbar />
      <About />
      {/* <Projects /> */}
      <Experience />
      <Education />
      <Footer />
    </div>
  );
}

export default App;
