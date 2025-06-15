import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  AccessTime as AccessTimeIcon,
  Add as AddIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend } from 'date-fns';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, ChartTooltip, Legend, BarElement, CategoryScale, LinearScale);

// Styled components
const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const CalendarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 900,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255,255,255,0.85)',
  borderRadius: 16,
  boxShadow: '0 2px 12px 0 rgba(31, 38, 135, 0.10)',
  overflow: 'hidden',
  position: 'relative',
}));

const CalendarScrollArea = styled(Box)(({ theme }) => ({
  maxHeight: 340,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(2),
  minWidth: 0,
}));

const CalendarWrapper = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: '2px',
  minWidth: 0,
  maxWidth: '100%',
  background: 'rgba(255,255,255,0.7)',
  borderRadius: 12,
  boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.07)',
}));

const CalendarCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isWeekend',
})(({ theme, isWeekend }) => ({
  padding: theme.spacing(0.25),
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: isWeekend ? 'rgba(0, 0, 0, 0.03)' : undefined,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: 0,
  fontSize: '0.85rem',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DayNumber = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '4px',
  fontSize: '0.85em',
}));

const CalendarSummaryBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  background: 'linear-gradient(90deg, #e3f0ff 0%, #fafcff 100%)',
  zIndex: 2,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid #e0e0e0',
}));

const AnalyticsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'box-shadow 0.2s',
  '&:hover': {
    boxShadow: '0 16px 40px 0 rgba(31, 38, 135, 0.22)',
    background: 'rgba(255,255,255,0.95)',
  },
}));

const mockSectors = [
  'Healthcare',
  'Education',
  'Social Services',
  'Administration',
  'Community Development'
];

const mockWBSCodes = [
  { code: 'WBS001', description: 'Project Planning', fullCode: 'WBS001 - Project Planning' },
  { code: 'WBS002', description: 'Implementation', fullCode: 'WBS002 - Implementation' },
  { code: 'WBS003', description: 'Monitoring', fullCode: 'WBS003 - Monitoring' },
  { code: 'WBS004', description: 'Evaluation', fullCode: 'WBS004 - Evaluation' },
  { code: 'WBS005', description: 'Reporting', fullCode: 'WBS005 - Reporting' }
];

const mockActivities = [
  'Project Management',
  'Direct Service Delivery',
  'Stakeholder Engagement',
  'Documentation',
  'Client Relations',
  'Administrative',
  'Training & Development'
];

const defaultEntry = {
  date: format(new Date(), 'yyyy-MM-dd'),
  hours: 0,
  status: 'pending',
  projectCode: '',
  sector: mockSectors[0],
  wbsCode: mockWBSCodes[0].fullCode,
  activity: mockActivities[0],
  impediments: '',
  user: 'Current User'
};

