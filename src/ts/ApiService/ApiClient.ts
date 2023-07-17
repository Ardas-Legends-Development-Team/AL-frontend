import config from "@/config.json";

export abstract class ApiClient {
  private static baseUrl: string = `http://${
    import.meta.env.MODE === "production"
      ? config["backend-url"]["production"]
      : config["backend-url"]["development"]
  }/api`;

  public static getBaseUrl(): string {
    return this.baseUrl;
  }
}
