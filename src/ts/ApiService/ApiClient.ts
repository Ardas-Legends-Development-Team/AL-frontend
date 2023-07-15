import { backendUrl } from "@/config.json";

export abstract class ApiClient {
  private static baseUrl: string = `http://${backendUrl.production}/api`;

  public static getBaseUrl(): string {
    return this.baseUrl;
  }
}
