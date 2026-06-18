import { IHttpResponse } from "@/ui-kit/dtos/http-response";
import { TerminateSessionDto } from "@/ui-kit/dtos/request/terminate-session-dto";
import { UserSessionDto } from "@/ui-kit/dtos/response/user-session-dto";
import { axiosInstance } from "@/ui-kit/lib/axios-instance";
import { redirectToLoginUtil } from "@/ui-kit/utils/redirect-utils";
import { toast } from "sonner";

const baseAPIURL: string = `${import.meta.env.VITE_ACCOUNTS_API_URL}/me`;

/** Log off from sessions based on sessionIds (request is from MyAccount). */
const terminateUserSelectedSessions = (postobj: TerminateSessionDto) => {
  return axiosInstance
    .post<IHttpResponse<boolean>>(`${baseAPIURL}/terminate-my-sessions`, postobj)
    .then((res) => res.data);
};

/** Gets user's current session to view the latest user's info. */
const getMySession = () => {
  return axiosInstance
    .get<IHttpResponse<UserSessionDto>>(`${baseAPIURL}/my-session`)
    .then((res) => res.data);
};

/** Refreshes user session using cookies. */
const refreshSession = () => {
  return axiosInstance
    .put<IHttpResponse<UserSessionDto>>(`${baseAPIURL}/refresh-session`)
    .then((res) => res.data)
    .catch((error) => {
      // Show error toast
      toast.error(error);

      // Redirect to login page after 2 seconds
      redirectToLoginUtil();
      return null;
    });
};

/** Logs off from the current session for the current device. */
const logoffFromCurrentSession = () => {
  return axiosInstance
    .put<IHttpResponse<boolean>>(`${baseAPIURL}/logoff`)
    .then((res) => res.data);
};

export {
  terminateUserSelectedSessions,
  getMySession,
  refreshSession,
  logoffFromCurrentSession,
};
