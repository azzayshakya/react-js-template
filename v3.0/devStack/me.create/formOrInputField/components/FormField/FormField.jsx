import React from 'react';
import { Controller } from 'react-hook-form';

export function FormField({ name, control, render }) {
  return (
    <Controller
      name={name}
      control={control}
      render={(field) => render({ field })}
    />
  );
}
