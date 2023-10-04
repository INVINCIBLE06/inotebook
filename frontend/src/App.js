// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import NoteState from './context/notes/NoteState';
// import { About } from './components/About';
// import { Home } from './components/Home';

// function App() {
//   return (
//     <>
//       <NoteState>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/">
//               <Home />
//             </Route>
//             <Route exact path="/about">
//               <About />
//             </Route>
//           </Routes>
//         </Router>
//       </NoteState>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import { About } from "./components/About";
import { Home } from "./components/Home";
// import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message="This is a amazing react course"/> */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
