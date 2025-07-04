import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#366E9A", // 藍色 (あいいろ)
      light: "#6499C7", // 明藍 (めいあい)
      dark: "#264C6C", // 濃藍 (こいあい)
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8BA888", // 苔色 (こけいろ)
      light: "#B9D0B8", // 薄苔 (うすこけ)
      dark: "#60785F", // 深苔 (ふかこけ)
      contrastText: "#ffffff",
    },
    error: {
      main: "#C65B5B", // えんじ色
    },
    warning: {
      main: "#D9A557", // 琥珀色 (こはくいろ)
    },
    info: {
      main: "#607D8B", // 鈍い青灰色
    },
    success: {
      main: "#669966", // 抹茶色 (まっちゃいろ)
    },
    background: {
      default: "#F8F6F2", // 生成り色 (きなりいろ)
      paper: "#ffffff", // 白練 (しろねり)
    },
    text: {
      primary: "#333333", // 墨色 (すみいろ)
      secondary: "#757575", // 鈍色 (にびいろ)
    },
  },

  typography: {
    fontFamily: ["Noto Sans JP", "Roboto", "sans-serif"].join(","),
    h3: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.08)",
          border: "1px solid #E0E0E0",
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
