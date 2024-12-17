import { useState, useEffect } from 'react'
import { Container, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TextField, IconButton, Button } from '@mui/material'
import axios from 'axios'
import { Edit as EditIcon } from '@mui/icons-material'

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [editingCell,setEditingCell] = useState(null);
  const [currentValue, setCurrentValue] = useState('')
  const [hoveredCell, setHoveredCell] = useState(null)

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await axios.get('https://swapi.dev/api/planets/');
      setPlanets(response.data.results);
    };
    fetchPlanets();
  }, []);

  const handleEdit = (rowIndex, field, value) => {
    setEditingCell({ rowIndex, field });
    setCurrentValue(value)
  }

  // const onSave = (value, rowIndex, field) => {
  //   const updatePlanets = [...planets];
  //   updatePlanets[rowIndex][field] = value;
  //   setPlanets(updatePlanets);
  // };

  const handleSave = () => {
    if(editingCell) {
      const { rowIndex, field } = editingCell;
      const updatePlanets = [...planets];
      updatePlanets[rowIndex][field] = currentValue;
      setPlanets(updatePlanets);
      // onSave(currentValue, rowIndex, field);
      setEditingCell(null);
      setCurrentValue('')
    }
  }

  const handleMouseEnter = (rowIndex, field) => {
    setHoveredCell({ rowIndex, field });
  };

  const handleMouseLeave = () => {
    handleSave();
    setHoveredCell(null);
  }

  const fields = ['name', 'climate', 'population']

  return (
    <Container>
      <h1>Planets</h1>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {planets.map((planet, rowIndex) => (
              <TableRow key={rowIndex}>
                {fields.map((field) => (
                  <TableCell 
                    key={field} 
                    onMouseEnter={() => handleMouseEnter(rowIndex, field)}
                    onMouseLeave={handleMouseLeave}>
                    {editingCell?.rowIndex === rowIndex && editingCell.field === field ? (
                      <TextField 
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      onBlur={handleSave}
                      autoFocus/>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                        {planet[field]}
                        {hoveredCell?.rowIndex === rowIndex && hoveredCell.field === field && (
                           <IconButton
                            size="small"
                            onClick={() => handleEdit(rowIndex, field, planet[field])}
                            style={{ marginLeft: '8px' }}
                          >
                           <EditIcon fontSize="small"/>
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

    </Container>
  )
}

export default Planets