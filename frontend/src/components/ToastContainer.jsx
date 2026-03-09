import { useCart } from '../context/CartContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ToastContainer = () => {
  const { toasts } = useCart();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast">
          {toast.type === 'error'
            ? <AlertCircle size={18} color="#ef4444" />
            : <CheckCircle size={18} color="var(--accent-green)" />
          }
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
