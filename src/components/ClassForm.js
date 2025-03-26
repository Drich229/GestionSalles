import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, InputLabel, FormControl, Select } from '@mui/material';

const ClassForm = ({ classData, onSubmit, rooms = [] }) => {
  const [formData, setFormData] = useState({
    name: classData?.name || '',
    room_id: classData?.room_id || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        name="name"
        label="Nom de la classe"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 2 }}
      >
        {classData ? 'Modifier' : 'Créer'}
      </Button>
    </Box>
  );
};

export default ClassForm;