import { Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import Login from './Accesso/Login' 
import LoginEsperto from './Accesso/LoginEsperto'
import ChiSiamo from './ChiSiamo'
import Contatti from './Contatti'
import Esperti from './Esperti'
import PianiCliente from './PianiCliente'
import Registrazione from './Registrazione'
import ResetPassword from './ResetPassword'
import AccessoCoach from './Accesso/AccessoCoach'
import AccessoNutrizionista from './Accesso/AccessoNutrizionista'
import AccessoPsicologo from './Accesso/Accessopsicologo'
import ClienteDettaglio from './Accesso/ClienteDettaglio'
import CreazioneModifica from './Accesso/CreazioneModifica'
import Profilo from './Profilo'
import Progressi from './Progressi'
import PianoFitness from './PianoFitness'
import PianoMente from './PianoMente'
import PianoNutrizione from './PianoNutrizione'



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

        {/*"/registrazione" è la pagina di registrazione*/}
        <Route path="/registrazione" element={<Registrazione />} />

        {/*"/resetPassword" è la pagina di reset password*/}
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/*"/accessoCoach" è la pagina di accesso per coach*/}
        <Route path="/accessoCoach" element={<AccessoCoach />} />

        {/*"/accessoNutrizionista" è la pagina di accesso per nutrizionista*/}
        <Route path="/accessoNutrizionista" element={<AccessoNutrizionista />} />

        {/*"/accessoPsicologo" è la pagina di accesso per psicologo*/}
        <Route path="/accessoPsicologo" element={<AccessoPsicologo />} />

        {/*"/clienteDettaglio" è la pagina di dettaglio del cliente*/}
        <Route path="/clienteDettaglio/:email" element={<ClienteDettaglio />} />

        {/*"/creazioneModifica" è la pagina di creazione o modifica del cliente*/}  
        <Route path="/creazioneModifica/:email/:idEsperto" element={<CreazioneModifica />} />

        {/*"/profilo" è la pagina del profilo*/}
        <Route path="/profilo" element={<Profilo />} />

        {/*"/progressi" è la pagina dei progressi*/}
        <Route path="/progressi" element={<Progressi />} />

        {/*"/pianoFitness" è la pagina del piano fitness*/}
        <Route path="/pianoFitness" element={<PianoFitness />} />

        {/*"/pianoMente" è la pagina del piano mente*/}
        <Route path="/pianoMente" element={<PianoMente />} />

        {/*"/pianoNutrizione" è la pagina del piano nutrizione*/}
        <Route path="/pianoNutrizione" element={<PianoNutrizione />} />

      



        


  
        
      </Routes>
    
  )
}

export default App
