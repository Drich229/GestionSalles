import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const RoomForm = ({ room, onSubmit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (room) {
      setName(room.name);
    } else {
      setName('');
    }
  }, [room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nom de la salle"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {room ? 'Modifier' : 'Ajouter'}
      </Button>
    </Box>
  );
};

export default RoomForm;