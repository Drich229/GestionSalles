import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ClassForm = ({ classe, onSubmit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (classe) {
      setName(classe.name);
    } else {
      setName('');
    }
  }, [classe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nom de la classe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {classe ? 'Modifier' : 'Ajouter'}
      </Button>
    </Box>
  );
};

export default ClassForm;