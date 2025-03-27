import { useState } from 'react';
import axiosInstance from '../../configs/axios';
import { AxiosError } from 'axios';

interface LoginResponse {
  message?: string;
  otpRequired: boolean;
  internalUserId: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
  internalUserId?: string;
}

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string>('');

  const loginClicked = async () => {
    try {
      setLoading(true);
      setError('');
      setResponse(null);

      const { data } = await axiosInstance.post<LoginResponse>('/sessions/start-session', { mobile });
      console.log('Response:', data); // Debug log
      setResponse(data);
    } catch (err) {
      console.error('Error:', err); // Debug log
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'An error occurred during login');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Umang Login</h1>
      <div>
        <label htmlFor='mobile'>Mobile</label>
        <input
          type='text'
          id='mobile'
          name='mobile'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={loading}
        />
        <button onClick={loginClicked} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      {response && (
        <div style={{ marginTop: '1rem', color: 'green' }}>
          <p>{response.message}</p>
          <p>Internal User ID: {response.internalUserId}</p>
          {response.otpRequired && <p>Please proceed with OTP verification</p>}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;