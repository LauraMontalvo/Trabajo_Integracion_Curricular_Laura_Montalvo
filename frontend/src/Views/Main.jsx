import Cabecera from "../Components/Cabecera"
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "../Components/Carusel";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa las hojas de estilo de Bootstrap


const Main = () => {
    return (
      <div className="App">
        <Cabecera />
  
        <Carousel className="carousel-container">
          <Carousel.Item>
            <ExampleCarouselImage
              imageUrl="https://i0.wp.com/esferacreativa.com/wp-content/uploads/2020/03/trabajos-desde-casa-MadridNYC.png?fit=1024%2C512&ssl=1"
              description="Descripción de la primera imagen."
            />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              imageUrl="https://www.shutterstock.com/image-vector/people-different-skills-connecting-together-600nw-1687380997.jpg"
              description="Descripción de la segunda imagen."
            />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              imageUrl="https://img.freepik.com/vector-gratis/fondo-trabajo-equipo-personas-que-trabajan-juntas_107791-9566.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=ais"
              description="Descripción de la tercera imagen."
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
  
  export default Main;