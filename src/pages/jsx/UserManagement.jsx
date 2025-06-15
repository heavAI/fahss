import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  Avatar
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Person as PersonIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const mockUsers = [
      {
        id: 'user1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        role: 'admin',
      },
      {
        id: 'user2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        role: 'project_manager',
      },
      {
        id: 'user3',
        first_name: 'Alice',
        last_name: 'Brown',
        email: 'alice.brown@example.com',
        role: 'employee',
      },
      {
        id: 'user4',
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob.johnson@example.com',
        role: 'employee',
      },
    ];
    setUsers(mockUsers);
  }, []);

  const columns = [
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>
            <PersonIcon fontSize="small" />
          </Avatar>
          <Typography variant="body1">{params.value}</Typography>
        </Box>
      ),
    },
    { field: 'last_name', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    {
      field: 'role',
      headerName: 'Role',
      width: 160,
      renderCell: (params) => (
        <Chip label={params.value.replace('_', ' ')} sx={{ textTransform: 'capitalize', fontWeight: 600 }} />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="user-management-container" sx={{ flexGrow: 1, p: 3, background: '#f5f7fa', minHeight: '100vh', mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ fontFamily: 'Futura, Arial, sans-serif', letterSpacing: 1 }}>
          fahss User Management
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ borderRadius: 2 }}>
          Add User
        </Button>
      </Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search users..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>
      <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 2, p: 2 }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

export default UserManagement;
