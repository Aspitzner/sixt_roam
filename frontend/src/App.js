import './App.css';
import Navbar from './components/Navbar';
import Landing from './views/Landing';
import Roamer from './views/Roamer'; 
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/roamer" element={<Roamer/>}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 
