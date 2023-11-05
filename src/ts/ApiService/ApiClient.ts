import config from "@/config.json";
import axios from "axios";
import { ErrorHandler } from "@/ts/ErrorHandler";

// Add an axios responsive interceptor to show an error message on an API error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      ErrorHandler.throwError(error.response.data.message);
    } else {
      ErrorHandler.throwError("Unexpected error occured");
    }
  },
);

export abstract class ApiClient {
  private static baseUrl: string = `${
    import.meta.env.MODE === "production"
      ? config["backendUrl"]["production"]
      : config["backendUrl"]["development"]
  }/api`;

  public static getBaseUrl(): string {
    return this.baseUrl;
  }
}
