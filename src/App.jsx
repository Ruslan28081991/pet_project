import { Button } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Planets from './components/Planets';
import People from './components/People';
import Films from './components/Films';

function App() {


  return (
      <Router>
        <h1>Справочник Star Wars</h1>
        <Button
          variant='outlined'
          component={Link}
          to="/planets">
          Planets
        </Button>
        <Button
          variant='outlined'
          component={Link}
          to="/users">
          Users
        </Button>
        <Button
          variant='outlined'
          component={Link}
          to="/films">
          Films
        </Button>
        
        <Routes>
          <Route path='/planets' element={<Planets />} />
          <Route path='/users' element={<People />}/>
          <Route path='/films' element={<Films />}/>
        </Routes>
      </Router>
      


  )
}

export default App
