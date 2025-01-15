import { TableRow, TableCell, TableHead } from '@mui/material';
import React from 'react';
import './CharacterTableHeader.css';
import { fields } from '../CharacterConstants/CharacterConstants';

function CharacterTableHeader() {
  return (
    <TableHead>
      <TableRow className="table-row table-fields">
        {fields.map((field, index) => (
          <TableCell key={index}>{field.charAt(0).toUpperCase() + field.slice(1)}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CharacterTableHeader;
