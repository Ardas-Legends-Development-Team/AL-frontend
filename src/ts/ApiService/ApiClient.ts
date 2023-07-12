export abstract class ApiClient {
  private static baseUrl: string = "http://localhost:8080/api";

  public static getBaseUrl(): string {
    return this.baseUrl;
  }
}
