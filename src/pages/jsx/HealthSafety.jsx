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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import {
  HealthAndSafety as SafetyIcon,
  Warning as IncidentIcon,
  School as TrainingIcon,
  CheckCircle as ComplianceIcon,
  Assignment as CertificateIcon,
  Report as ReportIcon,
  Add as AddIcon,
  RemoveRedEye as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';

const mockTrainings = [
  {
    id: 1,
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    trainingType: 'Fire Safety',
    completionDate: '2025-05-15',
    expiryDate: '2026-05-15',
    status: 'Valid',
    certificationNo: 'FST-2025-001'
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    employeeId: 'EMP002',
    trainingType: 'First Aid',
    completionDate: '2025-04-20',
    expiryDate: '2026-04-20',
    status: 'Valid',
    certificationNo: 'FA-2025-002'
  }
];

const mockIncidents = [
  {
    id: 1,
    reportDate: '2025-06-10',
    type: 'Near Miss',
    location: 'Workshop',
    description: 'Slippery floor identified',
    status: 'Resolved',
    actionTaken: 'Warning signs installed'
  },
  {
    id: 2,
    reportDate: '2025-06-12',
    type: 'Minor Injury',
    location: 'Office',
    description: 'Paper cut during filing',
    status: 'Closed',
    actionTaken: 'First aid provided'
  }
];

const complianceChecklist = [
  {
    category: 'Personal Protective Equipment',
    items: [
      { name: 'Safety Helmets', status: 'Compliant' },
      { name: 'Safety Boots', status: 'Compliant' },
      { name: 'High-Vis Vests', status: 'Attention Required' }
    ]
  },
  {
    category: 'Emergency Preparedness',
    items: [
      { name: 'Fire Extinguishers', status: 'Compliant' },
      { name: 'Emergency Exits', status: 'Compliant' },
      { name: 'First Aid Kits', status: 'Compliant' }
    ]
  }
];

const StatCard = ({ title, value, icon, color }) => (
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
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: color }}>
      {value}
    </Typography>
  </Card>
);

function HealthSafety() {
  const [currentTab, setCurrentTab] = useState('trainings');
  const [openDialog, setOpenDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const handleNewRecord = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleSubmit = () => {
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
        fahss health & safety compliance
      </Typography>
      {showAlert && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setShowAlert(false)}
        >
          Record submitted successfully!
        </Alert>
      )}
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Trainings"
            value="45"
            icon={<TrainingIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Compliance Rate"
            value="98%"
            icon={<ComplianceIcon sx={{ fontSize: 40, color: 'success.main' }} />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Open Incidents"
            value="2"
            icon={<IncidentIcon sx={{ fontSize: 40, color: 'warning.main' }} />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Valid Certificates"
            value="125"
            icon={<CertificateIcon sx={{ fontSize: 40, color: 'info.main' }} />}
            color="#0288d1"
          />
        </Grid>
        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleNewRecord('training')}
              >
                Add Training Record
              </Button>
              <Button
                variant="contained"
                color="warning"
                startIcon={<IncidentIcon />}
                onClick={() => handleNewRecord('incident')}
              >
                Report Incident
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
        {/* Training Records */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Futura, Arial, sans-serif' }}>
              HSE Training Records
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Training Type</TableCell>
                    <TableCell>Certification</TableCell>
                    <TableCell>Completion Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTrainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {training.employeeName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {training.employeeId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{training.trainingType}</TableCell>
                      <TableCell>{training.certificationNo}</TableCell>
                      <TableCell>{training.completionDate}</TableCell>
                      <TableCell>{training.expiryDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={training.status}
                          color={training.status === 'Valid' ? 'success' : 'error'}
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
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info">
                              <EditIcon />
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
        {/* Incident Reports */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Futura, Arial, sans-serif' }}>
              Incident Reports
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Action Taken</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>{incident.reportDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={incident.type}
                          color={incident.type === 'Near Miss' ? 'warning' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell>{incident.description}</TableCell>
                      <TableCell>{incident.actionTaken}</TableCell>
                      <TableCell>
                        <Chip
                          label={incident.status}
                          color={incident.status === 'Resolved' ? 'success' : 'warning'}
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
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info">
                              <EditIcon />
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
        {/* Compliance Checklist */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Futura, Arial, sans-serif' }}>
              Compliance Checklist
            </Typography>
            {complianceChecklist.map((category) => (
              <Box key={category.category} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                  {category.category}
                </Typography>
                <Grid container spacing={2}>
                  {category.items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.name}>
                      <Paper sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography>{item.name}</Typography>
                          <Chip
                            label={item.status}
                            color={item.status === 'Compliant' ? 'success' : 'warning'}
                            size="small"
                          />
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Futura, Arial, sans-serif' }}>
          {dialogType === 'training' ? 'Add Training Record' : dialogType === 'incident' ? 'Report Incident' : 'NCR/SOR Report'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {dialogType === 'training' ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Employee</InputLabel>
                      <Select label="Employee">
                        <MenuItem value="emp001">John Doe</MenuItem>
                        <MenuItem value="emp002">Jane Smith</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Training Type</InputLabel>
                      <Select label="Training Type">
                        <MenuItem value="fire">Fire Safety</MenuItem>
                        <MenuItem value="firstaid">First Aid</MenuItem>
                        <MenuItem value="chemical">Chemical Safety</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Completion Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Expiry Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Certification Number"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </>
            ) : dialogType === 'incident' ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Incident Type</InputLabel>
                      <Select label="Incident Type">
                        <MenuItem value="near_miss">Near Miss</MenuItem>
                        <MenuItem value="minor">Minor Injury</MenuItem>
                        <MenuItem value="major">Major Incident</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid container item xs={12} md={6}>
                    <TextField
                      label="Location"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Immediate Action Taken"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="NCR/SOR Number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Related To</InputLabel>
                      <Select label="Related To">
                        <MenuItem value="training">Training</MenuItem>
                        <MenuItem value="incident">Incident</MenuItem>
                        <MenuItem value="compliance">Compliance</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Root Cause"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Corrective Action"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HealthSafety;
