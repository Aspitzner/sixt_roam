import './App.css';
import Navbar from './components/Navbar';
import Where from './views/Where';
import About from './views/Where';

import Roamer from './views/Roamer'; 
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Feedback from './views/Feedback';
import Request from './views/Request';
import Release from './views/Release';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
        <Routes>
          <Route path="/" element={<Where/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/roamer" element={<Roamer/>}/>
          <Route path="/roamer/success" element={<Feedback/>}/>
          <Route path="/request" element={<Request/>}/>
          <Route path="/release" element={<Release/>}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 
