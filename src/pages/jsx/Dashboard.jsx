import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Stack,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  TimelineRounded,
  Description,
  EventAvailable,
  Fingerprint,
  BadgeRounded,
  Inventory,
  HealthAndSafety,
  TrendingUp,
  NotificationsActive,
  ArrowForward,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../../public/fahss-logo.png";

const modules = [
  {
    title: "TIMESHEET MANAGEMENT",
    description: "Track work hours and project management",
    link: "/timesheet",
    color: "#ff9800",
    icon: <TimelineRounded sx={{ fontSize: 40 }} />,
    stats: {
      total: "168 hours logged",
      today: "24 active users",
      progress: 85,
      status: "On Track",
      alerts: 2,
    },
    recentActivity: "Last updated: 2 hours ago",
  },
  {
    title: "EXPENSE CLAIMS",
    description: "Submit and manage expense claims",
    link: "/expense-claims",
    color: "#795548",
    icon: <Description sx={{ fontSize: 40 }} />,
    stats: {
      total: "15 pending claims",
      today: "$2,450 total",
      progress: 60,
      status: "Pending Review",
      alerts: 5,
    },
    recentActivity: "New claim added 30min ago",
  },
  {
    title: "ANNUAL LEAVE",
    description: "Track and manage leave requests",
    link: "/annual-leave",
    color: "#e91e63",
    icon: <EventAvailable sx={{ fontSize: 40 }} />,
    stats: {
      total: "45 days available",
      today: "3 pending requests",
      progress: 70,
      status: "Available",
      alerts: 1,
    },
    recentActivity: "2 approvals pending",
  },
  {
    title: "DIGITAL ATTENDANCE",
    description: "Monitor employee attendance",
    link: "/digital-attendance",
    color: "#00bcd4",
    icon: <Fingerprint sx={{ fontSize: 40 }} />,
    stats: {
      total: "142 check-ins today",
      today: "98% attendance rate",
      progress: 95,
      status: "Active",
      alerts: 0,
    },
    recentActivity: "Last check-in 5min ago",
  },
  {
    title: "EMPLOYEE PROFILES",
    description: "Manage employee information",
    link: "/employee-profile",
    color: "#9c27b0",
    icon: <BadgeRounded sx={{ fontSize: 40 }} />,
    stats: {
      total: "150 active profiles",
      today: "12 updates pending",
      progress: 88,
      status: "Updated",
      alerts: 3,
    },
    recentActivity: "Profile updated 1h ago",
  },
  {
    title: "IT ASSETS",
    description: "Track IT asset allocation",
    link: "/assets",
    color: "#4caf50",
    icon: <Inventory sx={{ fontSize: 40 }} />,
    stats: {
      total: "245 assets tracked",
      today: "15 new assignments",
      progress: 92,
      status: "Monitored",
      alerts: 1,
    },
    recentActivity: "Asset assigned 15min ago",
  },
  {
    title: "HEALTH & SAFETY",
    description: "Monitor safety compliance",
    link: "/health-safety",
    color: "#f44336",
    icon: <HealthAndSafety sx={{ fontSize: 40 }} />,
    stats: {
      total: "98% compliance rate",
      today: "0 incidents",
      progress: 98,
      status: "Excellent",
      alerts: 0,
    },
    recentActivity: "Last check 30min ago",
  },
];

function Dashboard() {
  const [hovered, setHovered] = useState(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 60% 0%, #e3f2fd 0%, #f8bbd0 100%)",
        position: "relative",
        overflow: "hidden",
        pb: 8,
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "url('/public/animated-bg.svg')",
          backgroundSize: "cover",
          opacity: 0.2,
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 7,
          pb: 4,
        }}
      >
        <img
          src={logo}
          alt="fahss logo"
          style={{
            height: 70,
            marginBottom: 16,
            filter: "drop-shadow(0 4px 16px #2196f355)",
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            letterSpacing: 3,
            fontFamily: "Futura",
            background: "linear-gradient(90deg, #1a237e, #0277bd, #ff9800)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
            textShadow: "0 2px 24px #fff8",
            mb: 1,
            textAlign: "center",
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.2rem", lg: "3.8rem" },
            lineHeight: 1.1,
            maxWidth: { xs: "95vw", sm: "80vw", md: "60vw", lg: "900px" },
            mx: "auto",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          fahss dashboard
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          px: { xs: 2, md: 6 },
          mt: 4,
        }}
      >
        {modules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.title}>
            <Card
              component={Link}
              to={module.link}
              onMouseEnter={() => setHovered(module.title)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                height: "auto",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                background: `linear-gradient(135deg, #fff9 60%, ${module.color}22 100%)`,
                boxShadow:
                  hovered === module.title
                    ? `0 12px 48px ${module.color}55, 0 2px 12px #0002`
                    : `0 2px 12px #0001`,
                transition: "all 0.35s cubic-bezier(.4,2,.3,1)",
                border: "none",
                borderRadius: "1.5rem",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  background: `linear-gradient(135deg, ${module.color}33, #fff9)`,
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `radial-gradient(circle, ${module.color}33 0%, transparent 80%)`,
                  opacity: 0.2,
                  zIndex: 0,
                },
              }}
            >
              <CardContent sx={{ position: "relative", zIndex: 1, p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${module.color}, ${module.color}99)`,
                      color: "#fff",
                      mr: 2,
                    }}
                  >
                    {module.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Futura",
                        textTransform: "uppercase",
                        color: module.color,
                        fontWeight: 800,
                        letterSpacing: 1,
                        fontSize: "1.1rem",
                        mb: 0.5,
                      }}
                    >
                      {module.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        display: "block",
                      }}
                    >
                      {module.description}
                    </Typography>
                  </Box>
                </Box>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 16, color: module.color }} />
                      {module.stats.total}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={module.stats.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${module.color}22`,
                        "& .MuiLinearProgress-bar": {
                          bgcolor: module.color,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      size="small"
                      label={module.stats.status}
                      sx={{
                        bgcolor: `${module.color}22`,
                        color: module.color,
                        fontWeight: 600,
                      }}
                    />
                    {module.stats.alerts > 0 && (
                      <Tooltip title={`${module.stats.alerts} alerts`}>
                        <IconButton
                          size="small"
                          sx={{
                            color: "#f44336",
                          }}
                        >
                          <NotificationsActive />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pt: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                      }}
                    >
                      {module.recentActivity}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: `${module.color}22`,
                        color: module.color,
                        "&:hover": {
                          bgcolor: `${module.color}33`,
                        },
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
