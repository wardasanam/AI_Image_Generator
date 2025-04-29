import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 2 }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} AI Image Generator
      </Typography>
    </Box>
  );
};

export default Footer;