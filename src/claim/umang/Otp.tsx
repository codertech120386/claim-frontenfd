import axiosInstance from '../../configs/axios';
import { useState } from 'react';
import { AxiosError } from 'axios';

interface OtpResponse {
  message: string;
  internalUserId?: string;
  success?: boolean;
  error?: string;
}

interface ErrorResponse {
  message: string;
  error: string;
  success: false;
}

const Otp = () => {
  
  const [otp, setOtp] = useState('');
  const [mobile, setMobileNum] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<OtpResponse | null>(null);
  const [internalUserId, setInternalUserId] = useState(location.state?.internalUserId || '')
  const verifyOtpClicked = async () => {
    try {
      setLoading(true);
      setResponse(null);
     
      const { data } = await axiosInstance.post<OtpResponse>('/sessions/submit-otp', {
        internalUserId,
        otp,
        mobile
      });

      setResponse(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as ErrorResponse;
        setResponse({
          message: errorData?.message || 'OTP verification failed',
          error: errorData?.error || 'An unexpected error occurred',
          success: false
        });
      } else {
        setResponse({
          message: 'OTP verification failed',
          error: 'An unexpected error occurred',
          success: false
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Umang Login</h1>
      <div>
        <label htmlFor='mobile'>Mobile Number</label>
        <input
          type='text'
          id='mobile'
          name='mobile'
          value={mobile}
          onChange={(e) => setMobileNum(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor='internalUserId'>Internal User Id</label>
        <input
          type='text'
          id='internalUserId'
          name='internalUserId'
          value={internalUserId}
          onChange={(e) => setInternalUserId(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor='otp'>OTP</label>
        <input 
          type='text'
          id='otp'
          name='otp'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={loading}
          maxLength={6}
          placeholder="Enter 6-digit OTP"
        />
      </div>

      <button 
        onClick={verifyOtpClicked} 
        disabled={loading || !otp || otp.length !== 6}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {response && (
        <div 
          style={{ 
            marginTop: '1rem',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: response.success ? '#e6ffe6' : '#ffe6e6',
            color: response.success ? 'green' : 'red'
          }}
        >
          <p>{response.message}</p>
          {response.error && <p>{response.error}</p>}
        </div>
      )}
    </div>
  );
};

export default Otp;