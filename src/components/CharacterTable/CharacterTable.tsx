import React from 'react';
import { Container, Table, TableContainer, CircularProgress } from '@mui/material';
import CharacterTableHeader from '../CharacterTableHeader/CharacterTableHeader';
import CharacterTableBody from '../CharacterTableBody/CharacterTableBody';
import useCharacter from '../useCharacter/useCharacter';
import './CharacterTable.css';

function CharacterTable() {
  const { loading } = useCharacter();

  return (
    <Container>
      {loading ? (
        <div className="progress-style">
          Loading...
          <CircularProgress />
        </div>
      ) : (
        <TableContainer>
          <h1>Rick and Morty</h1>
          <Table>
            <CharacterTableHeader />

            <CharacterTableBody />
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default CharacterTable;
