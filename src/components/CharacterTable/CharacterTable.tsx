import React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import './CharacterTable.css';

function CharacterTable() {
  const [data, setData] = useState<Character[]>([]);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number, field: string} | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');
  const [hoveredCell, setHoveredCell] = useState<{ rowIndex: number, field: string} | null>(null);
  const [progress, setProgress] = useState<boolean>(true);
  const fields: string[] = ['name', 'status', 'species'];

  interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get<{results: Character[]}>('https://rickandmortyapi.com/api/character');
        setData(response.data.results);
        setProgress(false);
      } catch (error) {
        console.error('Error', error);
        setProgress(false);
        setData([]);
      }
    };
    fetch();
  }, []);

  const handleEdit = (rowIndex: number, field: string, value: string): void => {
    console.log({rowIndex, field})
    setEditingCell({ rowIndex, field });
    setCurrentValue(value);
  };

  const handleSave = (): void => {
    if (editingCell) {
      const { rowIndex, field } = editingCell;
      const updatedData = [...data];
      updatedData[rowIndex][field] = currentValue;
      setData(updatedData);
      setEditingCell(null);
      setCurrentValue('');
    }
  };

  const handleMouseEnter = (rowIndex: number, field: string): void => {
    setHoveredCell({ rowIndex, field });
  };

  const handleMouseLeave = (): void => {
    if (editingCell) {
      handleSave();
    }
    setHoveredCell(null);
  };

  return (
    <Container>
      {progress ? (
        <div className="progress-style">
          Loading...
          <CircularProgress />
        </div>
      ) : (
        <TableContainer>
          <h1>Rick and Morty</h1>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((field, index) => (
                  <TableCell key={index}>{field.charAt(0).toUpperCase() + field.slice(1)}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((value, rowIndex) => (
                <TableRow className="table-row" key={rowIndex}>
                  {fields.map((field) => (
                    <TableCell
                      className="table-cell"
                      key={field}
                      onMouseEnter={() => handleMouseEnter(rowIndex, field)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {editingCell?.rowIndex === rowIndex && editingCell.field === field ? (
                        <TextField
                          className="text-field"
                          size="small"
                          value={currentValue}
                          onChange={(e) => setCurrentValue(e.target.value)}
                          onBlur={handleSave}
                          autoFocus
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {value[field]}
                          {hoveredCell?.rowIndex === rowIndex && hoveredCell.field === field && (
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(rowIndex, field, value[field])}
                              sx={{
                                marginLeft: '10px',
                                visibility: hoveredCell?.rowIndex === rowIndex && hoveredCell?.field === field ? 'visible' : 'hidden',
                                opacity: hoveredCell?.rowIndex === rowIndex && hoveredCell?.field === field ? 1 : 0,
                                transition: 'opacity 1.3s ease-in-out, visibility 1.3s ease-in-out',
                              }}
                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                          )}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default CharacterTable;
