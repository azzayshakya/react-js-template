import React from 'react';

export function FormMessage({ size, customMessageType, children }) {
  const sizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };
  return (
    <p className={`${sizes[size]} text-red-500`}>
      {customMessageType ? `${customMessageType}: ` : ''} {children}
    </p>
  );
}
