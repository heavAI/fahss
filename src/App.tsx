import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Dashboard from './pages/jsx/Dashboard.jsx';
import Assets from './pages/jsx/Assets.jsx';
import Reports from './pages/jsx/Reports.jsx';
import NotFound from './pages/jsx/NotFound.jsx';
import HealthSafety from './pages/jsx/HealthSafety.jsx';
import Timesheet from './pages/jsx/Timesheet.jsx';
import EmployeeProfile from './pages/jsx/EmployeeProfile.jsx';
import DigitalAttendance from './pages/jsx/DigitalAttendance.jsx';
import AnnualLeave from './pages/jsx/AnnualLeave.jsx';
import ExpenseClaims from './pages/jsx/ExpenseClaims.jsx';
import UserManagement from './pages/jsx/UserManagement.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#34495e',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/health-safety" element={<HealthSafety />} />
            <Route path="/employee-profile" element={<EmployeeProfile />} />
            <Route path="/digital-attendance" element={<DigitalAttendance />} />
            <Route path="/annual-leave" element={<AnnualLeave />} />
            <Route path="/expense-claims" element={<ExpenseClaims />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/timesheet" element={<Timesheet />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;