import { useState, useEffect } from 'react';

export function useToast(duration = 3000) {
  const [message, setMessage] = useState('');

  const showToast = (text) => {
    setMessage(text);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const Toast = () =>
    message ? (
      <div className="toast show position-fixed bottom-0 end-0 m-3 bg-dark text-white" role="alert">
        <div className="toast-body">{message}</div>
      </div>
    ) : null;

  return { showToast, Toast };
}
