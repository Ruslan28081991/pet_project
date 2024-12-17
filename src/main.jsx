import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import WorkingApp from './WorkingApp'
import Proba from './Proba'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <WorkingApp />
    {/* {<Proba />} */}
  </StrictMode>,
)
