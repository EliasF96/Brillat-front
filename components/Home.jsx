import React, { useContext } from 'react'
import sliderGallery from "./sliderGallery.js"
import Slider from "react-slick";
import Header from './Header.jsx';
import Footer from './Footer.jsx';


export const Home = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <>
      <Header />
      <div className="contentCarousel">
        <Slider {...settings}>
          {sliderGallery.map((item) => (
            <div key={item.id}>
              <div className="img-body">
                <img src={item.src} alt={item.alt} />
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <h2 className="subtitle">
        ¿Nos damos un gusto?
      </h2>
      <Footer />
    </>
  )
}