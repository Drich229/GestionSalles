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
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

    try {
      const { token } = await authService.login(
        formData.username,
        formData.password
      );
      
      // Stockage du token
      localStorage.setItem('token', token);
      localStorage.setItem('token_exp', Date.now() + 3600000);
      login();
      
      // Redirection
      navigate('/profile');
      
    } catch (err) {
      // Gestion spécifique des erreurs
      if (err.message === 'Identifiants incorrects') {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      } else {
        setError(err.message || 'Erreur lors de la connexion');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Card sx={{ 
        width: '100%',
        maxWidth: 450,
        p: 4,
        boxShadow: 3
      }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
            Connexion
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
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
              autoFocus
            />

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
              {loading ? <CircularProgress size={24} /> : 'Se connecter'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
            Pas encore de compte?{' '}
            <Link component={RouterLink} to="/register" sx={{ textDecoration: 'underline' }}>
              Créer un compte
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;