const dummyEntries = [
  { id: '1', date: '2025-06-01', hours: 8, status: 'approved', projectCode: 'PRJ001', sector: 'Healthcare', wbsCode: 'WBS001 - Project Planning', activity: 'Project Management', impediments: '', user: 'Alice' },
  { id: '2', date: '2025-06-01', hours: 4, status: 'approved', projectCode: 'PRJ002', sector: 'Education', wbsCode: 'WBS002 - Implementation', activity: 'Direct Service Delivery', impediments: '', user: 'Bob' },
  { id: '3', date: '2025-06-02', hours: 6, status: 'pending', projectCode: 'PRJ003', sector: 'Social Services', wbsCode: 'WBS003 - Monitoring', activity: 'Stakeholder Engagement', impediments: '', user: 'Charlie' },
  { id: '4', date: '2025-06-02', hours: 2, status: 'approved', projectCode: 'PRJ004', sector: 'Administration', wbsCode: 'WBS004 - Evaluation', activity: 'Documentation', impediments: '', user: 'Alice' },
  { id: '5', date: '2025-06-03', hours: 5, status: 'rejected', projectCode: 'PRJ005', sector: 'Community Development', wbsCode: 'WBS005 - Reporting', activity: 'Client Relations', impediments: '', user: 'Bob' },
  { id: '6', date: '2025-06-03', hours: 3, status: 'approved', projectCode: 'PRJ001', sector: 'Healthcare', wbsCode: 'WBS002 - Implementation', activity: 'Training & Development', impediments: '', user: 'Charlie' },
  { id: '7', date: '2025-06-04', hours: 7, status: 'approved', projectCode: 'PRJ002', sector: 'Education', wbsCode: 'WBS003 - Monitoring', activity: 'Project Management', impediments: '', user: 'Alice' },
  { id: '8', date: '2025-06-04', hours: 4, status: 'pending', projectCode: 'PRJ003', sector: 'Social Services', wbsCode: 'WBS004 - Evaluation', activity: 'Direct Service Delivery', impediments: '', user: 'Bob' },
  { id: '9', date: '2025-06-05', hours: 6, status: 'approved', projectCode: 'PRJ004', sector: 'Administration', wbsCode: 'WBS005 - Reporting', activity: 'Stakeholder Engagement', impediments: '', user: 'Charlie' },
  { id: '10', date: '2025-06-05', hours: 2, status: 'approved', projectCode: 'PRJ005', sector: 'Community Development', wbsCode: 'WBS001 - Project Planning', activity: 'Documentation', impediments: '', user: 'Alice' },
  { id: '11', date: '2025-06-06', hours: 8, status: 'approved', projectCode: 'PRJ006', sector: 'Healthcare', wbsCode: 'WBS003 - Monitoring', activity: 'Administrative', impediments: '', user: 'David' },
  { id: '12', date: '2025-06-07', hours: 7, status: 'approved', projectCode: 'PRJ007', sector: 'Education', wbsCode: 'WBS004 - Evaluation', activity: 'Training & Development', impediments: '', user: 'Eve' },
  { id: '13', date: '2025-06-08', hours: 6, status: 'pending', projectCode: 'PRJ008', sector: 'Social Services', wbsCode: 'WBS005 - Reporting', activity: 'Client Relations', impediments: '', user: 'Frank' },
  { id: '14', date: '2025-06-09', hours: 5, status: 'approved', projectCode: 'PRJ009', sector: 'Administration', wbsCode: 'WBS001 - Project Planning', activity: 'Project Management', impediments: '', user: 'Grace' },
  { id: '15', date: '2025-06-10', hours: 4, status: 'approved', projectCode: 'PRJ010', sector: 'Community Development', wbsCode: 'WBS002 - Implementation', activity: 'Direct Service Delivery', impediments: '', user: 'Heidi' },
  { id: '16', date: '2025-06-11', hours: 8, status: 'approved', projectCode: 'PRJ001', sector: 'Healthcare', wbsCode: 'WBS003 - Monitoring', activity: 'Stakeholder Engagement', impediments: '', user: 'Ivan' },
  { id: '17', date: '2025-06-12', hours: 7, status: 'approved', projectCode: 'PRJ002', sector: 'Education', wbsCode: 'WBS004 - Evaluation', activity: 'Documentation', impediments: '', user: 'Judy' },
  { id: '18', date: '2025-06-13', hours: 6, status: 'pending', projectCode: 'PRJ003', sector: 'Social Services', wbsCode: 'WBS005 - Reporting', activity: 'Client Relations', impediments: '', user: 'Mallory' },
  { id: '19', date: '2025-06-14', hours: 5, status: 'approved', projectCode: 'PRJ004', sector: 'Administration', wbsCode: 'WBS001 - Project Planning', activity: 'Project Management', impediments: '', user: 'Niaj' },
  { id: '20', date: '2025-06-15', hours: 4, status: 'approved', projectCode: 'PRJ005', sector: 'Community Development', wbsCode: 'WBS002 - Implementation', activity: 'Direct Service Delivery', impediments: '', user: 'Olivia' },
];

