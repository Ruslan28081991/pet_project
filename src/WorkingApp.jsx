import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableContainer, TableHead,
    TableRow, TableCell, TextField, IconButton } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

function WorkingApp() {
    const [data, setData] = useState([]); // данные с бэкенда
    const [editingCell, setEditingCell] = useState(null); // редактирование какой либо ячейки
    const [currentValue, setCurrentValue] = useState(''); // хранит временное значение
    const [hoveredCell, setHoveredCell] = useState(null); // указывает какая ячейка под мышкой

    const fields = ['name', 'status', 'species'] // поля для отображения
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('https://rickandmortyapi.com/api/character');
                setData(response.data.results)
            } catch (error) {
                console.error("Error", error)
            }
        };
        fetch()
    }, []);

    const handleEdit = (rowIndex, field, value) => { // функция начала редактирования
        setEditingCell({ rowIndex, field }); // Указываем какое поле именно редактируется
        setCurrentValue(value); // Заполняем временное значение(что ввел пользователь)
    }

    const handleSave = () => { // функция сохранения 
        if(editingCell) { // если редактирование таблицы
            const { rowIndex, field } = editingCell; // извлекаем координаты ячейки
            const updatedData = [...data]; // создаем копию массива
            updatedData[rowIndex][field] = currentValue; // обновляем нужное поле в копии массива
            setData(updatedData); // обновляем данные в массиве data
            setEditingCell(null); // завершаем редактирование
            setCurrentValue('') // Сбрасываем временное значение
        }
    }

    const handleMouseEnter = (rowIndex, field) => {
        setHoveredCell({ rowIndex, field }); // указываем что мышь под ячейкой
    }

    const handleMouseLeave = () => {
        if(editingCell) {
            handleSave()
        }
        setHoveredCell(null) // убираем подсветку ячейки
    }

    return (
        <Container>
            <h1>Rick and Morty</h1>

            <TableContainer>
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
                                <TableRow key={rowIndex}>
                                    {fields.map(field => (
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
                                                    {value[field]}
                                                    { hoveredCell?.rowIndex === rowIndex && hoveredCell.field === field && (
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleEdit(rowIndex, field, value[field])}
                                                            style={{ marginLeft: '2px'}}>
                                                                <EditIcon fontSize="inherit"/>
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

export default WorkingApp