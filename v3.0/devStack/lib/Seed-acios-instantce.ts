import { refreshSession } from "../apis/accounts-me-apis";
import { ARTIFICIAL_DELAY, DEV_JWT_LS_KEY, REQUEST_TIMEOUT } from "../constants";
import { removeUserSessionLocally, setUserSessionLocally } from "../utils/user-session-utils";

import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept request
axiosInstance.interceptors.request.use(
  (request) => {
    // Attach JWT from Local Storage if it's a DEV environment
    if (import.meta.env.DEV) {
      const token = localStorage.getItem(DEV_JWT_LS_KEY);
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// Intercept response
axiosInstance.interceptors.response.use(
  async (response) => {
    // Add artificial delay for DEV environment
    if (import.meta.env.DEV) await sleep(ARTIFICIAL_DELAY);
    return response;
  },
  async (error) => {
    // Keep original request
    const originalRequest = error.config;

    // If there's no response, reject immediately
    if (!error.response) return Promise.reject(error);

    // If Access Token was expired, try refreshing the session
    if (
      [
        "/auth/login",
        "/auth/verify-2fa-code",
        "/me/refresh-session",
        "/me/my-session",
        "/me/logoff",
      ].some((url) => originalRequest.url.includes(url)) &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newSession = await refreshSession();
        if (newSession) {
          setUserSessionLocally(newSession.data);
          return axiosInstance(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        console.error("Session refresh failed:", refreshError);
        removeUserSessionLocally(true);
      }
    }

    // Define error message
    let errorMessage = "Something went wrong. Please try again later.";

    if (typeof error.response.data === "string") {
      errorMessage = error.response.data;
    } else if (typeof error.response.data === "object") {
      errorMessage = error.response.data.title || errorMessage;
    }

    // Handle error responses based on status codes
    switch (error.response.status) {
      case 400:
      case 409:
      case 429:
        return Promise.reject(errorMessage);

      case 401:
        toast.error(errorMessage);
        removeUserSessionLocally(true);
        break;

      case 403:
      case 404:
      case 500:
        toast.error(`${error.response.status} Error`, { description: errorMessage });
        break;

      default:
        toast.error(`Error ${error.response.status}`, { description: errorMessage });
    }

    return Promise.reject(error);
  }
);

// Sleep function for artificial delay
function sleep(ms = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { axiosInstance };
