import React from 'react';
import { Box, Card, CardContent, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; 
import HowToRegIcon from '@mui/icons-material/HowToReg'; 

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
      }}
    >
      <Card
        sx={{
          backgroundColor: 'rgba(33, 150, 243, 0.9)',
          color: 'white',
          maxWidth: 1200,
         
          textAlign: 'center',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent>
            <MeetingRoomIcon sx={{ fontSize: 60, mb: 2, color: 'white' }} />

          <Typography variant="h4" component="div" sx={{fontWeight: 'bold', mb: 2 }}>
            Bienvenue sur
          </Typography>
          <Typography variant="h4" component="div" sx={{fontWeight: 'bold', mb: 2 }}>
            la plateforme de gestion des salles de cours.
          </Typography>

          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#1976d2',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            startIcon={<HowToRegIcon />} // Icône à gauche du texte
          >
            Inscrivez-vous
          </Button>

          {/* Lien "Déjà inscrit, connectez-vous" */}
          <Box sx={{ mt: 2 }}>
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: 'white',
                textDecoration: 'underline', // Souligner le texte
                '&:hover': {
                  color: '#f5f5f5', // Changer la couleur au survol
                },
              }}
            >
              Déjà inscrit, connectez-vous
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;