import React, { useEffect, useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel, TextField, Stack
} from '@mui/material';
import { red, green, blue} from '@mui/material/colors';
import ClassForm from './ClassForm';
import classesService from '../services/classes';
import roomsService from '../services/rooms';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [assignmentData, setAssignmentData] = useState({
    room_id: '',
    start_time: '',
    end_time: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [classesRes, roomsRes] = await Promise.all([
        classesService.getClasses(),
        roomsService.getRooms()
      ]);
      setClasses(classesRes.data);
      setRooms(roomsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    await classesService.deleteClass(id);
    fetchData();
  };

  const handleSubmit = async (classData) => {
    if (editingClass) {
      await classesService.updateClass(editingClass.id, classData);
    } else {
      await classesService.addClass(classData);
    }
    setEditingClass(null);
    fetchData();
  };

  const openAssignDialog = (cls) => {
    setSelectedClass(cls);
    setAssignmentData({
      room_id: cls.room_id || '',
      start_time: cls.start_time || '',
      end_time: cls.end_time || ''
    });
    setAssignDialogOpen(true);
  };

  const handleAssignSubmit = async () => {
    try {
      await classesService.assignRoom(
        selectedClass.id,
        assignmentData.room_id,
        assignmentData.start_time,
        assignmentData.end_time
      );
  
      setClasses(prevClasses => 
        prevClasses.map(cls => 
          cls.id === selectedClass.id
            ? {
                ...cls,
                room_id: assignmentData.room_id,
                start_time: assignmentData.start_time,
                end_time: assignmentData.end_time
              }
            : cls
        )
      );
  
      setAssignDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'assignation:", error);
    }
  };

  const handleUnassignRoom = async (classId, roomId) => {
    try {
      await classesService.unassignRoom(classId, roomId);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la désassignation:", error);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return 'Non défini';
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  return (
    <div>
      <ClassForm classe={editingClass} onSubmit={handleSubmit} rooms={rooms} />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx= {{fontWeight : 'bold'}}>Nom</TableCell>
              <TableCell sx= {{fontWeight : 'bold'}}>Salle assignée</TableCell>
              <TableCell sx= {{fontWeight : 'bold'}}>Heure de début</TableCell>
              <TableCell sx= {{fontWeight : 'bold'}}>Heure de fin</TableCell>
              <TableCell sx= {{fontWeight : 'bold'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{cls.room_name || 'Non assigné'}</TableCell>
                <TableCell>
                  {cls.start_time 
                    ? new Date(cls.start_time).toLocaleString('fr-FR') 
                    : 'Non défini'}
                </TableCell>
                <TableCell>
                  {cls.end_time 
                    ? new Date(cls.end_time).toLocaleString('fr-FR') 
                    : 'Non défini'}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Button sx={{
                        backgroundColor: blue[500],
                        color: 'white',
                        '&:hover': {
                          backgroundColor: blue[700],
                        }
                      }} onClick={() => setEditingClass(cls)}>Modifier</Button>
                 
                  {cls.room_id ? (
                    <Button 
                      onClick={() => handleUnassignRoom(cls.id, cls.room_id)}
                      color="secondary"
                    >
                      Désassigner
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => openAssignDialog(cls)}
                      sx={{
                        backgroundColor: green[500],
                        color: 'white',
                        '&:hover': {
                          backgroundColor: green[700],
                        }
                      }}
                    >
                      Assigner salle
                    </Button>
                  )}
                   <Button 
                    onClick={() => handleDelete(cls.id)} 
                    sx={{
                      backgroundColor: red[500],
                      color: 'white',
                      '&:hover': {
                        backgroundColor: red[700],
                      }
                    }}
                  >
                    Supprimer
                  </Button>
                </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog d'assignation */}
      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)}>
        <DialogTitle>
          {selectedClass?.room_id ? "Modifier l'assignation" : "Assigner une salle"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Salle</InputLabel>
            <Select
              value={assignmentData.room_id}
              onChange={(e) => setAssignmentData({...assignmentData, room_id: e.target.value})}
              label="Salle"
            >
              {rooms.filter(room => room.available || room.id === selectedClass?.room_id).map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name} {!room.available && room.id !== selectedClass?.room_id && '(Indisponible)'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Heure de début"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mt: 2 }}
            value={assignmentData.start_time}
            onChange={(e) => setAssignmentData({...assignmentData, start_time: e.target.value})}
          />

          <TextField
            label="Heure de fin"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mt: 2 }}
            value={assignmentData.end_time}
            onChange={(e) => setAssignmentData({...assignmentData, end_time: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleAssignSubmit} color="primary">
            {selectedClass?.room_id ? "Mettre à jour" : "Assigner"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassList;