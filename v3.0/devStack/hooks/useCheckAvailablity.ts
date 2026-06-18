import { IHttpResponse } from "@/ui-kit/dtos/http-response";
import { CheckAvailabilityDto } from "@/ui-kit/dtos/request/check-availability-dto";
import { TrueFalseResultDto } from "@/ui-kit/dtos/response/true-false-result-dto";
import { CustomFormMessage, CustomMessageType } from "@/ui-kit/types/custom-form-message";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z, ZodTypeAny } from "zod";

type CheckAvailabilityParams<T extends FieldValues, TFieldSchema extends ZodTypeAny> = {
  defaultInputValue?: string;
  debounceTime?: number;
  fieldName: FieldPath<T>;
  form: UseFormReturn<T>;
  fieldSchema: TFieldSchema;
  checkAvailabilityAPIFn: (postObj: CheckAvailabilityDto) => Promise<IHttpResponse<TrueFalseResultDto>>;
};

export const useCheckAvailability = <T extends FieldValues, TFieldSchema extends ZodTypeAny>({
  defaultInputValue,
  debounceTime = 1000,
  fieldName,
  form,
  fieldSchema,
  checkAvailabilityAPIFn,
}: CheckAvailabilityParams<T, TFieldSchema>) => {
  const [availabilityMessage, setAvailabilityMessage] = useState<CustomFormMessage | null>(null);
  const [inputValue, setInputValue] = useState(defaultInputValue ?? "");
  const [isCheckRequired, setIsCheckRequired] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const { mutate: checkAvailabilityMutation, isPending: isCheckPending } = useMutation({
    mutationFn: checkAvailabilityAPIFn,
    onSuccess: (httpResponse, variables) => {
      if (httpResponse.data.result) {
        setIsAvailable(true);
        availabilityMessageSetter("Green", variables.userInput);
      } else {
        setIsAvailable(false);
        notAvailableErrorHandler(variables.userInput);
      }
    },
    onError: (error) => {
      toast.error(error.toString());
    },
    onSettled: (_, __, variables) => {
      if (inputValue !== variables?.userInput) return;
      setIsCheckRequired(false);
    },
  });
  const checkNow = useCallback((postObj: CheckAvailabilityDto) => {
    checkAvailabilityMutation(postObj);
  }, [checkAvailabilityMutation]);
  useEffect(() => {
    if (!isCheckRequired) return;
    const handler = setTimeout(() => {
      checkNow({ userInput: inputValue });
    }, debounceTime);
    return () => clearTimeout(handler);
  }, [isCheckRequired, checkNow, inputValue, debounceTime]);
  const isFieldValidHandler = (inputValue: string) => {
    const fieldZodSchema = z.object({ [fieldName]: fieldSchema });
    const result = fieldZodSchema.safeParse({ [fieldName]: inputValue });
    if (!result.success) {
      form.setError(fieldName, { type: "manual", message: result.error.errors[0].message });
      setAvailabilityMessage(null);
    } else {
      form.clearErrors(fieldName);
    }
    return result.success;
  };
  const notAvailableErrorHandler = (inputValue: string) => {
    form.setError(fieldName, { type: "manual", message: `${inputValue} is already taken` });
  };
  const availabilityMessageSetter = useCallback((messageType: CustomMessageType, inputValue: string) => {
    switch (messageType) {
      case "Gray":
        setAvailabilityMessage({ type: messageType, message: "Checking availability..." });
        break;
      case "Green":
        setAvailabilityMessage({ type: messageType, message: `${inputValue} is available` });
        break;
      default:
        setAvailabilityMessage(null);
    }
  }, []);
  const handleInputChange = (currentInputValue: string) => {
    setIsAvailable(false);
    setInputValue(currentInputValue);
    setIsCheckRequired(false);
    if (!isFieldValidHandler(currentInputValue)) return;
    if (currentInputValue === defaultInputValue) {
      setIsAvailable(true);
      availabilityMessageSetter("None", "");
      return;
    }
    setIsCheckRequired(true);
  };
  return {
    inputValue,
    isAvailable,
    isCheckPending,
    availabilityMessage,
    handleInputChange,
  };
};
