import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
        primary: {
          main: '#2c3e50', // Dark blue-gray
        },
        secondary: {
          main: '#34495e', // Slightly darker blue-gray
        },
        background: {
          default: '#f5f7fa', // Light gray
          paper: '#ffffff', // White
        },
        text: {
          primary: '#2c3e50', // Dark gray
          secondary: '#7f8c8d', // Medium gray
        },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
