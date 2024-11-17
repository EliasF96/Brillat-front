import React from 'react'
import Header from './Header'
import Footer from './Footer'
import centro from "../src/img/centro.jpg"
import chacras from "../src/img/chacras.jpg"
export const Pasteleria = () => {
  return (
    <>
      <Header />
      <div className="localInfoContainer">
        <h2>Disponemos de 2 tiendas que operan con distintos horarios, hacé tu pedido presencial o en nuestra tienda online <a href="/tienda">AQUÍ</a>
        </h2>
        <div className="infoBody">
          <div className="infoContainer1">
            <h1>CENTRO</h1>
            <img src={centro} alt="LocalCentroImg" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6701.079473150961!2d-68.85614391179749!3d-32.88389519999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09026e64cba3%3A0x8d9b9f422be9949d!2sBrillat%20Savarin%20-%20Centro!5e0!3m2!1ses-419!2sar!4v1721952538544!5m2!1ses-419!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
            />
          </div>
          <div className="infoContainer2">
            <h1>CHACRAS</h1>
            <img src={chacras} alt="LocalChacrasImg" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d89303.89510682477!2d-68.92079660778359!3d-32.87488999270089!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0a4cd2c165b5%3A0x60834be1e634283!2sBrillat%20Savarin%20-%20Chacras%20de%20Coria!5e0!3m2!1ses-419!2sar!4v1721953413103!5m2!1ses-419!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
            />
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}
