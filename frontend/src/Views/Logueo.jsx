import LoginForm from "../Components/LoginUsuario";
import RegistrarseComo from "../Components/RegistrarseComo";


const Logueo = () => {
    
    return (
        <div>
            <h1 className="welcome">Welcome!</h1>
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