import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Partie gauche */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          ClassManager
          </Typography>
          <Button onClick={logout} color="inherit" component={Link} to="/" sx={{ ml: 2 }}>
            Accueil
          </Button>

          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/rooms" sx={{ ml: 2 }}>
                Salles
              </Button>
              <Button color="inherit" component={Link} to="/classes" sx={{ ml: 2 }}>
                Filières
              </Button>
            </>
          )}
        </Box>

        {/* Partie droite */}
        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/profile" sx={{ mr: 1 }}>
                Mon Profil
              </Button>
              <Button color="inherit" onClick={logout} component={Link} to="/">
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Connexion
              </Button>
              <Button color="inherit" component={Link} to="/register" sx={{ ml: 1 }}>
                Inscription
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;