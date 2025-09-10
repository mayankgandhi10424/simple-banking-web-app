'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  ArrowBack
} from '@mui/icons-material';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getHeaderContent = () => {
    // During SSR or before hydration, show default content
    if (!isClient) {
      return {
        icon: <AccountBalance sx={{ mr: 2 }} />,
        title: 'Simple Banking',
        showBackButton: false
      };
    }

    if (pathname === '/investments') {
      return {
        icon: <TrendingUp sx={{ mr: 2 }} />,
        title: 'Investment Hub - Mutual Funds',
        showBackButton: true
      };
    }

    // Default homepage header
    return {
      icon: <AccountBalance sx={{ mr: 2 }} />,
      title: 'Simple Banking',
      showBackButton: false
    };
  };

  const { icon, title, showBackButton } = getHeaderContent();

  return (
    <AppBar position="static">
      <Toolbar>
        {showBackButton && (
          <Link href="/" passHref>
            <Button
              color="inherit"
              startIcon={<ArrowBack />}
              sx={{
                mr: 2,
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Back to Home
            </Button>
          </Link>
        )}
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            color="inherit"
            startIcon={icon}
            sx={{
              textTransform: 'none',
              fontSize: '1.25rem',
              fontWeight: 500,
              mr: 'auto'
            }}
          >
            {title}
          </Button>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {!showBackButton && (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
