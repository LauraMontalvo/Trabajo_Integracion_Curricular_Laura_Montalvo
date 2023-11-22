import Cabecera from "../Components/Cabecera"
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "../Components/Carusel";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa las hojas de estilo de Bootstrap


const Main = () => {
    return (
        <div className="App">
            <Cabecera />

            <Carousel>
                <Carousel.Item>
                    <ExampleCarouselImage  imageUrl="https://i0.wp.com/esferacreativa.com/wp-content/uploads/2020/03/trabajos-desde-casa-MadridNYC.png?fit=1024%2C512&ssl=1" />

                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage imageUrl="https://www.shutterstock.com/image-vector/people-different-skills-connecting-together-600nw-1687380997.jpg" />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage imageUrl="https://img.freepik.com/vector-gratis/fondo-trabajo-equipo-personas-que-trabajan-juntas_107791-9566.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=ais" />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


        </div>

    )
}

export default Main;