import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  IconButton,
  TextField,
  Chip,
  Avatar
} from "@mui/material";
import {
  Assessment as ReportsIcon,
  Description as ReportIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as ExcelIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  Build as CustomReportIcon,
  GetApp as DownloadIcon,
  Send as SendIcon,
  CalendarToday as CalendarIcon
} from "@mui/icons-material";
import '../Reports.css';

function Reports() {
  const availableReports = [
    {
      id: 1,
      name: "Asset Inventory Report",
      description: "Complete list of all assets",
      icon: <ReportIcon color="primary" />
    },
    {
      id: 2,
      name: "Depreciation Report",
      description: "Asset depreciation over time",
      icon: <ReportIcon color="primary" />
    },
    {
      id: 3,
      name: "Maintenance Report",
      description: "Assets requiring maintenance",
      icon: <ReportIcon color="primary" />
    },
    {
      id: 4,
      name: "Financial Summary",
      description: "Asset financial overview",
      icon: <ReportIcon color="primary" />
    },
  ];

  const recentReports = [
    {
      id: 101,
      name: "Asset Inventory - Q1 2023",
      date: "2023-03-31",
      format: "PDF",
    },
    {
      id: 102,
      name: "Depreciation - March 2023",
      date: "2023-03-15",
      format: "Excel",
    },
    {
      id: 103,
      name: "Financial Summary - 2022",
      date: "2023-01-10",
      format: "PDF",
    },
  ];

  return (
    <Box className="reports-container">
      <Typography variant="h4" gutterBottom className="reports-title">
        <ReportsIcon className="title-icon" /> Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="report-section">
            <Typography variant="h6" className="section-header">
              Available Reports
            </Typography>
            <List className="report-list">
              {availableReports.map((report) => (
                <React.Fragment key={report.id}>
                  <ListItem className="report-item">
                    <ListItemIcon className="report-icon">
                      {report.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={<span className="report-name">{report.name}</span>}
                      secondary={<span className="report-description">{report.description}</span>}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      className="generate-button"
                    >
                      Generate
                    </Button>
                  </ListItem>
                  <Divider className="report-divider" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="report-section">
            <Typography variant="h6" className="section-header">
              Recently Generated Reports
            </Typography>
            <List className="report-list">
              {recentReports.map((report) => (
                <React.Fragment key={report.id}>
                  <ListItem className="report-item">
                    <ListItemText
                      primary={<span className="report-name">{report.name}</span>}
                      secondary={
                        <Box className="report-meta">
                          <span className="report-date">
                            <CalendarIcon fontSize="small" /> {report.date}
                          </span>
                          <Chip
                            label={report.format}
                            size="small"
                            className={`format-chip ${report.format.toLowerCase()}`}
                          />
                        </Box>
                      }
                    />
                    <Box className="report-actions">
                      <Tooltip title="Download">
                        <IconButton className="action-button download">
                          {report.format === "PDF" ? <PdfIcon /> : <ExcelIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Email">
                        <IconButton className="action-button email">
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Schedule">
                        <IconButton className="action-button schedule">
                          <ScheduleIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                  <Divider className="report-divider" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="custom-report-section">
            <Typography variant="h6" className="section-header">
              <CustomReportIcon className="section-icon" /> Custom Report Builder
            </Typography>
            <Box className="custom-report-form">
              <Typography className="form-description">
                Configure your custom report by selecting parameters below
              </Typography>
              <Grid container spacing={2} className="form-fields">
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    label="Report Type"
                    fullWidth
                    className="form-field"
                    SelectProps={{ native: true }}
                  >
                    <option value="inventory">Inventory</option>
                    <option value="financial">Financial</option>
                    <option value="maintenance">Maintenance</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    label="Time Period"
                    fullWidth
                    className="form-field"
                    SelectProps={{ native: true }}
                  >
                    <option value="current">Current</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                    <option value="custom">Custom Range</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    label="Format"
                    fullWidth
                    className="form-field"
                    SelectProps={{ native: true }}
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </TextField>
                </Grid>
              </Grid>
              <Box className="form-actions">
                <Button variant="outlined" className="preview-button">
                  Preview
                </Button>
                <Button variant="contained" className="generate-button">
                  Generate Report
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports;
