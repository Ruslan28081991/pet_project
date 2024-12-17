import { useState, useEffect } from "react";
import { Container, TableContainer, Table, TableHead, TableBody,
     TableCell, TableRow, TextField, Button } from "@mui/material";
import axios from "axios";

function People() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await axios.get('https://swapi.dev/api/people/');
            setPeople(response.data.results)
        }
        fetchPeople()
    }, []);

    const handleEdit = (value, rowIndex, field) => {
        const updatePeople = [...people]
        updatePeople[rowIndex][field] = value;
        setPeople(updatePeople)
    }
    
    return (
        <Container>
            <h1>People</h1>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Пользователи</TableCell>
                            <TableCell>Пол </TableCell>
                            <TableCell>Высота</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {people.map((people, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField 
                                        value={people.name}
                                        onChange={(e) => handleEdit(e.target.value, index, 'name')}/>
                                </TableCell>

                                <TableCell>
                                    <TextField 
                                        value={people.gender}
                                        onChange={(e) => handleEdit(e.target.value, index, 'gender')}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField 
                                        value={people.height}
                                        onChange={(e) => handleEdit(e.target.value, index, 'height')}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button 
                variant="contained"
                color="primary"
                onClick={() => console.log(people)}>Сохранить изменения</Button>
        </Container>
    )
} 

export default People

