import axios from "axios";
import type { AxiosError } from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer ? process.env.BACKEND_API_URL : "";

const apiClient = axios.create({
  baseURL: baseURL,
});

interface FastAPIValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

interface FastAPIErrorResponseData {
  detail: string | FastAPIValidationError[] | object;
}

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const responseData: unknown = error.response.data;
      if (
        typeof responseData === "object" &&
        responseData !== null &&
        "detail" in responseData
      ) {
        let errorMessage = "";
        const detail = (responseData as FastAPIErrorResponseData).detail;

        if (Array.isArray(detail)) {
          errorMessage = detail
            .map(
              (err: FastAPIValidationError) =>
                `${err.loc.join(".")}: ${err.msg}`
            )
            .join("; ");
        } else if (typeof detail === "string") {
          errorMessage = detail;
        } else {
          errorMessage = "不明なAPIエラーレスポンスです。";
        }
        return Promise.reject(new Error(errorMessage));
      } else {
        return Promise.reject(
          new Error(
            `APIエラー: ${error.response.status} ${
              error.response.statusText || ""
            }`
          )
        );
      }
    } else if (error.request) {
      return Promise.reject(
        new Error("ネットワークエラー: サーバーからの応答がありません。")
      );
    } else {
      return Promise.reject(new Error(`リクエストエラー: ${error.message}`));
    }
  }
);

export default apiClient;
