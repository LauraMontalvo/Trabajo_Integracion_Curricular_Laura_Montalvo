// components/ExampleCarouselImage.jsx
import React from 'react';
import { Card } from 'react-bootstrap';


function ExampleCarouselImage({ imageUrl }) {
  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} alt="Imagen del carrusel" className="img-fluid rounded" />
      {/* Puedes ajustar la clase "rounded" y agregar otras clases de Bootstrap según sea necesario */}
      <Card.Body>
        <Card.Text>
          Descripción de la imagen.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ExampleCarouselImage;
