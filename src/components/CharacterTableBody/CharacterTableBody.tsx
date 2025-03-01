import { TableBody, TableRow, TableCell, TextField, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import './CharacterTableBody.css';
import useCharacter from '../useCharacter/useCharacter';
import { fields } from '../CharacterConstants/CharacterConstants';
import Modal from '../Modal/Modal';


function CharacterTableBody() {
  const { data, setData } = useCharacter();
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: string } | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');
  const [hoveredCell, setHoveredCell] = useState<{ rowIndex: number; field: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const isHovered = (rowIndex: number, field: string) => hoveredCell?.rowIndex === rowIndex && hoveredCell?.field === field;

  const handleEdit = (rowIndex: number, field: string, value: string): void => {
    setEditingCell({ rowIndex, field });
    setCurrentValue(value);
  };

  const handleMouseEnter = (rowIndex: number, field: string): void => {
    setHoveredCell({ rowIndex, field });
  };

  const handleModalSave = (newText: string) => {
    if(editingCell) {
      const { rowIndex, field } = editingCell;
      const updatedData = [...data];
      updatedData[rowIndex][field] = newText;
      setData(updatedData);
      setEditingCell(null);
      setCurrentValue('');
    }
    setIsModalOpen(false)
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <TableBody>
      {isModalOpen && (
      <Modal
        initialText={currentValue}
        onSave={(newText) => {
          if(newText.trim()) {
            handleModalSave(newText)
          }
        }}
        onCancel={handleModalCancel}>

      </Modal>
    )}
      {data.map((value, rowIndex) => (
        <TableRow className="table-row" key={rowIndex}>
          {fields.map((field) => (
            <TableCell
              className="table-cell"
              key={field}
              onMouseEnter={() => handleMouseEnter(rowIndex, field)}>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                {value[field]}
                {isHovered(rowIndex, field) && (
                  <IconButton
                    className={`icon-button ${hoveredCell?.rowIndex === rowIndex && hoveredCell?.field === field ? 'visible' : ''}`}
                    size="small"
                    onClick={() => {
                      handleEdit(rowIndex, field, value[field])
                      setIsModalOpen(true)
                    }}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                )}
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}


export default CharacterTableBody;
