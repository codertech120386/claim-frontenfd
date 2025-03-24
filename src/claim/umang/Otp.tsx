import axios from '../../configs/axios';
import { useState } from 'react';

const Otp = () => {
  const [internalUserId, setInternalUserId] = useState('');
  const [otp, setOtp] = useState('');

  const verifyOtpClicked = () => {
    axios.post('/sessions/submit-otp', { internalUserId, otp });
  };

  return (
    <div>
      <h1>Umang Login</h1>
      <label htmlFor='internalUserId'>Internal User Id</label>
      <input
        type='text'
        name='internalUserId'
        onChange={(e) => setInternalUserId(e.target.value)}
      />
      <label htmlFor='otp'>Otp</label>
      <input type='text' name='otp' onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtpClicked}>Verify Otp</button>
    </div>
  );
};

export default Otp;
