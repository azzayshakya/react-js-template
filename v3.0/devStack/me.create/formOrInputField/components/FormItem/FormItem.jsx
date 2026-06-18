import React from 'react';

export function FormItem({ size, children }) {
  const sizes = {
    small: 'py-2',
    medium: 'py-3',
    large: 'py-4',
  };
  return <div className={sizes[size]}>{children}</div>;
}
