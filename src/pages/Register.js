import React, { useState } from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress
} 
from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import authService from '../services/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    firstname: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation côté client
    if (!formData.username || !formData.name || !formData.firstname || !formData.password) {
      setError('Tous les champs sont obligatoires');
      setLoading(false);
      return;
    }

    try {
      await authService.register(
        formData.username,
        formData.name,
        formData.firstname,
        formData.password
      );
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', {
          state: { 
            registrationSuccess: true,
            username: formData.username 
          }
        });
      }, 2000);
      
    } catch (err) {
      // Gestion spécifique des erreurs du backend
      if (err.message === 'Username déjà utilisé') {
        setError('Ce nom d\'utilisateur est déjà pris. Veuillez en choisir un autre.');
      } else if (err.message === 'Username, password, name et firstname requis') {
        setError('Tous les champs sont obligatoires');
      } else {
        setError(err.message || "Une erreur inattendue s'est produite");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5',
      backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      p: { xs: 2, sm: 3 } }}>
      <Card sx={{ width: '100%', maxWidth: 500, p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Inscription
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Inscription réussie! Redirection vers la connexion...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nom d'utilisateur"
              name="username"
              variant="outlined"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
              error={error?.includes('nom d\'utilisateur')}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                label="Nom"
                name="name"
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Prénom"
                name="firstname"
                variant="outlined"
                margin="normal"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </Box>

            <TextField
              fullWidth
              label="Mot de passe"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'S\'inscrire'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
            Déjà un compte?{' '}
            <Link component={RouterLink} to="/login" sx={{ textDecoration: 'underline' }}>
              Se connecter
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;