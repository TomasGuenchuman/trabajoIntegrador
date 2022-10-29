import React from "react";
import styles from "./CardCarrito.module.css";
import Boton from "../../../components/comun/Boton"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class CardCarrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: "",
      cantidad:""
    };
  }
  // no funciona que se actualize el precio con el boton ACTUALIZAR solo con el selection
  mostrarEdicion(seleccion) {
    if(seleccion !== "10+"){
      this.actualizarPrecio(this.props.index,seleccion)
    }
    this.setState({editar: seleccion})
  }
  cantidad(cantidadSeleccion){
    this.setState({cantidad: cantidadSeleccion})
  }
  actualizarPrecio(index,cantidad){
    let {editar} = this.state;
    editar = ""
    
    this.setState({editar})
    if(cantidad !== "10+"){
      this.props.actualizarPrecio(index,Number(cantidad))
    }
  }
  render() {
    const editarPrecio = <div  style={{display: "flex",flexDirection: "row",marginRight: 10}}>
      <input type="number" style={{marginRight: 10,width: 70,height: 25,fontSize: 20}} onChange={(e) =>this.cantidad(e.target.value)}/>
      <Boton texto="actualizar" color="#FFD814" height="25px" funcion={() => this.actualizarPrecio(this.props.index,this.props.cantidad)}/>
    </div>;
    let {editar} = this.state;
    const {nombre,precio,imagen,categoria,cantidad,index,eliminarDelCarrito} = this.props;
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
            src={imagen}
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
                {nombre}
              </span>
            </div>
            <div style={{ flex: 1,display:"flex",alignItems: "flex-end",flexDirection:"column"}}>
              <span>
                <b>$ {precio}</b>
              </span>
              <span>
                <b>({cantidad})</b>
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
            <span onClick={() => eliminarDelCarrito(index)}>Eliminar</span>
          </div>
        </div>
      </div>
    );
  }
}
