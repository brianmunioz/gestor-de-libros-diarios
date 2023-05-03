import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Carrusel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://e1.pxfuel.com/desktop-wallpaper/594/346/desktop-wallpaper-4-accounting-accounting.jpg"
          alt="First slide"
          height={'500px'}
        />
    
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_1280.jpg"
          alt="Second slide"
          height={'500px'}
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src="https://besthqwallpapers.com/Uploads/4-5-2020/131773/thumb2-financial-charts-financial-report-bookkeeping-concepts-calculator-bookkeeping.jpg"
          alt="Third slide" 
          height={'500px'}
        />

        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default Carrusel