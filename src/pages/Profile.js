import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import authService from '../services/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.data);
      } catch (error) {
        setError('Erreur de chargement du profil');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Profil Utilisateur
      </Typography>
      {user && (
        <Box sx={{ 
          backgroundColor: '#f5f5f5',
          p: 3,
          borderRadius: 2
        }}>
          <Typography><strong>Nom d'utilisateur:</strong> {user.username}</Typography>
          <Typography><strong>Nom:</strong> {user.name}</Typography>
          <Typography><strong>Prénom:</strong> {user.firstname}</Typography>
        </Box>
      )}
    </Box>
  );
};
export default Profile;