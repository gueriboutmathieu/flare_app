import cloneDeep from "lodash.clonedeep";

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export type ApiService = {
    init: () => void;
    isAuthenticated: () => boolean;
    request: (
        endpoint: RequestMethod,
        method: string,
        needToken: boolean,
        params: Record<string, any>,
        body: Record<string, any>,
    ) => Promise<any>;
    buildRequestUrl: (endpoint: string, params: Record<string, any>) => string;
    signIn: (username: string, password: string) => Promise<void>;
    signUp: (publicKey: string, username: string, password: string) => Promise<void>;
};

export function createApiService(baseUrl: string): ApiService {
    let _accessToken: string | null = null;
    let _refreshToken: string | null = null;
    let _isAuthenticated: boolean = false;

    const isAuthenticated = (): boolean => {
        const isAuthenticated = cloneDeep(_isAuthenticated);
        return Object.freeze(isAuthenticated);
    };

    const init = (): void => {
        const accessToken = useCookie("accessToken");
        const refreshToken = useCookie("refreshToken");
        if (!accessToken.value || !refreshToken.value) {
            return;
        }
        _accessToken = accessToken.value;
        _refreshToken = refreshToken.value;
        _isAuthenticated = true;
    }

    const request = async (
        method: RequestMethod,
        endpoint: string,
        needToken: boolean = true,
        params: Record<string, any> = {},
        body: Record<string, any> = {},
    ): Promise<Response> => {
        const url = new URL(`${baseUrl}${endpoint}`);

        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    
        const headers: Record<string, any> = { "Content-Type": "application/json" };
        if (needToken) {
            headers["Authorization"] = `Bearer ${_accessToken}`;
        }

        const options: RequestInit = {
            method: method,
            headers: headers,
        }

        if (method !== "GET") {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (response.status === 401 && (await response.json()) === "Token expired") {
            await _refreshAccessToken();
            headers["Authorization"] = `Bearer ${_accessToken}`;
            options.headers = headers;
            return await fetch(url, options);
        }

        return response;
    };

    const buildRequestUrl = (endpoint: string, params: Record<string, any>): string => {
        const url = new URL(`${baseUrl}${endpoint}`);
        url.searchParams.append("access_token", _accessToken!);
        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        return url.toString();
    }

    const _refreshAccessToken = async (): Promise<void> => {
        const response = await request(RequestMethod.POST, "/auth/refresh-access-token", false, { refresh_token: _refreshToken });
        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error);
        }
        const data = await response.json();
        _accessToken = data["access_token"];
    };

    const signIn = async (username: string, password: string): Promise<void> => {
        const response = await request(RequestMethod.POST, "/auth/signin", false, { username: username, password: password });
        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error);
        }
        const data = await response.json();
        _accessToken = data["access_token"];
        _refreshToken = data["refresh_token"];
        useCookie("accessToken", {secure: true, sameSite: "strict"}).value = _accessToken;
        useCookie("refreshToken", {secure: true, sameSite: "strict"}).value = _refreshToken;
        _isAuthenticated = true;
    };

    const signUp = async (publicKey: string, username: string, password: string): Promise<void> => {
        const response = await request(RequestMethod.POST, "/auth/signup", false, {
            public_key: publicKey,
            username: username,
            password: password,
        });
        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error);
        }
        const data = await response.json();
        _accessToken = data["access_token"];
        _refreshToken = data["refresh_token"];
        useCookie("accessToken", {secure: true, sameSite: "strict"}).value = _accessToken;
        useCookie("refreshToken", {secure: true, sameSite: "strict"}).value = _refreshToken;
        _isAuthenticated = true;
    };

    return { init, isAuthenticated, request, buildRequestUrl, signIn, signUp };
}
