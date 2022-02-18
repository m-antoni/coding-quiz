import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import QuizA from './components/QuizA';
import QuizB from "./components/QuizB";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz-a" element={<QuizA />} />
          <Route path="/quiz-b" element={<QuizB />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
