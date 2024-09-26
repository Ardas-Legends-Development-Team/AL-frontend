import { ApiClient } from "@/ts/ApiService/ApiClient";
import axios from "axios";
import { AuthenticationResponse } from "@/ts/types/ApiResponseTypes/AuthenticationResponse";

export default class AuthenticationClient extends ApiClient {
  public getToken = async (code: string): Promise<AuthenticationResponse> => {
    try {
      const response = await axios.post("http://localhost:8080/auth", {
        accessCode: code,
      });
      return {
        jwt: response.data.jwt,
        discordId: response.data.discordId,
        expirationTime: response.data.expirationTime,
      };
    } catch (error) {
      throw new Error("Failed to get token");
    }
  };
}
