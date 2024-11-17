import React from 'react'
import Header from './Header'
import Footer from './Footer'
import file from "../src/documents/test.txt"
import Slider from "react-slick"
import slider1 from "../src/img/Catalogo/slider-1.jpeg"
import slider2 from "../src/img/Catalogo/slider-2.jpeg"
import slider3 from "../src/img/Catalogo/slider-3.jpeg"
import slider4 from "../src/img/Catalogo/slider-4.jpg"
import slider5 from "../src/img/Catalogo/slider-5.jpg"
import slider6 from "../src/img/Catalogo/slider-6.jpg"
import slider7 from "../src/img/Catalogo/slide-evento-1.jpg"
import slider8 from "../src/img/Catalogo/slide-evento-2.jpg"
export const Catalogo = () => {
  const sliderGallery = [
    {
      id: 1,
      title: "",
      description: "",
      src: slider1,
      alt: "Pan de Chocolate",
    },
    {
      id: 2,
      title: "",
      description: "",
      src: slider2,
      alt: "Selva Negra"
    },
    {
      id: 3,
      title: "",
      description: "",
      src: slider3,
      alt: "Eclairs"
    },
    {
      id: 4,
      title: "",
      description: "",
      src: slider4,
      alt: "Chacras"
    },
    {
      id: 5,
      title: "",
      description: "",
      src: slider5,
      alt: "Chacras2"
    },
    {
      id: 6,
      title: "",
      description: "",
      src: slider6,
      alt: "Chacras3"
    }
  ]
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const sliderGallery2 = [
    {
      id: 1,
      title: "",
      description: "",
      src: slider7,
      alt: "Mesa salada",
    },
    {
      id: 2,
      title: "",
      description: "",
      src: slider8,
      alt: "Mesa dulce"
    }
  ]
  return (
    <>
      <Header />
      <div className="mainEventContainer">
        <div className="eventContainer1">
          <div className="infoContainer">
            <h1>MENU CHACRAS DE CORIA</h1>
            <p>Pasteleria abierta de 8:30 a 21:00hs TODOS LOS DIAS</p>
            <a href={file} download="TestDownload" target="_blank">DESAYUNO - MEDIATARDE - BRUNCH</a>
            <a href={file} download="TestDownload" target="_blank">BEBIDAS</a>
          </div>
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
        </div>
        <div className="eventContainer2">
          <div className="infoContainer">
            <h1>CATALOGO DE EVENTOS</h1>
            <p>DESCARGE EL MENU DE EVENTOS Y CICLOS DE DESAYUNOS</p>
            <a href={file} download="TestDownload" target="_blank">EVENTO</a>
            <a href={file} download="TestDownload" target="_blank">EVENTO CHACRAS</a>
          </div>
          <div className="contentCarousel">
            <Slider {...settings}>
              {sliderGallery2.map((item) => (
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
        </div>
      </div>
      <Footer />
    </>
  )
}
