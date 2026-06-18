import React from 'react';

export function FormLabelText({ label, disabled, required, description, size }) {
  const sizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };
  return (
    <label className={`${sizes[size]} ${disabled ? 'text-gray-400' : 'text-black'}`}>
      {label}
      {required && <span className="text-red-500">*</span>}
      {description && <p className="text-gray-500">{description}</p>}
    </label>
  );
}
