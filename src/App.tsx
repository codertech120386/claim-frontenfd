import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { EpfoLogin, EpfoOtp } from './claim/epfo';
import { UmangLogin, UmangOtp } from './claim/umang';
import NoPage from './NoPage';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/claim-umang/login' element={<UmangLogin />} />
        <Route path='/claim-umang/otp' element={<UmangOtp />} />
        <Route path='/claim-epfo/login' element={<EpfoLogin />} />
        <Route path='/claim-epfo/otp' element={<EpfoOtp />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
