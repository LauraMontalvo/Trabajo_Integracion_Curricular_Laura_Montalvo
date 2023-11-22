import { Button } from "reactstrap";
import Cabecera from "../Components/Cabecera"
import { useNavigate } from "react-router";

const Main = () => {
    const navigate = useNavigate();
    const CrearEmpresa = () => navigate("/registrarEmpresa");
    return(
        <div className="App">
            <Cabecera/>
            <Button onClick={CrearEmpresa}>Crear empresa</Button>
            
        </div>
        
    )
}

export default Main;