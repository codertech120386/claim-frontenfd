import { useState } from 'react';

import axios from '../../configs/axios';

const Login = () => {
  const [mobile, setMobile] = useState('');

  const loginClicked = () => {
    axios.post('/sessions/start-session', { mobile });
  };

  return (
    <div>
      <h1>Umang Login</h1>
      <label htmlFor='mobile'>Mobile</label>
      <input
        type='text'
        name='mobile'
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={loginClicked}>Login</button>
    </div>
  );
};

export default Login;
