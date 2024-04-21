import config from "@/config.json";
import axios from "axios";
import { ErrorHandler } from "@/ts/ErrorHandler";

// Add an axios responsive interceptor to show an error message on an API error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error response", error.response);
    if (error.response) {
      if (error.response.message)
        ErrorHandler.throwError(error.response.message);
      else if (error.response.data.message)
        ErrorHandler.throwError(error.response.data.message);
      else ErrorHandler.throwError(error.response.data);
    } else {
      ErrorHandler.throwError("Unexpected error occured");
    }
    return Promise.reject(error);
  },
);

export abstract class ApiClient {
  protected static pendingRequests: Map<string, Promise<any>> = new Map();

  private static baseUrl: string = `${
    import.meta.env.MODE === "production"
      ? config["backendUrl"]["production"]
      : config["backendUrl"]["development"]
  }/api`;

  public static getBaseUrl(): string {
    return this.baseUrl;
  }
}
