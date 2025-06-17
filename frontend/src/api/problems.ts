// src/api/problems.ts
import type { Problem, SearchCriteria } from "@/types";
import apiClient from "./client";

export const searchProblems = async (
  criteria: SearchCriteria
): Promise<Problem[]> => {
  // 検索条件をaxiosが扱える形式に変換
  const params = new URLSearchParams();
  if (criteria.subject) {
    params.append("subject", criteria.subject);
  }
  if (criteria.year) {
    params.append("year", criteria.year);
  }

  try {
    const response = await apiClient.get<Problem[]>("/api/problems", {
      params: params,
    });
    return response.data;
  } catch (err) {
    console.error("API呼び出しエラー:", err);
    throw err;
  }
};
