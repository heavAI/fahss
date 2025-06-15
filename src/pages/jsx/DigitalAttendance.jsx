import React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Search as SearchIcon,
  Place as PlaceIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

// Styled components
const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const CenteredBox = styled(Box)({
  textAlign: 'center',
});

const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const GridBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const StatsCardComponent = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Components
function StatsCard({ title, value, icon }) {
  return (
    <StatsCardComponent>
      <CardContent>
        <FlexBox component="div">
          <IconWrapper>
            {React.cloneElement(icon, {
              sx: { color: '#fff' },
            })}
          </IconWrapper>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </FlexBox>
        <Typography variant="h4" color="primary.main">
          {value}
        </Typography>
      </CardContent>
    </StatsCardComponent>
  );
}

function DigitalAttendance() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const currentTime = format(new Date(), 'HH:mm');
  const currentDate = format(new Date(), 'MMM dd, yyyy');

  return (
    <StyledBox component="div" sx={{ p: 3 }}>
      <Box component="div" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          Digital Attendance
        </Typography>
        <Divider />
      </Box>

      <FlexBox component="div" sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Time Card */}
        <Box component="div" sx={{ flex: { xs: '1 1 auto', md: '0 0 25%' } }}>
          <StatsCardComponent>
            <CardContent>
              <CenteredBox component="div" sx={{ mb: 3 }}>
                <AccessTimeIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {currentTime}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {currentDate}
                </Typography>
              </CenteredBox>
              <Divider sx={{ my: 2 }} />
              <FlexBox component="div" sx={{ mb: 2 }}>
                <PlaceIcon color="primary" sx={{ mr: 1 }} />
                <Typography>Main Office</Typography>
              </FlexBox>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                startIcon={<CheckCircleIcon />}
              >
                Check In
              </Button>
            </CardContent>
          </StatsCardComponent>
        </Box>

        {/* Stats & Records */}
        <StyledBox component="div" sx={{ flex: { xs: '1 1 auto', md: '0 0 75%' }, gap: 3 }}>
          <GridBox component="div">
            <StatsCard
              title="Present Days"
              value="22"
              icon={<CheckCircleIcon />}
            />
            <StatsCard
              title="Absent Days"
              value="3"
              icon={<CancelIcon />}
            />
            <StatsCard
              title="Late Days"
              value="1"
              icon={<AccessTimeIcon />}
            />
          </GridBox>

          {/* Records */}
          <StatsCardComponent>
            <CardContent>
              <FlexBox
                component="div"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography variant="h6">Attendance Records</Typography>
                <TextField
                  size="small"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FlexBox>
              {/* Add DataGrid component here */}
            </CardContent>
          </StatsCardComponent>
        </StyledBox>
      </FlexBox>
    </StyledBox>
  );
}

export default DigitalAttendance;