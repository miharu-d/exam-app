"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateProblem } from "@/api/problems";
import type { ProblemUpdate } from "@/types/problem";

/**
 * 問題を更新するためのサーバーアクション
 * @param problemId 更新する問題のID
 * @param formData フォームから送信されたデータ
 */
export async function updateProblemAction(
  problemId: number,
  formData: ProblemUpdate
) {
  const token = cookies().get("authToken")?.value;

  if (!token) {
    throw new Error("認証トークンがありません。");
  }

  const updatePayload: ProblemUpdate = {
    subject: formData.subject,
    year: formData.year,
    month: formData.month,
    question: formData.question,
    answer: formData.answer,
    hint: formData.hint,
    explanation: formData.explanation,
  };

  try {
    // APIを呼び出して問題を更新
    await updateProblem(problemId, updatePayload, token);
  } catch (error) {
    console.error("Problem update failed:", error);
    // エラーが発生した場合、エラーメッセージをCookieにセットしてリダイレクト
    cookies().set("flash-error", "問題の更新に失敗しました。", {
      path: "/",
      maxAge: 10,
    });
    return;
  }

  // 成功した場合の処理
  revalidatePath(`/problems`);
  revalidatePath(`/problems/${problemId}`);

  // 成功メッセージをCookieにセット
  cookies().set("flash-message", "問題が正常に更新されました。", {
    path: "/",
    maxAge: 10,
  });

  // 詳細ページへリダイレクト
  redirect(`/problems/${problemId}`);
}
