'use client';

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  AccountBalance,
  CreditCard,
  TrendingUp,
  Security
} from '@mui/icons-material';

export default function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AccountBalance sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Simple Banking
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Simple Banking
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Your trusted partner for secure and convenient banking solutions
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, mr: 2 }}
          >
            Open Account
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ mt: 2 }}
          >
            Learn More
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 4
          }}
        >
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <AccountBalance sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Personal Banking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your personal finances with our comprehensive banking services
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <CreditCard sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Credit Cards
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose from our range of credit cards with competitive rates
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <TrendingUp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Investments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grow your wealth with our investment and savings products
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Security sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Secure Banking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bank with confidence using our advanced security features
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
