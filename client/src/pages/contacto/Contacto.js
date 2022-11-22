import React from "react";
import styles from "./Contacto.module.css";
import Boton from "../../components/comun/boton/Boton";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";
import axios from "axios";
export default class Contacto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    };
  }

  getNombre(e) {
    this.setState({ nombre: e });
  }
  getEmail(e) {
    this.setState({ email: e });
  }
  getAsunto(e) {
    this.setState({ asunto: e });
  }
  getMensaje(e) {
    this.setState({ mensaje: e });
  }
  enviarEmail() {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:5000/api/nodeMailer", {
        mail: this.state.email,
        asunto: this.state.asunto,
        mensaje: this.state.mensaje,
        nombre: this.state.nombre,
      });
      this.setState({ nombre: "", email: "", asunto: "", mensaje: "" });
      alert("Mail Enviado");
    });
  }
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: 30, marginBottom: 20 }} >
          Contactanos
        </h1>
        <div className={styles.Contacto}>
          <form className={styles.Form}>
            <input
              type="text"
              placeholder="Nombre"
              value={this.state.nombre}
              onChange={(e) => this.getNombre(e.target.value)}
              maxLength="30"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.getEmail(e.target.value)}
              maxLength="255"
              required
            />
            <input
              type="text"
              placeholder="Asunto"
              value={this.state.asunto}
              onChange={(e) => this.getAsunto(e.target.value)}
              maxLength="255"
              required
            />
            <span style={{ marginBottom: 10, marginTop: 15, fontSize: 21 }}>
              Mensaje
            </span>
            <textarea
              value={this.state.mensaje}
              onChange={(e) => this.getMensaje(e.target.value)}
              required
            />
            <Boton
              texto="enviar"
              color="lightgray"
              width="80px"
              height="50px"
              funcion={() => this.enviarEmail()}
            />
          </form>
          <div className={styles.InfoContacto}>
            <div className={styles.Redes}>
              <a
                href="https://www.instagram.com/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={instagram} alt="Instagram" />
              </a>
              <a href="https://twitter.com/" rel="noreferrer" target="_blank">
                <img src={twitter} alt="Twitter" />
              </a>
              <a
                href="https://www.facebook.com/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={facebook} alt="Facebook" />
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
