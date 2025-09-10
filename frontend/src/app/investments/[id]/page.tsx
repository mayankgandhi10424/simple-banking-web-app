'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  CircularProgress,
  Alert,
  Stack,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  TrendingUp,
  TrendingDown,
  Timeline
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FundData {
  date: string;
  nav: string;
}

interface FundDetails {
  meta: {
    fund_house: string;
    scheme_type: string;
    scheme_category: string;
    scheme_code: number;
    scheme_name: string;
  };
  data: FundData[];
}

type TimeSpan = '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL';

const TIME_SPAN_OPTIONS: { label: string; value: TimeSpan; months?: number }[] = [
  { label: '1 Month', value: '1M', months: 1 },
  { label: '3 Months', value: '3M', months: 3 },
  { label: '6 Months', value: '6M', months: 6 },
  { label: '1 Year', value: '1Y', months: 12 },
  { label: '3 Years', value: '3Y', months: 36 },
  { label: '5 Years', value: '5Y', months: 60 },
  { label: 'All Time', value: 'ALL' },
];

export default function MutualFundDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const schemeCode = params?.id as string;

  const [fundDetails, setFundDetails] = useState<FundDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeSpan, setSelectedTimeSpan] = useState<TimeSpan>('1Y');

  // Helper function to safely parse dates (API uses DD-MM-YYYY format)
  const parseDate = (dateString: string): Date => {
    // First try parsing DD-MM-YYYY format which is used by the API
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
      const year = parseInt(parts[2], 10);

      // Validate the parsed values
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(year, month, day);
        // Verify the date is valid by checking if the components match
        if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
          return date;
        }
      }
    }

    // Fallback to standard parsing if DD-MM-YYYY parsing fails
    let date = new Date(dateString);

    // If standard parsing fails, try other formats
    if (isNaN(date.getTime())) {
      // Try replacing hyphens with slashes
      date = new Date(dateString.replace(/-/g, '/'));
    }

    return date;
  };

  useEffect(() => {
    if (!schemeCode) return;

    const fetchFundDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);

        if (!response.ok) {
          throw new Error('Failed to fetch mutual fund details');
        }

        const data: FundDetails = await response.json();
        setFundDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFundDetails();
  }, [schemeCode]);

  const getFilteredData = () => {
    if (!fundDetails?.data) return [];

    // Get today's date at midnight (beginning of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeSpanOption = TIME_SPAN_OPTIONS.find(option => option.value === selectedTimeSpan);

    // Filter out items with invalid dates or NAV values
    const validData = fundDetails.data.filter(item => {
      const itemDate = parseDate(item.date);
      const navValue = parseFloat(item.nav);
      return !isNaN(itemDate.getTime()) && !isNaN(navValue) && navValue > 0;
    });

    if (selectedTimeSpan === 'ALL') {
      return validData.slice().reverse(); // Reverse to show chronological order
    }

    if (timeSpanOption?.months) {
      // Create cutoff date by going back the specified number of months from today
      const cutoffDate = new Date(today);
      cutoffDate.setMonth(cutoffDate.getMonth() - timeSpanOption.months);

      // Ensure we're comparing dates only (not time)
      cutoffDate.setHours(0, 0, 0, 0);

      console.log('Today:', today.toDateString());
      console.log('Cutoff Date:', cutoffDate.toDateString());
      console.log('Months back:', timeSpanOption.months);

      return validData
        .filter(item => {
          const itemDate = parseDate(item.date);
          // Set item date to beginning of day for fair comparison
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= cutoffDate;
        })
        .slice()
        .reverse();
    }

    return validData.slice().reverse();
  };

  const getChartData = () => {
    const filteredData = getFilteredData();

    return {
      labels: filteredData.map(() => ''),
      datasets: [
        {
          label: 'NAV (₹)',
          data: filteredData.map(item => parseFloat(item.nav)),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: 'rgb(75, 192, 192)',
          showLine: true,
        },
      ],
    };
  };

  const getPerformanceStats = () => {
    const filteredData = getFilteredData();
    if (filteredData.length < 2) return null;

    const latestNav = parseFloat(filteredData[filteredData.length - 1].nav);
    const oldestNav = parseFloat(filteredData[0].nav);
    const change = latestNav - oldestNav;
    const changePercent = ((change / oldestNav) * 100);

    // Calculate time period in years for annualized return
    const startDate = parseDate(filteredData[0].date);
    const endDate = parseDate(filteredData[filteredData.length - 1].date);
    const timeDiffMs = endDate.getTime() - startDate.getTime();
    const timeDiffYears = timeDiffMs / (1000 * 60 * 60 * 24 * 365.25);

    // Calculate annualized return using CAGR formula: (ending value / beginning value)^(1/years) - 1
    let annualizedReturn = 0;
    if (timeDiffYears > 0) {
      if (timeDiffYears >= 1) {
        // For periods of 1 year or more, use CAGR
        annualizedReturn = (Math.pow(latestNav / oldestNav, 1 / timeDiffYears) - 1) * 100;
      } else {
        // For periods less than 1 year, annualize the simple return
        annualizedReturn = changePercent / timeDiffYears;
      }
    }

    return {
      change,
      changePercent: parseFloat(changePercent.toFixed(2)),
      annualizedReturn: parseFloat(annualizedReturn.toFixed(2)),
      timePeriodYears: parseFloat(timeDiffYears.toFixed(2)),
      latestNav,
      isPositive: change >= 0,
      isAnnualizedPositive: annualizedReturn >= 0
    };
  };

  const chartOptions = {
    responsive: true,
    backgroundColor: 'white',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            const filteredData = getFilteredData();
            const index = context[0].dataIndex;
            if (filteredData[index]) {
              const date = parseDate(filteredData[index].date);
              return date.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              });
            }
            return '';
          },
          label: function (context: any) {
            return `NAV: ₹${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: false
        },
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
      x: {
        title: {
          display: false
        },
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
    },
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !fundDetails) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Failed to load mutual fund details'}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  const performanceStats = getPerformanceStats();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back to Investments
        </Button>

        <Typography variant="h4" gutterBottom>
          {fundDetails.meta.scheme_name}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label={fundDetails.meta.fund_house} color="primary" />
          <Chip label={fundDetails.meta.scheme_type} color="secondary" />
          <Chip label={fundDetails.meta.scheme_category} color="default" />
        </Box>
      </Box>

      {/* Chart and Performance Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
            {/* Chart Section */}
            <Box sx={{ flex: 2 }}>
              <Paper sx={{ p: 2, height: 400, mb: 3, backgroundColor: 'white' }}>
                <Line data={getChartData()} options={chartOptions} />
              </Paper>

              {/* Time Span Selector */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ButtonGroup variant="outlined" size="small">
                  {TIME_SPAN_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      variant={selectedTimeSpan === option.value ? 'contained' : 'outlined'}
                      onClick={() => setSelectedTimeSpan(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
            </Box>

            {/* Performance Overview - Vertical */}
            {performanceStats && (
              <Box sx={{ flex: 1, minWidth: '250px' }}>
                <Typography variant="h6" gutterBottom>
                  Performance Overview ({selectedTimeSpan})
                </Typography>
                <Stack spacing={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Current NAV
                    </Typography>
                    <Typography variant="h5">
                      ₹{performanceStats.latestNav.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Change (₹)
                    </Typography>
                    <Typography
                      variant="h5"
                      color={performanceStats.isPositive ? 'success.main' : 'error.main'}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {performanceStats.isPositive ? <TrendingUp /> : <TrendingDown />}
                      {performanceStats.isPositive ? '+' : ''}₹{performanceStats.change.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Change (%)
                    </Typography>
                    <Typography
                      variant="h5"
                      color={performanceStats.isPositive ? 'success.main' : 'error.main'}
                    >
                      {performanceStats.isPositive ? '+' : ''}{performanceStats.changePercent}%
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Annualized Return
                    </Typography>
                    <Typography
                      variant="h5"
                      color={performanceStats.isAnnualizedPositive ? 'success.main' : 'error.main'}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {performanceStats.isAnnualizedPositive ? <TrendingUp /> : <TrendingDown />}
                      {performanceStats.isAnnualizedPositive ? '+' : ''}{performanceStats.annualizedReturn}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({performanceStats.timePeriodYears}y period)
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Fund Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Fund Information
          </Typography>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">Fund House</Typography>
                <Typography variant="body1">{fundDetails.meta.fund_house}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">Scheme Type</Typography>
                <Typography variant="body1">{fundDetails.meta.scheme_type}</Typography>
              </Box>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">Category</Typography>
                <Typography variant="body1">{fundDetails.meta.scheme_category}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">Scheme Code</Typography>
                <Typography variant="body1">{fundDetails.meta.scheme_code}</Typography>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
