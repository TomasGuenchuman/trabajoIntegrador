import React from "react";
import styles from "./CardCarrito.module.css";
import Boton from "../../../components/comun/Boton"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class CardCarrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: ""
    };
  }

  mostrarEdicion(seleccion) {
    const {editar} = this.state;
    this.setState({editar: seleccion})
  }
  render() {
    const editarPrecio = <div style={{display: "flex",flexDirection: "row",marginRight: 10}}>
      <input type="number" style={{marginRight: 10,width: 70,height: 25,fontSize: 20}}/>
      <Boton texto="actualizar" color="#FFD814" height="25px"/>
    </div>;
    const {editar} = this.state;
    return (
      <div
        style={{
          height: "35%",
          borderTop: "1px solid lightgray",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_20551_Mother_ASUS_PRIME_A520M-K_AM4_f5d89e00-grn.jpg"
            alt="imagen"
            width="80%"
            height="80%"
          />
        </div>
        <div style={{ flex: 3,display: "flex",flexDirection: "column",justifyContent: "space-around"}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 20,
              fontSize: "1.3rem",
            }}
          >
            <div style={{ flex: 4 }}>
              {" "}
              <span>
                Mother ASUS PRIME A520M-KAM4
              </span>
            </div>
            <div style={{ flex: 1,display:"flex",justifyContent: "flex-end" }}>
              <span>
                <b>$ 17.350</b>
              </span>
            </div>
          </div>

          <div className={styles.OpcionesCarrito}>
            <select style={{marginRight: 10,display: editar === "10+"? "none" : ""}} onChange={(e) =>this.mostrarEdicion(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10+</option>
            </select>
            {editar === "10+"? editarPrecio: ""}
            <span>Eliminar</span>
          </div>
        </div>
      </div>
    );
  }
}
