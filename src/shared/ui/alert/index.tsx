import { useEffect } from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}
export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-6 z-50 bg-red-500 text-white px-4 py-3 rounded shadow-lg animate-fade-in-up">
      <span>{message}</span>
    </div>
  );
};
