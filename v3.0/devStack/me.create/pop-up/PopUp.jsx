import React from 'react';
import {  AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Spinner } from 'flowbite-react';
const Popup = ({ message, type, onClose }) => {
  let icon;
  let bgColor;

  // Set icon and background color based on the type
  switch (type) {
    case 'error':
      icon = <AlertTriangle className="text-red-600" />;
      bgColor = 'bg-red-100';
      break;
    case 'success':
      icon = <CheckCircle className="text-green-600" />;
      bgColor = 'bg-green-100';
      break;
    case 'pending':
      icon = <Spinner className="animate-spin text-yellow-600" />;
      bgColor = 'bg-yellow-100';
      break;
    case 'fetching':
      icon = <Spinner className="animate-spin text-blue-600" />;
      bgColor = 'bg-blue-100';
      break;
    default:
      icon = <AlertTriangle className="text-gray-600" />;
      bgColor = 'bg-gray-100';
      break;
  }

  return (
    <div className={`p-4 rounded-lg shadow-lg ${bgColor} flex items-center space-x-4 z-50 flex-shrink-0`}>
      <div className="flex items-center space-x-2">
        {icon}
        <span>{message}</span>
      </div>
      <button className="ml-auto text-lg" onClick={onClose}>
        <XCircle />
      </button>
    </div>
  );
};

export default Popup;