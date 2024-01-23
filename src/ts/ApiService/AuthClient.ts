import axios from "axios";
import { ApiClient } from "./ApiClient";
import { URLSearchParams } from "url";

export class AuthClient extends ApiClient {
    public authorize(code: string): string {

        axios.get(AuthClient.getAuthBaseUrl() + "/authorize?code=" + code)

        return ""
    }
}