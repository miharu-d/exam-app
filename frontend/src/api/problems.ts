import type { Problem, ProblemUpdate, SearchCriteria } from "@/types/problem";
import apiClient from "./client";
import { isAxiosError, type AxiosRequestConfig } from "axios";

type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};

export const searchProblems = async (
  criteria: SearchCriteria,
  token?: string
): Promise<ApiResponse<Problem[]>> => {
  const config: AxiosRequestConfig = {
    params: new URLSearchParams(criteria as Record<string, string>),
  };
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  try {
    const response = await apiClient.get<Problem[]>("/api/problems", config);
    // 成功した場合は、dataを返し、errorはnull
    return { data: response.data, error: null };
  } catch (err) {
    // 失敗した場合は、dataはnullで、errorオブジェクトを返す
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown API error"),
    };
  }
};

export const fetchProblemById = async (
  id: number,
  token?: string
): Promise<ApiResponse<Problem>> => {
  const config: AxiosRequestConfig = {};
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  try {
    const response = await apiClient.get<Problem>(
      `/api/problems/${id}`,
      config
    );
    // 成功
    return { data: response.data, error: null };
  } catch (error) {
    // 404の場合は、エラーではなく「データなし」として扱う
    if (isAxiosError(error) && error.response?.status === 404) {
      return { data: null, error: null };
    }
    // その他のエラー
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown API error"),
    };
  }
};

export const updateProblem = async (
  id: number,
  problemData: ProblemUpdate,
  token: string
): Promise<Problem> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await apiClient.put<Problem>(
    `/api/problems/${id}`,
    problemData,
    config
  );
  return data;
};
