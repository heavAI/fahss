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
  Divider,
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon,
  CloudUpload as UploadIcon,
  RemoveRedEye as ViewIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  LocalOffer as CategoryIcon,
  Assessment as ReportIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';

// Mock data for expense claims
const mockExpenses = [
  {
    id: 1,
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    category: 'Travel',
    description: 'Client Meeting Travel Expenses',
    amount: 250.00,
    date: '2025-06-10',
    status: 'Pending',
    attachments: 2,
    currency: 'USD'
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    employeeId: 'EMP002',
    category: 'Office Supplies',
    description: 'Printer Cartridges and Paper',
    amount: 180.50,
    date: '2025-06-12',
    status: 'Approved',
    attachments: 1,
    currency: 'USD'
  }
];

// Expense categories
const expenseCategories = [
  'Travel',
  'Office Supplies',
  'Meals & Entertainment',
  'Training & Development',
  'Software Subscriptions',
  'Hardware',
  'Miscellaneous'
];

const ExpenseStatCard = ({ title, value, icon, trend }) => (
  <Card sx={{ 
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 3,
    }
  }}>
    {icon}
    <Typography variant="h6" sx={{ mt: 2, mb: 1, fontFamily: 'Futura, Arial, sans-serif' }}>
      {title}
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
      ${value}
    </Typography>
    {trend && (
      <Chip 
        label={trend} 
        color={trend.includes('+') ? 'success' : 'error'} 
        size="small" 
        sx={{ mt: 1 }}
      />
    )}
  </Card>
);

const ExpenseClaims = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleNewClaim = () => {
    setOpenDialog(true);
  };

  const handleSubmitClaim = () => {
    setOpenDialog(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  return (
    <Box sx={{ p: 3, mt: { xs: 8, sm: 9 }, maxWidth: 1400, mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontFamily: 'Futura, Arial, sans-serif', textTransform: 'lowercase' }}
      >
        fahss expense claims
      </Typography>

      {showAlert && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          onClose={() => setShowAlert(false)}
        >
          Expense claim submitted successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={4}>
          <ExpenseStatCard
            title="Monthly Claims"
            value="1,250.00"
            icon={<MoneyIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            trend="+12% vs last month"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ExpenseStatCard
            title="Pending Claims"
            value="450.00"
            icon={<ReceiptIcon sx={{ fontSize: 40, color: 'warning.main' }} />}
            trend="5 claims pending"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ExpenseStatCard
            title="Approved This Month"
            value="800.00"
            icon={<ApproveIcon sx={{ fontSize: 40, color: 'success.main' }} />}
            trend="8 claims approved"
          />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleNewClaim}
              >
                New Expense Claim
              </Button>
              <Button
                variant="outlined"
                startIcon={<ReportIcon />}
              >
                Generate Report
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Expense Claims Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Futura, Arial, sans-serif' }}>
              Recent Claims
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {expense.employeeName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {expense.employeeId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          icon={<CategoryIcon />} 
                          label={expense.category} 
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500, color: 'success.main' }}>
                          ${expense.amount.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <Chip 
                          label={expense.status}
                          color={
                            expense.status === 'Approved' ? 'success' : 
                            expense.status === 'Pending' ? 'warning' : 'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="View Details">
                            <IconButton size="small" color="primary">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Approve">
                            <IconButton size="small" color="success">
                              <ApproveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton size="small" color="error">
                              <RejectIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* New Expense Claim Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Futura, Arial, sans-serif' }}>
          Submit New Expense Claim
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Expense Category</InputLabel>
                  <Select label="Expense Category" defaultValue="">
                    {expenseCategories.map((category) => (
                      <MenuItem key={category} value={category.toLowerCase()}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select label="Currency" defaultValue="USD">
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Provide details about the expense..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  fullWidth
                >
                  Upload Receipts
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                  />
                </Button>
                {selectedFiles.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Selected files: {selectedFiles.map(file => file.name).join(', ')}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitClaim}>Submit Claim</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseClaims;