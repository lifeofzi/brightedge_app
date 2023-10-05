import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
    const axiosError = error as AxiosError;
    let errorMessage = axiosError.message; // default to the error message
  
    // If it's an Axios error with a response status code of 400, customize the message.
    if (axiosError.response && axiosError.response.status === 400) {
      errorMessage = "Error querying for invalid url.";
    }
  
    return errorMessage;
  };