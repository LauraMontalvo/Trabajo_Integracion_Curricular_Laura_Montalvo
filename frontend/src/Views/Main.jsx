import Cabecera from "../Components/Cabecera"
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "../Components/Carusel";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa las hojas de estilo de Bootstrap


const Main = () => {
    return (
      <div className="App">
        <Cabecera />
  <div className="carousel-container">
  <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.magisnet.com/wp-content/uploads/2020/02/empleos-del-futuro.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Primer Slide</h3>
          <p>Descripción del primer slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400?text=Second slide"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Segundo Slide</h3>
          <p>Descripción del segundo slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400?text=Third slide"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Tercer Slide</h3>
          <p>Descripción del tercer slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
        
      </div>
    );
  }
  
  export default Main;