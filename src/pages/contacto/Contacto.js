import React from "react";
import styles from "./Contacto.module.css";
import Boton from "../../components/comun/Boton";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";
export default class Contacto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: 30, marginBottom: 20 }}>
          Contactanos
        </h1>
        <div className={styles.Contacto}>
          <form className={styles.Form}>
            <input type="text" placeholder="Nombre" required/>
            <input type="email" placeholder="Email" required/>
            <input type="text" placeholder="Asunto" required/>
            <span style={{ marginBottom: 10,marginTop: 15,fontSize: 21 }}>Mensaje</span>
            <textarea required/>
            <Boton texto="enviar" color="lightgray" width="80px" height="50px" />
          </form>
          <div className={styles.InfoContacto}>
            <div className={styles.Redes}>
              <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
                <img
                  src={instagram}
                  alt="Instagram"
                />
              </a>
              <a href="https://twitter.com/"  rel="noreferrer" target="_blank">
                <img
                  src={twitter}
                  alt="Twitter"
                />
              </a>
              <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
                <img
                  src={facebook}
                  alt="Facebook"
                />
              </a>
            </div>
            <div className={styles.Direcciones}>
              <span>
                <b>Nombre empresa</b>
              </span>
              <span>Kuanip 44</span>
              <span style={{ marginBottom: 10 }}>
                Ushuaia, Tierra del fuego
              </span>
              <a
                href="https://goo.gl/maps/WeYz8P837H8bj177A"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#092e6b", fontFamily: "gadugib" }}
              >
                ver direccion
              </a>
            </div>
            <div className={styles.Contactos}>
              <span>
                <b>Contacto</b>
              </span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=tomasschool391@gmail.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#092e6b", fontFamily: "gadugib" }}
              >
                tomasschool391@gmail.com
              </a>
              <span>+54 9 2901 643909</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
