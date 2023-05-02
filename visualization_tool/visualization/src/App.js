import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Project from"./pages/Project";
import Home from"./pages/Home";
import ChooseProject from"./pages/ChooseProject";
import Header from"./Header";
import Footer from"./Footer";
import Sequence from './pages/Sequence';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/chooseProject" element={<ChooseProject/>} exact/>
        <Route path="/project" element={<Project/>} />
        <Route path="/sequence" element={<Sequence/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
