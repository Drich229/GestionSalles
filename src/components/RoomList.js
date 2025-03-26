import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack} from '@mui/material';
import { red, green, blue} from '@mui/material/colors';
import RoomForm from './RoomForm';
import roomsService from '../services/rooms';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found, redirecting to login...");
      window.location.href = '/login';
    } else {
      fetchRooms();
    }
  }, []);

  const fetchRooms = async () => {
    const response = await roomsService.getRooms();
    setRooms(response.data);
  };

  const handleDelete = async (id) => {
    await roomsService.deleteRoom(id);
    fetchRooms();
  };

  const handleSubmit = async (roomData) => {
    if (editingRoom) {
      await roomsService.updateRoom(editingRoom.id, roomData);
    } else {
      await roomsService.addRoom(roomData);
    }
    setEditingRoom(null);
    fetchRooms();
  };

  return (
    <div>
      <RoomForm room={editingRoom} onSubmit={handleSubmit} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx = {{fontWeight : 'bold'}}>Nom</TableCell>
              <TableCell sx = {{fontWeight : 'bold'}}>Disponibilité</TableCell>
              <TableCell sx = {{fontWeight : 'bold'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.available ? <p>Oui</p> : <p>Non</p>}</TableCell>
                <TableCell>
                <Stack direction="row" spacing={2}>
                  <Button sx={{
                        backgroundColor: blue[500],
                        color: 'white',
                        '&:hover': {
                          backgroundColor: blue[700],
                        }
                      }} onClick={() => setEditingRoom(room)}>Modifier</Button>
                  <Button sx={{
                      backgroundColor: red[500],
                      color: 'white',
                      '&:hover': {
                        backgroundColor: red[700],
                      }
                    }} onClick={() => handleDelete(room.id)}>Supprimer</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RoomList;