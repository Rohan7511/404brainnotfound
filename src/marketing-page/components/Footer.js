import * as React from 'react';
import { Typography, Link, Box, Container } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '} 
      <Link color="text.secondary" href="#">
        404 Brain Not Found
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 4, sm: 6 },
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 4,
      }}
    >
      <Box>
        <Link color="text.secondary" variant="body2" href="#">
          Privacy Policy
        </Link>
        <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
          &nbsp;•&nbsp;
        </Typography>
        <Link color="text.secondary" variant="body2" href="#">
          Terms of Service
        </Link>
      </Box>
      <Copyright />
    </Container>
  );
}
