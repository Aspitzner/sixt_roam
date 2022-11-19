import './App.css';
import Navbar from './components/Navbar';
import Landing from './views/Landing';
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
          <Route path="/" element={<Landing/>}/>
          <Route path="/roamer" element={<Roamer/>}/>
          <Route path="/roamer/success" element={<Feedback/>}/>
          <Route path="/request" element={<Request/>}/>
          <Route path="/release" element={<Request/>}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 
