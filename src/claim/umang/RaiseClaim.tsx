import axiosInstance from '../../configs/axios';
import {  isAxiosError } from 'axios';
import { useState } from 'react';

interface ErrorResponse {
  message: string;
  error: string;
  success: false;
}

const ClaimForm = () => {
  const [internalUserId, setInternalUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axiosInstance.post('/sessions/raiseclaim', { internalUserId });
      setMessage(response.data.message);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        setMessage(error.response?.data?.message || 'An error occurred while raising the claim');
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Raise EPF Claim</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='internalUserId'>Internal User ID:</label>
          <input
            type='text'
            id='internalUserId'
            value={internalUserId}
            onChange={(e) => setInternalUserId(e.target.value)}
            required
          />
        </div>

        <button type='submit' disabled={loading}>
          {loading ? 'Raising Claim...' : 'Raise Claim'}
        </button>

        {message && (
          <div style={{ marginTop: '1rem', color: message.includes('successful') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ClaimForm;