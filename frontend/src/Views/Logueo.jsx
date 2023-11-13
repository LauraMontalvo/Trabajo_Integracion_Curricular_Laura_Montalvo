import LoginForm from "../Components/LoginUsuario";
import RegistrarseComo from "../Components/RegistrarseComo";
import '../Styles/loginstyle.css'

const Logueo = () => {
    
    return (
        <div>
            <h1 className="bienvenido">Bienvenido!</h1>
            <div className="contenedor1">
                <div className='contproyectos'>
                  
                </div>
                <div className='contproyectos'>
                    {/*<LoginForm />*/}
                    <RegistrarseComo></RegistrarseComo>

                </div>
             </div>
        </div>
        
    );
}
export default Logueo;