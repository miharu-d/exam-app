// src/theme.ts
import { createTheme } from "@mui/material/styles";

// メインカラー：落ち着いた青緑系 (学習に集中しやすい色)
const primaryMain = "#4CAF50";
const primaryLight = "#81C784";
const primaryDark = "#388E3C";

// セカンダリカラー：グレー系 (情報表示や背景に使う)
const secondaryMain = "#607D8B";
const secondaryLight = "#90A4AE";
const secondaryDark = "#455A64";

// テキストカラー：白背景で十分なコントラストを持つ濃い色
const textPrimary = "#212121"; // ほぼ黒
const textSecondary = "#757575"; // やや薄いグレー

// 背景色：白を基調としつつ、微妙なトーンで奥行きを出す
const backgroundDefault = "#F9F9F9"; // ほんの少しグレーがかった白
const backgroundPaper = "#FFFFFF"; // カードなどのコンポーネントの背景色

// エラーカラー：アクセシビリティを考慮した赤
const errorMain = "#D32F2F";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
      contrastText: "#fff", // プライマリカラーのテキストは白
    },
    secondary: {
      main: secondaryMain,
      light: secondaryLight,
      dark: secondaryDark,
      contrastText: "#fff", // セカンダリカラーのテキストも白
    },
    error: {
      main: errorMain,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    background: {
      default: backgroundDefault,
      paper: backgroundPaper,
    },
  },
  typography: {
    fontFamily: [
      "Noto Sans JP", // 日本語フォントを優先
      "Roboto", // fallback (MUIデフォルト)
      "sans-serif",
    ].join(","),
    h3: {
      fontWeight: 700, // タイトルを太く
      fontSize: "2.5rem",
    },
    h6: {
      fontWeight: 600, // サブタイトルなどを少し太く
    },
    body1: {
      lineHeight: 1.6, // 行間を広げて読みやすく
    },
    // ここで他のvariantも設定可能
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // 角を丸く
          textTransform: "none", // ボタンのテキストを大文字にしない
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // テキストフィールドの角を丸く
            backgroundColor: backgroundPaper, // 白背景で統一感を出す
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // カードやフォームの角を丸く
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.05)", // 影を柔らかく
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // カードの角を丸く
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.08)", // カードの影を柔らかく
          border: "1px solid #E0E0E0", // わずかな境界線で区切りを明確に
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
