import {AxiosError, AxiosResponse} from "axios";
import {saveAccessToken, saveRefreshToken} from "../../../utils/Token";

export class BaseRemoteSource {
    static parseError(e: any) {
        const error = e as AxiosError;
        const response = error.response?.data as
            | {
            ok?: boolean;
            message?: string;
        }
            | undefined;
        if (!!response) {
            if (response.message) {
                throw new Error(response.message);
            }
        }
        throw error;
    }

    static checkResponseCredentials(response: AxiosResponse<any, any>) {
        const rt = response.headers["x-refreshtoken"];
        const at = response.headers["x-accesstoken"];
        if (!!rt) {
            saveRefreshToken(rt);
        }
        if (!!at) {
            saveAccessToken(at);
        }
    }
}
