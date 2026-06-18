import { IHttpResponse } from "@/ui-kit/dtos/http-response";
import { CheckAvailabilityDto } from "@/ui-kit/dtos/request/check-availability-dto";
import { CheckVerificationCodeDto } from "@/ui-kit/dtos/request/check-verification-code-dto";
import { CreateVerificationCodeDto } from "@/ui-kit/dtos/request/create-verification-code-dto";
import { EmailDto } from "@/ui-kit/dtos/request/email-dto";
import { CreatedVerificationCodeDto } from "@/ui-kit/dtos/response/created-verification-code-dto";
import { TenantInfoDto } from "@/ui-kit/dtos/response/tenant-info-dto";
import { TrueFalseResultDto } from "@/ui-kit/dtos/response/true-false-result-dto";
import { axiosInstance } from "@/ui-kit/lib/axios-instance";

const baseAPIURL: string = `${import.meta.env.VITE_ACCOUNTS_API_URL}/auth`;

/** Checks the availability of an email. */
const isEmailAvailable = (postobj: CheckAvailabilityDto) => {
  return axiosInstance
    .post<IHttpResponse<TrueFalseResultDto>>(`${baseAPIURL}/is-email-available`, postobj)
    .then((res) => res.data);
};

/** Creates a verification code for the provided username and request type. */
const createVerificationCode = (postobj: CreateVerificationCodeDto) => {
  return axiosInstance
    .post<IHttpResponse<CreatedVerificationCodeDto>>(`${baseAPIURL}/create-code`, postobj)
    .then((res) => res.data);
};

/** Validates username and gets tenant and its SSO config if SSO is enabled. */
const getTenantInfo = (postobj: EmailDto) => {
  return axiosInstance
    .post<IHttpResponse<TenantInfoDto>>(`${baseAPIURL}/tenant-info`, postobj)
    .then((res) => res.data);
};

/** Checks if the verification code matches for "ResetPwd" and other request types. */
const checkVerificationCode = (postobj: CheckVerificationCodeDto) => {
  return axiosInstance
    .post<IHttpResponse<boolean>>(`${baseAPIURL}/verify-code`, postobj)
    .then((res) => res.data);
};

export {
  isEmailAvailable,
  createVerificationCode,
  getTenantInfo,
  checkVerificationCode,
};
