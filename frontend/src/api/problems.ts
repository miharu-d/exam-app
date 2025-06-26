import type { Problem, SearchCriteria } from "@/types/problem";
import apiClient from "./client";
import { isAxiosError, type AxiosRequestConfig } from "axios";

export const searchProblems = async (
  criteria: SearchCriteria,
  token?: string
): Promise<Problem[]> => {
  const config: AxiosRequestConfig = {
    params: new URLSearchParams(criteria as Record<string, string>),
  };
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  const response = await apiClient.get<Problem[]>("/api/problems", config);
  return response.data;
};

export const fetchProblemById = async (
  id: number,
  token?: string
): Promise<Problem | null> => {
  const config: AxiosRequestConfig = {};
  // もしトークンが渡されたら、Authorizationヘッダーにセット
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await apiClient.get<Problem>(
      `/api/problems/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error(`Failed to fetch problem with ID ${id}:`, error);
    throw error;
  }
};
