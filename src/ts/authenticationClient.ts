export default class AuthenticationClient {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private redirectUri: string;
  private scopes: string[];

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = "";
    this.scopes = [];
  }

  setRedirect = (uri: string) => {
    if (uri.startsWith("http://") || uri.startsWith("https://")) {
      this.redirectUri = uri;
    } else {
      throw new Error("Incorrect URL format");
    }
  };

  setScopes = (scopes: string[]) => {
    this.scopes = scopes;
  };

  createAuthLink = () => {
    if (this.scopes[0] && this.redirectUri && this.clientId) {
      return `https://discord.com/oauth2/authorize?client_id=${
        this.clientId
      }&redirect_uri=${
        this.redirectUri
      }&response_type=code&scope=${this.scopes.join(" ")}`;
    }
  };

  getToken = async (code: string) => {
    console.log(this.scopes[0]);
    console.log(this.redirectUri);
    console.log(code);
    console.log(this.clientId);
    console.log(this.clientSecret);
    if (
      this.scopes[0] &&
      this.redirectUri &&
      code &&
      this.clientId &&
      this.clientSecret
    ) {
      const res = await fetch(`https://discord.com/api/oauth2/token`, {
        method: "POST",
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          grant_type: `authorization_code`,
          redirect_uri: this.redirectUri,
          scope: this.scopes.join(" "),
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const authData = await res.json();
      console.log("AUTH DATA: ", authData);
      return authData;
    } else {
      throw new Error("Required values weren't specified.");
    }
  };

  getUser = async (token: any) => {
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    const res = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    return await res.json();
  };

  getUserConnections = async (token: any) => {
    const tokenType = token.token_type;
    const accessToken = token.access_token;

    const res = await fetch("https://discord.com/api/users/@me/connections", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    return await res.json();
  };

  getUserGuilds = async (token: any) => {
    const tokenType = token.token_type;
    const accessToken = token.access_token;

    const res = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    return await res.json();
  };
}
