import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  Avatar,
  Badge,
  InputAdornment,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import '../Assets.css';

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function Assets() {
  const theme = useTheme();
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const mockAssets = [
      {
        id: '1',
        name: 'Dell XPS Laptop',
        type: 'IT',
        description: '15-inch, 16GB RAM, 512GB SSD',
        status: 'assigned',
        created_by: 'user1',
        created_at: '2023-05-10T10:30:00Z',
        updated_at: '2023-05-10T10:30:00Z'
      },
      {
        id: '2',
        name: 'Excavator',
        type: 'Construction',
        description: 'CAT 320, 200HP',
        status: 'available',
        created_by: 'user1',
        created_at: '2023-06-15T08:45:00Z',
        updated_at: '2023-06-15T08:45:00Z'
      },
      {
        id: '3',
        name: 'Office Printer',
        type: 'Other',
        description: 'HP LaserJet Pro',
        status: 'maintenance',
        created_by: 'user2',
        created_at: '2023-04-22T14:20:00Z',
        updated_at: '2023-07-01T09:15:00Z'
      }
    ];
    const mockUsers = {
      user1: {
        id: 'user1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        role: 'admin'
      },
      user2: {
        id: 'user2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        role: 'project_manager'
      }
    };
    setAssets(mockAssets);
    setUsers(mockUsers);
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Asset Name',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {params.row.type === 'IT' && (
            <Avatar className="type-it" sx={{ mr: 2, width: 32, height: 32 }}>
              <AssignmentIcon fontSize="small" />
            </Avatar>
          )}
          {params.row.type === 'Construction' && (
            <Avatar className="type-construction" sx={{ mr: 2, width: 32, height: 32 }}>
              <AssignmentIcon fontSize="small" />
            </Avatar>
          )}
          {params.row.type === 'Other' && (
            <Avatar className="type-other" sx={{ mr: 2, width: 32, height: 32 }}>
              <AssignmentIcon fontSize="small" />
            </Avatar>
          )}
          <Typography variant="body1">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          className={`type-${params.value.toLowerCase()}`}
        />
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          icon={params.value === 'available' ? <CheckCircleIcon /> :
                params.value === 'assigned' ? <AssignmentIcon /> : <CancelIcon />}
          label={params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          className={`status-${params.value}`}
          variant="outlined"
        />
      )
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      width: 160,
      valueGetter: (params) => {
        const user = users[params.value];
        return user ? `${user.first_name} ${user.last_name}` : 'Unknown';
      }
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 160,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleEdit = (asset) => {
    setCurrentAsset(asset);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    // Add delete confirmation and API call
    console.log('Delete asset:', id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAsset(null);
  };

  const handleSaveAsset = () => {
    // Add save logic
    handleCloseDialog();
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAssets = assets.length;
  const assetsInMaintenance = assets.filter(asset => asset.status === 'maintenance').length;
  const availableAssets = assets.filter(asset => asset.status === 'available').length;
  const assignedAssets = assets.filter(asset => asset.status === 'assigned').length;

  const assetStatusDistributionData = {
    labels: ['Available', 'Assigned', 'Maintenance'],
    datasets: [
      {
        label: 'Asset Status',
        data: [availableAssets, assignedAssets, assetsInMaintenance],
        backgroundColor: ['#4caf50', '#1976d2', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  const assetValueTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Asset Value ($)',
        data: [12000, 15000, 14000, 17000, 16000, 18000, 20000],
        fill: false,
        borderColor: '#1976d2',
        backgroundColor: '#1976d2',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="asset-management">
      <Box className="asset-management-container" sx={{ flexGrow: 1, p: 3 }}>
        {/* Asset Status Distribution Section */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 340, minWidth: 260, background: '#fff', borderRadius: 2, boxShadow: 2, p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2} align="center">
              Asset Status Distribution
            </Typography>
            <Pie data={assetStatusDistributionData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </Box>
        </Box>
        {/* Header Section */}
        <Box className="asset-header" sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          gap: 2,
          p: 2
        }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
            <AssignmentIcon sx={{ mr: 1 }} />
            Asset Inventory
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              className="primary-button"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              New Asset
            </Button>
          </Box>
        </Box>
        {/* Statistics Cards */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Total Assets</Typography>
                <Typography variant="h4" sx={{ mt: 1, mb: 1, color: 'primary.main' }}>{totalAssets}</Typography>
                <Chip
                  label="+5% from last month"
                  size="small"
                  color="success"
                  sx={{ borderRadius: 1 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Assets in Maintenance</Typography>
                <Typography variant="h4" sx={{ mt: 1, mb: 1, color: 'error.main' }}>{assetsInMaintenance}</Typography>
                <Chip
                  label="-2% from last month"
                  size="small"
                  color="error"
                  sx={{ borderRadius: 1 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Available Assets</Typography>
                <Typography variant="h4" sx={{ mt: 1, mb: 1, color: 'success.main' }}>{availableAssets}</Typography>
                <Chip
                  label="+3% from last month"
                  size="small"
                  color="success"
                  sx={{ borderRadius: 1 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Assigned Assets</Typography>
                <Typography variant="h4" sx={{ mt: 1, mb: 1, color: 'info.main' }}>{assignedAssets}</Typography>
                <Chip
                  label="+8% from last month"
                  size="small"
                  color="info"
                  sx={{ borderRadius: 1 }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" gutterBottom>fahss Asset Status Distribution</Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie data={assetStatusDistributionData} options={{ maintainAspectRatio: false }} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" gutterBottom>fahss Asset Value Trend</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={assetValueTrendData} options={{ maintainAspectRatio: false }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {/* Recent Activity */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
          <Typography variant="h6" gutterBottom>Recent Activity</Typography>
          <List>
            {assets.slice(0, 5).map((asset, index) => (
              <ListItem key={asset.id} divider={index < 4}>
                <ListItemIcon>
                  {asset.status === 'assigned' ? <AssignmentIcon color="primary" /> :
                   asset.status === 'maintenance' ? <CancelIcon color="error" /> :
                   <CheckCircleIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primary={`${asset.name} - ${asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}`}
                  secondary={new Date(asset.updated_at).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        {/* Search and Filter Section */}
        <Paper className="search-container" sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className="secondary-button"
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{ minWidth: 120 }}
            >
              Filters
            </Button>
            <Button
              className="secondary-button"
              variant="outlined"
              startIcon={<RefreshIcon />}
              sx={{ minWidth: 120 }}
            >
              Refresh
            </Button>
          </Box>
        </Paper>
        {/* Data Grid Section */}
        <Paper className="data-grid-container" sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredAssets}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 25]}
            pagination
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                className: 'data-grid-header'
              },
              '& .MuiDataGrid-row': {
                className: 'data-grid-row'
              },
            }}
          />
        </Paper>
        {/* Asset Form Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth className="asset-dialog">
          <DialogTitle>
            {currentAsset ? 'Edit Asset' : 'Create New Asset'}
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" className="asset-form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Asset Name"
                value={currentAsset?.name || ''}
                onChange={(e) => setCurrentAsset({...currentAsset, name: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                select
                label="Asset Type"
                value={currentAsset?.type || ''}
                onChange={(e) => setCurrentAsset({...currentAsset, type: e.target.value})}
              >
                <MenuItem value="IT">IT Equipment</MenuItem>
                <MenuItem value="Construction">Construction</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                margin="normal"
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={currentAsset?.description || ''}
                onChange={(e) => setCurrentAsset({...currentAsset, description: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                select
                label="Status"
                value={currentAsset?.status || ''}
                onChange={(e) => setCurrentAsset({...currentAsset, status: e.target.value})}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="assigned">Assigned</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button className="secondary-button" onClick={handleCloseDialog}>Cancel</Button>
            <Button
              className="primary-button"
              onClick={handleSaveAsset}
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Assets;
