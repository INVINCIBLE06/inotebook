import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Home from './components/Home';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
