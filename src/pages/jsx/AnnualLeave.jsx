import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Card,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Event as EventIcon,
  CalendarToday as CalendarTodayIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Add as AddIcon,
  HourglassEmpty as PendingIcon,
  TouchApp as ApproveIcon,
  Block as RejectIcon,
  Refresh as ReplaceIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

const mockLeaveData = [
  {
    id: 1,
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    leaveType: 'Annual Leave',
    startDate: '2025-06-20',
    endDate: '2025-06-25',
    days: 5,
    status: 'Pending',
    replacement: 'Jane Smith'
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    employeeId: 'EMP002',
    leaveType: 'Sick Leave',
    startDate: '2025-06-15',
    endDate: '2025-06-16',
    days: 2,
    status: 'Approved',
    replacement: 'John Doe'
  }
];

const leaveBalances = {
  annualLeave: { total: 21, used: 12, pending: 5, available: 4 },
  sickLeave: { total: 14, used: 3, pending: 0, available: 11 },
  casualLeave: { total: 7, used: 2, pending: 1, available: 4 }
};

const LeaveBalanceCard = ({ title, data, color }) => (
  <Card sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Futura, Arial, sans-serif' }}>
      {title}
    </Typography>
    <Box sx={{ mb: 2 }}>
      <LinearProgress
        variant="determinate"
        value={(data.used / data.total) * 100}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color
          }
        }}
      />
    </Box>
    <Box display="flex" flexWrap="wrap" gap={2}>
      <Box flex={1} minWidth="200px">
        <Typography variant="caption" color="textSecondary">Total</Typography>
        <Typography variant="h6" color="primary">{data.total}</Typography>
      </Box>
      <Box flex={1} minWidth="200px">
        <Typography variant="caption" color="textSecondary">Available</Typography>
        <Typography variant="h6" color="success.main">{data.available}</Typography>
      </Box>
      <Box flex={1} minWidth="200px">
        <Typography variant="caption" color="textSecondary">Used</Typography>
        <Typography variant="h6" color="error.main">{data.used}</Typography>
      </Box>
      <Box flex={1} minWidth="200px">
        <Typography variant="caption" color="textSecondary">Pending</Typography>
        <Typography variant="h6" color="warning.main">{data.pending}</Typography>
      </Box>
    </Box>
  </Card>
);

function AnnualLeave() {
  const [openDialog, setOpenDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleRequestLeave = () => {
    setOpenDialog(true);
  };

  const handleSubmitLeave = () => {
    setOpenDialog(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Box sx={{ p: 3, mt: { xs: 8, sm: 9 }, maxWidth: 1400, mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontFamily: 'Futura, Arial, sans-serif', textTransform: 'lowercase' }}
      >
        fahss annual leave tracking
      </Typography>
      {showAlert && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setShowAlert(false)}
        >
          Leave request submitted successfully!
        </Alert>
      )}
      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flex={1} minWidth="300px">
          <LeaveBalanceCard
            title="Annual Leave"
            data={leaveBalances.annualLeave}
            color="#1976d2"
          />
        </Box>
        <Box flex={1} minWidth="300px">
          <LeaveBalanceCard
            title="Sick Leave"
            data={leaveBalances.sickLeave}
            color="#2e7d32"
          />
        </Box>
        <Box flex={1} minWidth="300px">
          <LeaveBalanceCard
            title="Casual Leave"
            data={leaveBalances.casualLeave}
            color="#ed6c02"
          />
        </Box>
      </Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleRequestLeave}
          >
            Request Leave
          </Button>
          <Button
            variant="outlined"
            startIcon={<AssessmentIcon />}
          >
            Generate Report
          </Button>
        </Stack>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Futura, Arial, sans-serif' }}>
          Leave Requests
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Replacement</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockLeaveData.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {leave.employeeName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {leave.employeeId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>
                    {leave.startDate} to {leave.endDate}
                  </TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>{leave.replacement}</TableCell>
                  <TableCell>
                    <Chip
                      label={leave.status}
                      color={
                        leave.status === 'Approved' ? 'success' :
                        leave.status === 'Pending' ? 'warning' : 'error'
                      }
                      size="small"
                      icon={
                        leave.status === 'Approved' ? <CheckCircleIcon /> :
                        leave.status === 'Pending' ? <PendingIcon /> : <CloseIcon />
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        color="success"
                        title="Approve"
                      >
                        <ApproveIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        title="Reject"
                      >
                        <RejectIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        title="Replace"
                      >
                        <ReplaceIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontFamily: 'Futura, Arial, sans-serif' }}>
            Request Leave
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Employee ID"
              variant="outlined"
              fullWidth
              disabled
              value="EMP003"
            />
            <TextField
              label="Employee Name"
              variant="outlined"
              fullWidth
              disabled
              value="Alice Johnson"
            />
            <FormControl fullWidth>
              <InputLabel>Leave Type</InputLabel>
              <Select
                label="Leave Type"
                defaultValue="Annual Leave"
              >
                <MenuItem value="Annual Leave">Annual Leave</MenuItem>
                <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                <MenuItem value="Casual Leave">Casual Leave</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Start Date"
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Replacement"
              variant="outlined"
              fullWidth
              placeholder="Optional"
            />
            <TextField
              label="Reason for Leave"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitLeave} variant="contained" color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AnnualLeave;
