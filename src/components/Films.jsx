import { useState, useEffect } from "react";
import { Container, TableContainer, Table, TableHead, TableCell,
    TableBody, TableRow, TextField, Button
 } from "@mui/material";
import axios from "axios";

function Films() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchFilms = async () => {
            const response = await axios.get('https://swapi.dev/api/films/');
            setFilms(response.data.results)
        }
        fetchFilms()
    }, []);

    const handleEdit = (value, rowIndex, field) => {
        const updateFilms = [...films];
        updateFilms[rowIndex][field] = value;
        setFilms(updateFilms)
    }

    return (
        <Container>
            <h1>Фильмы</h1>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Фильмы</TableCell>
                            <TableCell>Директор</TableCell>
                            <TableCell>Продюсер</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {films.map((film, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField 
                                        value={film.title}
                                        onChange={(e) => handleEdit(e.target.value, index, 'title')}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField 
                                        value={film.director}
                                        onChange={(e) => handleEdit(e.target.value, index, 'director')}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField 
                                        value={film.producer}
                                        onChange={(e) => handleEdit(e.target.value, index, 'producer')}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                variant="contained"
                color="primary"
                onClick={() => console.log(films)}>
                Сохранить изменения
            </Button>
        </Container>
    )
}

export default Films