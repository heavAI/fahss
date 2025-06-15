import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  styled,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  ListItemButton,
  alpha,
  Tooltip,
  Zoom
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as ReportsIcon,
  Inventory as AssetsIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
  AccessTime as AccessTimeIcon,
  Badge as BadgeIcon,
  Event as EventIcon,
  Receipt as ReceiptIcon,
  Logout as LogoutIcon,
  Info as InfoIcon,
  Policy as PolicyIcon,
  HealthAndSafety as SafetyIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/fahss-logo.png';
import './Layout.css';

const drawerWidth = 320;

// Styled components with modern design
const ModernAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ModernDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #1a237e10 0%, #0277bd10 100%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  minHeight: 80,
  justifyContent: 'space-between'
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// Navigation items with their respective icons and routes
const navigationItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/', color: '#2196f3' },
  { 
    title: 'Timesheet Management & Sector-wise WBS', 
    icon: <AccessTimeIcon />, 
    path: '/timesheet', 
    color: '#ff9800' 
  },
  { 
    title: 'Expense Claims', 
    icon: <ReceiptIcon />, 
    path: '/expense-claims', 
    color: '#795548' 
  },
  { 
    title: 'Annual Leave Tracking', 
    icon: <EventIcon />, 
    path: '/annual-leave', 
    color: '#e91e63' 
  },
  { 
    title: 'Digital Attendance System', 
    icon: <PolicyIcon />, 
    path: '/digital-attendance', 
    color: '#00bcd4' 
  },
  { 
    title: 'Employee Profile & Certifications', 
    icon: <BadgeIcon />, 
    path: '/employee-profile', 
    color: '#9c27b0' 
  },
  { 
    title: 'IT & Asset Allocation', 
    icon: <AssetsIcon />, 
    path: '/assets', 
    color: '#4caf50' 
  },
  { 
    title: 'Health & Safety Compliance', 
    icon: <SafetyIcon />, 
    path: '/health-safety', 
    color: '#f44336' 
  },
  { 
    title: 'Reports', 
    icon: <ReportsIcon />, 
    path: '/reports', 
    color: '#607d8b' 
  }
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationEl, setNotificationEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationEl(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
      <ModernAppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(open && { display: 'none' }),
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.5)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Notifications" TransitionComponent={Zoom}>
              <IconButton
                size="large"
                color="primary"
                onClick={handleNotifications}
                sx={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.5)',
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account" TransitionComponent={Zoom}>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="primary"
                sx={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.5)',
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: 'linear-gradient(135deg, #1a237e, #0277bd)',
                  }}
                >
                  <AccountIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: 'rgba(25, 118, 210, 0.08)',
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <AccountIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationEl}
            open={Boolean(notificationEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                mt: 1.5,
                minWidth: 320,
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  New Asset Request
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  2 minutes ago
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  Health & Safety Update
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  1 hour ago
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Toolbar>
      </ModernAppBar>

      <ModernDrawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={logo} alt="FAHSS Logo" style={{ height: 40 }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Futura',
                background: 'linear-gradient(45deg, #1a237e, #0277bd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              FAHSS
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />

        <List sx={{ px: 2, py: 1 }}>
          {navigationItems.map((item) => (
            <ListItem
              key={item.title}
              disablePadding
              sx={{ mb: 1 }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  background: activeItem === item.path 
                    ? `linear-gradient(135deg, ${alpha(item.color, 0.12)} 0%, ${alpha(item.color, 0.05)} 100%)`
                    : 'transparent',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(90deg, ${item.color}20, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(item.color, 0.15)} 0%, ${alpha(item.color, 0.08)} 100%)`,
                    '&:before': {
                      opacity: 1,
                    }
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeItem === item.path ? item.color : 'text.secondary',
                    transition: 'all 0.3s ease',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    '& .MuiTypography-root': {
                      fontFamily: 'Futura',
                      fontWeight: activeItem === item.path ? 600 : 400,
                      color: activeItem === item.path ? item.color : 'text.primary',
                      transition: 'all 0.3s ease',
                    }
                  }}
                />
                {activeItem === item.path && (
                  <Box
                    sx={{
                      width: 4,
                      height: 35,
                      background: item.color,
                      position: 'absolute',
                      right: 0,
                      borderRadius: '4px 0 0 4px',
                      boxShadow: `0 0 10px ${item.color}40`,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ModernDrawer>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default Layout;