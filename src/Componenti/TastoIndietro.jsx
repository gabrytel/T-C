import { useNavigate } from "react-router-dom";
import "./TastoIndietro.css";

const TastoIndietro = () => 
{
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)} className="tasto-indietro">
            Torna indietro
        </button>
    );
};

export default TastoIndietro;