import { TableBody, TableRow, TableCell, TextField, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import './CharacterTableBody.css';
import useCharacter from '../useCharacter/useCharacter';
import { fields } from '../CharacterConstants/CharacterConstants';

function CharacterTableBody() {
  const {data, setData} = useCharacter()
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: string } | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');
  const [hoveredCell, setHoveredCell] = useState<{ rowIndex: number; field: string } | null>(null);

  const isEditing = (rowIndex: number, field: string) => editingCell?.rowIndex === rowIndex && editingCell?.field === field;
  const isHovered = (rowIndex: number, field: string) => hoveredCell?.rowIndex === rowIndex && hoveredCell?.field === field;

  const handleEdit = (rowIndex: number, field: string, value: string): void => {
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
              {isEditing(rowIndex, field) ? (
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
                  {isHovered(rowIndex, field) && (
                    <IconButton
                      className={`icon-button ${hoveredCell?.rowIndex === rowIndex && hoveredCell?.field === field ? 'visible' : ''}`}
                      size="small"
                      onClick={() => handleEdit(rowIndex, field, value[field])}>
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
  );
}

export default CharacterTableBody;
