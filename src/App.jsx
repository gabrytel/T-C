import { Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import Login from './Accesso/Login' 
import LoginEsperto from './Accesso/LoginEsperto'
import ChiSiamo from './ChiSiamo'
import Contatti from './Contatti'
import Esperti from './Esperti'
import PianiCliente from './PianiCliente'

{/*"app.jsx lo fa per tutte le pagine quindi nn bisogna inserirlo nelle altre"*/}


function App() 
{
  return (
    
      <Routes>
        {/*"/" è la homepage*/}
        <Route path="/" element={<HomePage />} /> 

        {/*"/login" è la pagina di login*/}
        <Route path="/login" element={<Login />} />

        {/*"/loginEsperto" è la pagina di login per esperti*/}
        <Route path="/loginEsperto" element={<LoginEsperto />} /> 
        
        {/*"/chiSiamo" è la pagina di chi siamo*/}
        <Route path="/chiSiamo" element={<ChiSiamo />} />

        {/*"/contatti" è la pagina di contatti*/}
        <Route path="/contatti" element={<Contatti />} />

        {/*"/esperti" è la pagina di esperti*/}
        <Route path="/esperti" element={<Esperti />} />

        {/*"/pianiCliente" è la pagina dei piani cliente*/}
        <Route path="/pianiCliente" element={<PianiCliente />} />

  
        
      </Routes>
    
  )
}

export default App
