import config from "@/config.json";

export abstract class ApiClient {
  private static baseUrl = `${
    import.meta.env.MODE === "production"
      ? config["backendUrl"]["production"]
      : config["backendUrl"]["development"]
  }/api`;

  public static getBaseUrl(): string {
    return this.baseUrl;
  }
}
