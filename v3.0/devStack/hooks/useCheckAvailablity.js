import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import { axiosInstance } from '@/lib/axios-instance'

export const useCheckAvailability = ({
  defaultInputValue = '',
  debounceTime = 1000,
  fieldName,
  form,
  validateFn,
  checkAvailabilityAPIFn,
}) => {
  const [availabilityMessage, setAvailabilityMessage] = useState(null)
  const [inputValue, setInputValue] = useState(defaultInputValue)
  const [isAvailable, setIsAvailable] = useState(true)
  const [isCheckPending, setIsCheckPending] = useState(false)

  // ── Debounce directly on inputValue ────────────────────────
  useEffect(() => {
    // Skip check if empty or back to default
    if (!inputValue || inputValue === defaultInputValue) return

    // Skip if field has a validation error
    if (validateFn) {
      const result = validateFn(inputValue)
      if (result !== true) return
    }

    setAvailabilityMessage({ type: 'Gray', message: 'Checking availability...' })
    setIsCheckPending(true)

    const handler = setTimeout(async () => {
      try {
        const httpResponse = await checkAvailabilityAPIFn({ userInput: inputValue })

        if (httpResponse.data.result) {
          setIsAvailable(true)
          setAvailabilityMessage({ type: 'Green', message: `${inputValue} is available` })
          form.clearErrors(fieldName)
        } else {
          setIsAvailable(false)
          setAvailabilityMessage(null)
          form.setError(fieldName, { type: 'manual', message: `${inputValue} is already taken` })
        }
      } catch (error) {
        message.error(error?.message || 'Availability check failed.')
      } finally {
        setIsCheckPending(false)
      }
    }, debounceTime)

    return () => clearTimeout(handler)
  }, [inputValue]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Input change handler ────────────────────────────────────
  const handleInputChange = (currentValue) => {
    setInputValue(currentValue)
    setIsAvailable(false)
    setAvailabilityMessage(null)

    // Back to default = treat as available immediately
    if (currentValue === defaultInputValue) {
      setIsAvailable(true)
      return
    }

    // Run validation and set form error if invalid
    if (validateFn) {
      const result = validateFn(currentValue)
      if (result !== true) {
        form.setError(fieldName, { type: 'manual', message: result })
        return
      }
      form.clearErrors(fieldName)
    }
  }

  return {
    inputValue,
    isAvailable,
    isCheckPending,
    availabilityMessage,
    handleInputChange,
  }
}
