import { redirect } from 'next/navigation';
import { getServerUser } from '@/lib/auth/session';
import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage() {
  // ユーザーが既にログイン済みかを確認
    const user = await getServerUser();

    // ログイン済みなら、問題一覧ページへリダイレクト
    if (user) {
        redirect('/problems');
    }

    // 未認証の場合のみ、クライアントコンポーネントであるログインフォームを描画
    return <LoginForm />;
}