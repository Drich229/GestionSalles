import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2', // Couleur bleue
        color: 'white',
        textAlign: 'center',
        padding: '16px',
        marginTop: 'auto', // Pour coller le footer en bas
      }}
    >
      <Typography variant="body1">
        © 2025 Plateforme de gestion des salles de cours. Tous droits réservés.
      </Typography>
    </Box>
  );
};

export default Footer;