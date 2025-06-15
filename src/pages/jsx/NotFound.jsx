import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import {
  Home as HomeIcon,
  ReportProblem as ErrorIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
        backgroundColor: "background.default",
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 600,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={3}
      >
        <ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Go to Home Page
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;