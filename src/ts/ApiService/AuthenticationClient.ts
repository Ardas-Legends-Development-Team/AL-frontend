import { ApiClient } from "@/ts/ApiService/ApiClient";
import axios from "axios";
import { AuthenticationResponse } from "@/ts/types/ApiResponseTypes/AuthenticationResponse";

export default class AuthenticationClient extends ApiClient {
  // private readonly clientId: string;
  // private readonly clientSecret: string;
  // private redirectUri: string;
  // private scopes: string[];

  // constructor(clientId: string, clientSecret: string) {
  //   this.clientId = clientId;
  //   this.clientSecret = clientSecret;
  //   this.redirectUri = "";
  //   this.scopes = [];
  // }

  public setRedirect = (uri: string) => {
    if (uri.startsWith("http://") || uri.startsWith("https://")) {
      this.redirectUri = uri;
    } else {
      throw new Error("Incorrect URL format");
    }
  };

  public setScopes = (scopes: string[]) => {
    this.scopes = scopes;
  };

  public getToken = async (code: string): Promise<AuthenticationResponse> => {
    try {
      const response = await axios.post("http://localhost:8080/auth", {
        accessCode: code,
      });
      return {
        jwt: response.data.jwt,
        discordId: response.data.discordId,
      };
    } catch (error) {
      throw new Error("Failed to get token");
    }
  };

  // public getToken = async (code: string) => {
  //   if (
  //     this.scopes[0] &&
  //     this.redirectUri &&
  //     code &&
  //     this.clientId &&
  //     this.clientSecret
  //   ) {
  //     const res = await fetch(`https://discord.com/api/oauth2/token`, {
  //       body: new URLSearchParams({
  //         // eslint-disable-next-line camelcase
  //         client_id: this.clientId,
  //         // eslint-disable-next-line camelcase
  //         client_secret: this.clientSecret,
  //         code,
  //         // eslint-disable-next-line camelcase
  //         grant_type: `authorization_code`,
  //         // eslint-disable-next-line camelcase
  //         redirect_uri: this.redirectUri,
  //         scope: this.scopes.join(" "),
  //       }).toString(),
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       method: "POST",
  //     });
  //
  //     return res.json();
  //   }
  //   throw new Error("Required values weren't specified.");
  // };

  // public getUser = async (token: {
  //   access_token: string;
  //   token_type: string;
  //   expires_in: number;
  //   refresh_token: string;
  //   scope: string;
  // }) => {
  //   const tokenType = token.token_type;
  //   const accessToken = token.access_token;
  //   const res = await fetch("https://discord.com/api/users/@me", {
  //     headers: {
  //       Authorization: `${tokenType} ${accessToken}`,
  //     },
  //   });
  //
  //   return await res.json();
  // };
  //
  // public getUserGuilds = async (token: {
  //   access_token: string;
  //   token_type: string;
  //   expires_in: number;
  //   refresh_token: string;
  //   scope: string;
  // }) => {
  //   const tokenType = token.token_type;
  //   const accessToken = token.access_token;
  //
  //   const res = await fetch("https://discord.com/api/users/@me/guilds", {
  //     headers: {
  //       Authorization: `${tokenType} ${accessToken}`,
  //     },
  //   });
  //
  //   return await res.json();
  // };
}
