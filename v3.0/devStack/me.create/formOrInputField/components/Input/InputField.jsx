import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '../../utils/cn'; 
import { FormField } from '../FormField/FormField';
import { FormLabelText } from '../FormLabelText/FormLabelText';
import { FormControl } from '../FormControl/Formcontrol';
import { Input } from './Input';
import { FormMessage } from '../FormMessage/FormMessage';

import { FormItem } from '../FormItem/FormItem';

function InputField({
  name,
  label,
  fieldSize = 'medium',
  required = false,
  description,
  className,
  disabled = false,
  type = 'text',
  nonErrorMessage,
  icon: Icon,
  ...props
}) {
  const { control } = useFormContext();

  return (
    <FormField name={name} control={control} render={({ field }) => (
      <FormItem size={fieldSize}>
        {label && (
          <FormLabelText
            size={fieldSize}
            label={label}
            disabled={disabled}
            required={required}
            description={description}
          />
        )}
        <FormControl>
          <div className="relative flex items-center">
            {Icon && (
              <div className="absolute left-3">
                <Icon size={24} className="text-gray-500" />
              </div>
            )}
            <Input
              fieldSize={fieldSize}
              type={type}
              className={cn('pl-10', className)}
              disabled={disabled}
              {...props}
              {...field}
              ref={field.ref}
            />
          </div>
        </FormControl>
        {nonErrorMessage ? (
          <FormMessage
            customMessageType={nonErrorMessage.type}
            size={fieldSize}
          >
            {nonErrorMessage.message}
          </FormMessage>
        ) : (
          <FormMessage size={fieldSize} />
        )}
      </FormItem>
    )} />
  );
}

InputField.displayName = 'InputField';

export { InputField };
