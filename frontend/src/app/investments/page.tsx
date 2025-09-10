'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Pagination,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp
} from '@mui/icons-material';

interface MutualFund {
  schemeCode: number;
  schemeName: string;
  isinGrowth: string | null;
  isinDivReinvestment: string | null;
}

const ITEMS_PER_PAGE = 20;

export default function InvestmentsPage() {
  const router = useRouter();
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<MutualFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMutualFunds = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.mfapi.in/mf');
        if (!response.ok) {
          throw new Error('Failed to fetch mutual funds data');
        }
        const data: MutualFund[] = await response.json();
        setMutualFunds(data);
        setFilteredFunds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMutualFunds();
  }, []);

  useEffect(() => {
    const filtered = mutualFunds.filter(fund =>
      fund.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFunds(filtered);
    setCurrentPage(1);
  }, [searchTerm, mutualFunds]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(filteredFunds.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFunds = filteredFunds.slice(startIndex, endIndex);

  const getFundType = (schemeName: string): string => {
    const name = schemeName.toLowerCase();
    if (name.includes('equity') || name.includes('stock')) return 'Equity';
    if (name.includes('debt') || name.includes('bond') || name.includes('gilt')) return 'Debt';
    if (name.includes('hybrid') || name.includes('balanced')) return 'Hybrid';
    if (name.includes('index') || name.includes('etf')) return 'Index';
    if (name.includes('elss') || name.includes('tax saver')) return 'ELSS';
    if (name.includes('liquid') || name.includes('money market')) return 'Liquid';
    return 'Other';
  };

  const getFundTypeColor = (type: string): "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default" => {
    switch (type) {
      case 'Equity': return 'success';
      case 'Debt': return 'info';
      case 'Hybrid': return 'warning';
      case 'Index': return 'primary';
      case 'ELSS': return 'secondary';
      case 'Liquid': return 'default';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Discover Investment Opportunities
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph>
          Explore thousands of mutual funds from India's leading fund houses
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search mutual funds by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 600, mx: 'auto', display: 'block' }}
        />
      </Box>

      {!loading && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Showing <strong>{currentFunds.length}</strong> of <strong>{filteredFunds.length}</strong> mutual funds
            {searchTerm && ` matching "${searchTerm}"`}
          </Typography>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {error && (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h6" color="error" gutterBottom>
            Error loading mutual funds
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      )}

      {!loading && !error && (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {currentFunds.map((fund) => (
              <Box key={fund.schemeCode}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={getFundType(fund.schemeName)}
                        color={getFundTypeColor(getFundType(fund.schemeName))}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        height: '3.9rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {fund.schemeName}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Scheme Code:</strong> {fund.schemeCode}
                      </Typography>

                      {fund.isinGrowth && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Growth ISIN:</strong> {fund.isinGrowth}
                        </Typography>
                      )}

                      {fund.isinDivReinvestment && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Dividend ISIN:</strong> {fund.isinDivReinvestment}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        startIcon={<TrendingUp />}
                        onClick={() => {
                          router.push(`/investments/${fund.schemeCode}`);
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}

          {filteredFunds.length === 0 && searchTerm && (
            <Box sx={{ textAlign: 'center', my: 8 }}>
              <Typography variant="h6" gutterBottom>
                No mutual funds found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search term
              </Typography>
              <Button
                variant="contained"
                onClick={() => setSearchTerm('')}
                sx={{ mt: 2 }}
              >
                Clear Search
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
