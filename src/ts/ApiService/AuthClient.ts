import axios from "axios";
import { ApiClient } from "./ApiClient";
import { URLSearchParams } from "url";

export class AuthClient extends ApiClient {
    public authorize(code: string, redirectUrl: string): string {

        axios.get(AuthClient.getAuthBaseUrl() + "/authorize?code=" + code + "&redirectUrl=" + redirectUrl)

        return ""
    }
}