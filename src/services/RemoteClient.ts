import axios, {AxiosRequestConfig} from "axios";
import {getAccessToken, getRefreshToken} from "../utils/Token";

const hostConfig = {
    host: "localhost",
    port: 3000,
    apiVersion: 1,
};

const RemoteApiClient = axios.create({
    baseURL: `http://${hostConfig.host}:${hostConfig.port}/v${hostConfig.apiVersion}`,
    withCredentials: true,
});

export const apiService = {
    get: async (url: string, config?: AxiosRequestConfig) =>
        await RemoteApiClient.get(url, config),
    getWithAuth: async <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
        await RemoteApiClient.get(url, {
            ...config,
            headers: {
                Authorization: getAccessToken(),
                "X-RefreshToken": getRefreshToken(),
            },
            data
        }),
    post: async <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
        await RemoteApiClient.post(url, data, config),
    postWithAuth: async <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
        await RemoteApiClient.post(url, data, {
            ...config,
            headers: {
                Authorization: getAccessToken(),
                "X-RefreshToken": getRefreshToken(),
            },
        }),
    put: async <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
        await RemoteApiClient.put(url, data, config),
    putWithAuth: async <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
        await RemoteApiClient.put(url, data, {
            ...config,
            headers: {
                Authorization: getAccessToken(),
                "X-RefreshToken": getRefreshToken(),
            },
        }),
    delete: async (url: string, config?: AxiosRequestConfig) =>
        await RemoteApiClient.delete(url, config),
    deleteWithAuth: async (url: string, config?: AxiosRequestConfig) =>
        await RemoteApiClient.delete(url, {
            ...config,
            headers: {
                Authorization: getAccessToken(),
                "X-RefreshToken": getRefreshToken(),
            },
        }),
};
