// utils/toastUtils.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Default options for toast notifications
const defaultOptions = {
  position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: true, 
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
    limit: 3, 
 
};

// Utility functions for different types of notifications

/**
 * Show a success toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options (optional)
 */
export const showSuccessToast = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

/**
 * Show an error toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options (optional)
 */
export const showErrorToast = (message, options = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};

/**
 * Show a warning toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options (optional)
 */
export const showWarningToast = (message, options = {}) => {
  toast.warning(message, { ...defaultOptions, ...options });
};

/**
 * Show an info toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options (optional)
 */
export const showInfoToast = (message, options = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

/**
 * Show a loading or processing toast
 * @param {string} message - The message to display
 * @returns {string} - The ID of the toast, useful for updating or dismissing
 */
export const showLoadingToast = (message) => {
  const toastId = toast.loading(message, { ...defaultOptions });
  return toastId;
};

/**
 * Update or dismiss a loading toast
 * @param {string} toastId - The ID of the toast to update
 * @param {string} type - The type of toast to update to (e.g., 'success', 'error')
 * @param {string} message - The new message to display
 */
export const updateLoadingToast = (toastId, type, message) => {
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    ...defaultOptions,
  });
};

/**
 * Clear all active toasts
 */
export const clearToasts = () => {
  toast.dismiss();
};
