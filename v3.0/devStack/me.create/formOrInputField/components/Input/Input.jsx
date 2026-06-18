import React from 'react';

export function Input({ fieldSize, type, className, disabled, ...props }, ref) {
  const sizes = {
    small: 'h-8 text-sm',
    medium: 'h-10 text-base',
    large: 'h-12 text-lg',
  };
  return (
    <input
      type={type}
      disabled={disabled}
      className={`${sizes[fieldSize]} ${className}`}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(Input);
