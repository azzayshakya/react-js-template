import { refreshSession } from "../apis/accounts-me-apis";
import { DEV_JWT_LS_KEY, REQUEST_TIMEOUT } from "../constants";
import { sleep } from "../utils/sleep-util";
import { removeUserSessionLocally, setUserSessionLocally } from "../utils/user-session-utils";
import axios from "axios";
import { toast } from "sonner";

/** Creates an Axios instance with predefined configuration.
 * The instance is configured with:
 * - A timeout specified by the 'REQUEST_TIMEOUT' constant
 * - Default headers including 'Content-Type' set to 'application/json'
 * @constant (AxiosInstance) axiosInstance The configured Axios instance.
 */
const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept request and add JWT token to the header if it's DEV environment
axiosInstance.interceptors.request.use(
  (request) => {
    // Attach jwt from LS if it's DEV environment
    if (import.meta.env.DEV) {
      request.headers["Authorization"] = `Bearer ${localStorage.getItem(DEV_JWT_LS_KEY)}`;
      request.withCredentials = true;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// Intercept response and handle errors
axiosInstance.interceptors.response.use(
  async (response) => {
    // Artificial delay for development
    if (import.meta.env.DEV) await sleep(import.meta.env.VITE_ARTIFICIAL_DELAY);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If response status is 401 and request is not for specific endpoints, retry request with a new session
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/me/logoff")
    ) {
      originalRequest._retry = true;
      
      // Refresh the session
      const newSession = await refreshSession();
      
      if (newSession) {
        setUserSessionLocally(newSession.data);
      }
      
      return axiosInstance(originalRequest);
    }

    // Set empty error message
    let errorMessage = "";

    // If error response data is a string, set the error message
    if (typeof error.response.data === "string") {
      errorMessage = error.response.data;
    }

    // If error is an object
    if (typeof error.response.data === "object") {
      // Log the validation errors
      console.log(error.response.data.errors);

      // Get the title of the error object if available
      errorMessage = error.response.data.title || "Something went wrong. Please try again later";
    }

    // Return toast notification based on HTTP status code
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
        toast.error(errorMessage);
        break;

      case 404:
        toast.error(errorMessage);
        // TODO: Route to 404 page
        break;

      case 500:
        toast.error(errorMessage);
        // TODO: Route to 500 page
        break;

      default:
        toast.error(error.response.status + " Error", {
          description: errorMessage,
        });
        return Promise.reject(error);
    }
  }
);

export { axiosInstance };
