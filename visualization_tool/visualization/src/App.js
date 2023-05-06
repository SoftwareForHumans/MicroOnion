import "./styles/App.css";
import { Routes, Route } from 'react-router-dom';
import Categories from "./pages/Categories";
import Home from"./pages/Home";
import ChooseProject from"./pages/ChooseProject";
import Header from"./components/Header";
import Footer from"./components/Footer";
import Dependencies from './pages/Dependencies';
import ExtractionSequence from "./pages/ExtractionSequence";
import Infrastructure from "./pages/Infrastructure";
import Deployment from "./pages/Deployment";
import Principles from "./pages/Principles";
import ExtractService from "./pages/ExtractService";
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chooseProject" element={<ChooseProject/>}/>
        <Route path="/categories" element={<Categories/>} />
        <Route path="/dependencies" element={<Dependencies/>} />
        <Route path="/extractionSequence" element={<ExtractionSequence/>} />
        <Route path="/extractService" element={<ExtractService/>} />
        <Route path="/infrastructure" element={<Infrastructure/>} />
        <Route path="/deployment" element={<Deployment/>} />
        <Route path="/principles" element={<Principles/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
