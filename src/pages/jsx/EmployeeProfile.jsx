import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Tabs,
  Tab,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Grid from '@mui/material/Grid';

function EmployeeProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [clockedIn, setClockedIn] = useState(false);
  const employee = {
    id: 'EMP001',
    name: 'John Doe',
    position: 'Senior Developer',
    email: 'john.doe@fahss.com',
    phone: '+1 234 567 8900',
    department: 'Engineering',
    joinDate: '2024-01-15',
    personalDetails: {
      dateOfBirth: '1990-05-15',
      nationality: 'Canadian',
      address: '123 Tech Street, Toronto, ON',
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 234 567 8901'
      }
    },
    qualifications: [
      {
        degree: 'Master of Computer Science',
        institution: 'University of Toronto',
        year: '2015',
        status: 'Completed'
      },
      {
        degree: 'Bachelor of Engineering',
        institution: 'McGill University',
        year: '2012',
        status: 'Completed'
      }
    ],
    trainings: [
      {
        name: 'Advanced Project Management',
        provider: 'PMI',
        completionDate: '2025-03-15',
        validUntil: '2028-03-15',
        status: 'Active'
      },
      {
        name: 'Agile Leadership',
        provider: 'Scrum Alliance',
        completionDate: '2024-11-01',
        validUntil: '2026-11-01',
        status: 'Active'
      },
      {
        name: 'Cloud Architecture',
        provider: 'AWS',
        completionDate: '2024-08-15',
        validUntil: '2027-08-15',
        status: 'Active'
      }
    ],
    certifications: [
      {
        name: 'AWS Solutions Architect Professional',
        provider: 'Amazon Web Services',
        certId: 'AWS-SAP-2024-001',
        issueDate: '2024-12-01',
        expiryDate: '2027-12-01',
        status: 'Active'
      },
      {
        name: 'CISSP',
        provider: 'ISC²',
        certId: 'CISSP-2024-123',
        issueDate: '2024-06-01',
        expiryDate: '2027-06-01',
        status: 'Active'
      },
      {
        name: 'PMP',
        provider: 'Project Management Institute',
        certId: 'PMP-2023-456',
        issueDate: '2023-09-01',
        expiryDate: '2026-09-01',
        status: 'Active'
      }
    ],
    skills: [
      { category: 'Programming', skills: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
      { category: 'Cloud', skills: ['AWS', 'Azure', 'Docker', 'Kubernetes'] },
      { category: 'Soft Skills', skills: ['Leadership', 'Communication', 'Problem Solving'] }
    ]
  };
  const attendance = [
    { date: '2025-06-14', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', totalHours: '9:00' },
    { date: '2025-06-13', checkIn: '08:55 AM', checkOut: '05:45 PM', status: 'Present', totalHours: '8:50' },
    { date: '2025-06-12', checkIn: '--', checkOut: '--', status: 'Leave', totalHours: '--' },
  ];
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{
      p: 3,
      mt: { xs: 8, sm: 9 },
      maxWidth: 1400,
      mx: 'auto'
    }}>
      <Typography
        variant="h4"
        gutterBottom
        className="dashboard-title"
        sx={{ mb: 4, fontFamily: 'Futura, Arial, sans-serif', textTransform: 'lowercase' }}
      >
        fahss employee profile & certifications
      </Typography>
      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, backgroundColor: '#f8fafc', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  bgcolor: '#1976d2',
                  fontSize: '2.5rem'
                }}
              >
                {employee.name[0]}
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1 }}>{employee.name}</Typography>
              <Typography color="textSecondary" sx={{ mb: 0.5 }}>{employee.position}</Typography>
              <Typography color="textSecondary" sx={{ mb: 2 }}>{employee.department}</Typography>
              <Button
                variant="contained"
                color={clockedIn ? "error" : "primary"}
                onClick={() => setClockedIn(!clockedIn)}
                sx={{ mb: 3, width: '80%' }}
              >
                {clockedIn ? 'Clock Out' : 'Clock In'}
              </Button>
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Employee Details</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><BadgeIcon /></ListItemIcon>
                    <ListItemText primary="ID" secondary={employee.id} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ContactMailIcon /></ListItemIcon>
                    <ListItemText primary="Email" secondary={employee.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><WorkIcon /></ListItemIcon>
                    <ListItemText primary="Join Date" secondary={employee.joinDate} />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Card>
        </Grid>
        {/* Tabs Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'none',
                }
              }}
            >
              <Tab icon={<ContactMailIcon />} label="Personal Details" />
              <Tab icon={<SchoolIcon />} label="Qualifications" />
              <Tab icon={<MenuBookIcon />} label="Training" />
              <Tab icon={<MilitaryTechIcon />} label="Certifications" />
              <Tab icon={<AccessTimeIcon />} label="Attendance" />
            </Tabs>
            {/* Personal Details Tab */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Date of Birth"
                            secondary={employee.personalDetails.dateOfBirth}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Nationality"
                            secondary={employee.personalDetails.nationality}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Address"
                            secondary={employee.personalDetails.address}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>Emergency Contact</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Name"
                            secondary={employee.personalDetails.emergencyContact.name}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Relationship"
                            secondary={employee.personalDetails.emergencyContact.relationship}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Phone"
                            secondary={employee.personalDetails.emergencyContact.phone}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}
            {/* Qualifications Tab */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {employee.qualifications.map((qual, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6">{qual.degree}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {qual.institution}
                            </Typography>
                            <Typography variant="body2">
                              Year: {qual.year}
                            </Typography>
                          </Box>
                          <Chip
                            label={qual.status}
                            color="primary"
                            size="small"
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {/* Training Tab */}
            {tabValue === 2 && (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {employee.trainings.map((training, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6">{training.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Provider: {training.provider}
                            </Typography>
                            <Typography variant="body2">
                              Completed: {training.completionDate}
                            </Typography>
                            <Typography variant="body2">
                              Valid Until: {training.validUntil}
                            </Typography>
                          </Box>
                          <Chip
                            label={training.status}
                            color={training.status === 'Active' ? 'success' : 'default'}
                            icon={training.status === 'Active' ? <CheckCircleIcon /> : undefined}
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {/* Certifications Tab */}
            {tabValue === 3 && (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {employee.certifications.map((cert, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6">{cert.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Provider: {cert.provider}
                            </Typography>
                            <Typography variant="body2">
                              Certificate ID: {cert.certId}
                            </Typography>
                            <Typography variant="body2">
                              Valid: {cert.issueDate} to {cert.expiryDate}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                            <Chip
                              label={cert.status}
                              color={cert.status === 'Active' ? 'success' : 'error'}
                              icon={cert.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                            />
                            <IconButton color="primary" size="small">
                              <DownloadIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {/* Attendance Tab */}
            {tabValue === 4 && (
              <Box sx={{ p: 3 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Check In</TableCell>
                        <TableCell>Check Out</TableCell>
                        <TableCell>Total Hours</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendance.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.checkIn}</TableCell>
                          <TableCell>{row.checkOut}</TableCell>
                          <TableCell>{row.totalHours}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={row.status === 'Present' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmployeeProfile;
