# Python 3.9をベースイメージとして使用
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコンテナにコピー
COPY ./requirements.txt /app/requirements.txt

# 依存関係をインストール
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# アプリケーションのコードをコンテナにコピー
COPY ./app /app/app

# アプリケーションのポートを指定
EXPOSE 8000

# アプリケーションを起動するコマンド
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]