function Timesheet() {
  const [entries, setEntries] = useState(dummyEntries);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [newEntry, setNewEntry] = useState(defaultEntry);
  const [openBulkDialog, setOpenBulkDialog] = useState(false);

  const daysInMonth = selectedMonth
    ? eachDayOfInterval({
        start: startOfMonth(selectedMonth),
        end: endOfMonth(selectedMonth),
      })
    : [];

  const handleSave = () => {
    const entry = {
      ...newEntry,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEntries((prev) => [...prev, entry]);
    setNewEntry(defaultEntry);
    setOpenDialog(false);
  };

  const handleBulkEntry = (bulkEntry) => {
    const { hoursPerDay, excludeWeekends, ...rest } = bulkEntry;
    const newEntries = [];
    daysInMonth.forEach((date) => {
      if (excludeWeekends && isWeekend(date)) return;
      newEntries.push({
        id: Math.random().toString(36).substr(2, 9),
        date: format(date, 'yyyy-MM-dd'),
        hours: hoursPerDay,
        status: 'pending',
        user: 'Current User',
        ...rest,
      });
    });
    setEntries((prev) => [...prev, ...newEntries]);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', mt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.palette.primary.main,
            mb: 1,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          Timesheet Management
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
          Manage and analyze employee time allocations with rich analytics and easy entry.
        </Typography>
        <Divider />
      </Box>
      <GlassCard sx={{ p: 3 }}>
        <TimesheetAnalytics entries={entries} />
        <CalendarContainer>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<TableChartIcon />}
              onClick={() => setOpenBulkDialog(true)}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976d2, #2196f3)'
                }
              }}
            >
              Bulk Time Entry
            </Button>
          </Box>
          <CalendarScrollArea>
            <CalendarWrapper component="div">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <WeekdayHeader key={day} component="div">{day}</WeekdayHeader>
              ))}
              {daysInMonth.map((date) => (
                <CalendarCell
                  key={date.toISOString()}
                  isWeekend={isWeekend(date)}
                  onClick={() => {
                    setNewEntry({ ...defaultEntry, date: format(date, 'yyyy-MM-dd') });
                    setOpenDialog(true);
                  }}
                >
                  <DayNumber>
                    <Typography variant="caption">
                      {format(date, 'd')}
                    </Typography>
                    {entries.some(
                      (entry) => entry.date === format(date, 'yyyy-MM-dd')
                    ) && <AccessTimeIcon color="primary" fontSize="small" />}
                  </DayNumber>
                  {entries
                    .filter((entry) => entry.date === format(date, 'yyyy-MM-dd'))
                    .map((entry) => (
                      <Chip
                        key={entry.id}
                        size="small"
                        label={`${entry.hours}h - ${entry.activity}`}
                        sx={{ mb: 0.5, maxWidth: '100%' }}
                      />
                    ))}
                </CalendarCell>
              ))}
            </CalendarWrapper>
          </CalendarScrollArea>
          <CalendarSummaryBar>
            <Typography variant="h6">
              Total Hours: {entries.reduce((acc, curr) => acc + curr.hours, 0)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Entry
            </Button>
          </CalendarSummaryBar>
        </CalendarContainer>
      </GlassCard>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {newEntry.id ? 'Edit Time Entry' : 'Add Time Entry'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Sector</InputLabel>
              <Select
                value={newEntry.sector}
                onChange={(e) => setNewEntry({ ...newEntry, sector: e.target.value })}
                label="Sector"
              >
                {mockSectors.map((sector) => (
                  <MenuItem key={sector} value={sector}>
                    {sector}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>WBS Code</InputLabel>
              <Select
                value={newEntry.wbsCode}
                onChange={(e) => setNewEntry({ ...newEntry, wbsCode: e.target.value })}
                label="WBS Code"
              >
                {mockWBSCodes.map((wbs) => (
                  <MenuItem key={wbs.fullCode} value={wbs.fullCode}>
                    {wbs.code} - {wbs.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Activity</InputLabel>
              <Select
                value={newEntry.activity}
                onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })}
                label="Activity"
              >
                {mockActivities.map((activity) => (
                  <MenuItem key={activity} value={activity}>
                    {activity}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Project Code"
              value={newEntry.projectCode}
              onChange={(e) => setNewEntry({ ...newEntry, projectCode: e.target.value })}
              fullWidth
            />
            <TextField
              label="Impediments"
              value={newEntry.impediments}
              onChange={(e) => setNewEntry({ ...newEntry, impediments: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Hours"
              type="number"
              value={newEntry.hours}
              onChange={(e) => setNewEntry({ ...newEntry, hours: parseFloat(e.target.value) || 0 })}
              inputProps={{ min: 0, max: 24, step: 0.5 }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Entry
          </Button>
        </DialogActions>
      </Dialog>
      <BulkEntryDialog
        open={openBulkDialog}
        onClose={() => setOpenBulkDialog(false)}
        onSave={handleBulkEntry}
        selectedMonth={selectedMonth}
      />
    </Box>
  );
}

export default Timesheet;

function BulkEntryDialog({ open, onClose, onSave, selectedMonth }) {
  const [bulkEntry, setBulkEntry] = useState({
    wbsCode: '',
    activity: '',
    hoursPerDay: 8,
    sector: '',
    excludeWeekends: true,
  });

  const handleSave = () => {
    onSave(bulkEntry);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Bulk Time Entry for {format(selectedMonth, 'MMMM yyyy')}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>WBS Code</InputLabel>
            <Select
              value={bulkEntry.wbsCode}
              label="WBS Code"
              onChange={(e) => setBulkEntry({ ...bulkEntry, wbsCode: e.target.value })}
            >
              {mockWBSCodes.map((wbs) => (
                <MenuItem key={wbs.fullCode} value={wbs.fullCode}>
                  {wbs.code} - {wbs.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Sector</InputLabel>
            <Select
              value={bulkEntry.sector}
              label="Sector"
              onChange={(e) => setBulkEntry({ ...bulkEntry, sector: e.target.value })}
            >
              {mockSectors.map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Activity Description"
            value={bulkEntry.activity}
            onChange={(e) => setBulkEntry({ ...bulkEntry, activity: e.target.value })}
          />
          <TextField
            fullWidth
            type="number"
            label="Hours per Day"
            value={bulkEntry.hoursPerDay}
            onChange={(e) => setBulkEntry({ ...bulkEntry, hoursPerDay: Number(e.target.value) })}
            inputProps={{ min: 0, max: 24, step: 0.5 }}
          />
          <FormControl>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={bulkEntry.excludeWeekends}
                onChange={(e) => setBulkEntry({ ...bulkEntry, excludeWeekends: e.target.checked })}
              />
              Exclude Weekends
            </label>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #1976d2, #2196f3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0, #1976d2)'
            }
          }}
        >
          Apply to Month
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function TimesheetAnalytics({ entries }) {
  const wbsData = entries.reduce((acc, entry) => {
    acc[entry.wbsCode] = (acc[entry.wbsCode] || 0) + entry.hours;
    return acc;
  }, {});
  const sectorData = entries.reduce((acc, entry) => {
    acc[entry.sector] = (acc[entry.sector] || 0) + entry.hours;
    return acc;
  }, {});
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalEntries = entries.length;
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 22, font: { size: 16 } }
      },
      title: { display: false }
    },
  };
  const wbsChartData = {
    labels: Object.keys(wbsData),
    datasets: [
      {
        data: Object.values(wbsData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };
  const sectorChartData = {
    labels: Object.keys(sectorData),
    datasets: [
      {
        label: 'Hours',
        data: Object.values(sectorData),
        backgroundColor: [
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderRadius: 10,
      },
    ],
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Analytics</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <AnalyticsCard sx={{ width: { xs: '100%', sm: 400 }, minWidth: 260, maxWidth: 500, p: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>WBS Allocation</Typography>
          <Pie data={wbsChartData} options={chartOptions} style={{ maxHeight: 260, maxWidth: 260 }} />
          <Box sx={{ mt: 2, fontSize: 15, color: 'text.secondary', textAlign: 'center' }}>
            <b>Total Hours:</b> {Object.values(wbsData).reduce((a, b) => a + b, 0)}<br />
            <b>Entries:</b> {entries.length}
          </Box>
          <Box sx={{ mt: 1 }}>
            {Object.entries(wbsData).map(([label, value], idx) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', fontSize: 14, mb: 0.5 }}>
                <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: wbsChartData.datasets[0].backgroundColor[idx], mr: 1 }} />
                {label}: {value}h
              </Box>
            ))}
          </Box>
        </AnalyticsCard>
        <AnalyticsCard sx={{ width: { xs: '100%', sm: 400 }, minWidth: 260, maxWidth: 500, p: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Sector Allocation</Typography>
          <Bar data={sectorChartData} options={{
            ...chartOptions,
            indexAxis: 'y',
            plugins: { ...chartOptions.plugins, legend: { display: false } },
            scales: { x: { beginAtZero: true, grid: { display: false } }, y: { grid: { display: false } } }
          }} style={{ maxHeight: 260, maxWidth: 340 }} />
          <Box sx={{ mt: 2, fontSize: 15, color: 'text.secondary', textAlign: 'center' }}>
            <b>Total Hours:</b> {Object.values(sectorData).reduce((a, b) => a + b, 0)}<br />
            <b>Entries:</b> {entries.length}
          </Box>
          <Box sx={{ mt: 1 }}>
            {Object.entries(sectorData).map(([label, value], idx) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', fontSize: 14, mb: 0.5 }}>
                <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: sectorChartData.datasets[0].backgroundColor[idx], mr: 1 }} />
                {label}: {value}h
              </Box>
            ))}
          </Box>
        </AnalyticsCard>
      </Box>
      <Box sx={{ mt: 3, textAlign: 'center', fontSize: 16, color: 'text.secondary' }}>
        <b>Total Timesheet Entries:</b> {totalEntries} &nbsp;|&nbsp; <b>Total Hours:</b> {totalHours}
      </Box>
    </Box>
  );
}

const WeekdayHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '0.9em',
  borderRadius: 6,
}));
