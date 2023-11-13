import { useNavigate } from "react-router-dom";
import "../Styles/header.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
const Cabecera= (props) =>{
    //const {user} = props;
    const navigate = useNavigate();
    return(
        <div>
            <div className="nav">
                <h1 className="Titulo" >Empleos ChavezPamba</h1>
                <ul className="nav-links">
                    <li><Button  className="boton" onClick={e=>navigate("/")} >Inicio</Button></li>
                    <li><Button  className="boton" onClick={e=>navigate("/registrarseComo")} >Iniciar sesion</Button></li>
                  
                </ul>
            </div >
        </div> 
    )
}

export default Cabecera;