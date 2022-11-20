import React from "react";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Contacto from "./pages/contacto/Contacto";
import Productos from "./pages/productos/Productos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Carrito from "./pages/carrito/Carrito";
import CarritoVacio from "./pages/carrito/CarritoVacio";
import axios from "axios";
import Admin from "./pages/admin/Admin";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: [],
      carrito: [],
      acumuladorCarrito: 0,
      logInNombre: "",
      logInPermiso: "",
      logInAvatar: "",
      logInId: 0,
      logInEstado: false,
    };
  }
  componentDidMount() {
    this.getCarrito(this.state.logInId);
  }
  ingresoLogIn(nombre, permiso, avatar,id) {
    this.setState({
      logInNombre: nombre,
      logInPermiso: permiso,
      logInAvatar: avatar,
      logInId: id,
      logInEstado: true,
    });
  }
  cerrarSesion() {
    alert("sesion cerrada");
    this.setState({
      logInNombre: "",
      logInPermiso: "",
      logInAvatar: "",
      logInId: "",
      logInEstado: false,
    });
  }
  getCarrito(id) {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/carrito/carritoUSuario?id="+id).then((res) => {
        resolve(this.setState({ carrito: res.data }));
      });
    });
  }
  agregarCategoria(categoriaElegida) {
    let { categoria } = this.state;
    categoria = [];
    categoria.push(categoriaElegida);
    this.setState({ categoria });
  }
  eliminarCategoria(index) {
    const { categoria } = this.state;
    categoria.splice(index, 1);
    this.setState({ categoria });
  }
  getProducto(productoId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:5000/api/productos/productoElegido/?id=" +
            productoId
        )
        .then((res) => {
          let productoCarrito = res.data[0];
          resolve(productoCarrito);
        });
    });

  }

  añadirAlCarrito(productoId){
    let mapCarrito = this.state.carrito.map((carrito) => {
      if(carrito.id === productoId) {
        return(true) //hay undefined si es true
      }
    });
    const found = mapCarrito.includes(true);
    const indexCarrito = mapCarrito.indexOf(mapCarrito.includes(true)); console.log(found);console.log(indexCarrito)
    this.contadorcarrito()
    if (found === true) {
      return new Promise((resolve, reject) => {
        axios.put("http://localhost:5000/api/carrito?id="+ this.state.carrito[indexCarrito].idCarrito, {
          cantidad: (this.state.carrito[indexCarrito].cantidad ) + 1,
        });
    
        resolve(this.getCarrito(this.state.logInId));
     
      });
    }else{
      return new Promise((resolve, reject) => {
    
        axios.post("http://localhost:5000/api/carrito", {
          producto_id: productoId,
          cantidad: 1,
          id_usuario: this.state.logInId,
        });
        resolve(this.getCarrito(this.state.logInId));
      });

    }

  }
  /*sumarPrecioFinal() {
    let { precioFinal, total } = this.state;
    total = precioFinal.reduce(function (acc, obj) {
      return Number(acc) + Number(obj.precioActualizado);
    }, 0);
    this.setState({ total });
  }*/
  resetContadorcarrito() {
    this.setState({ acumuladorCarrito: 0 });
  }
  contadorcarrito() {
    this.setState({ acumuladorCarrito: this.state.acumuladorCarrito + 1});
  }
  render() {
    const { categoria, carrito, precioFinal, total, acumuladorCarrito } =
      this.state;
    return (
      <div className={styles.App}>
        <LogIn
          ingresoLogIn={(nombre, permiso, avatar,id) =>
            this.ingresoLogIn(nombre, permiso, avatar,id)
          }
          getCarrito={(id) => this.getCarrito(id)}
        />
        <Navbar
          acumuladorCarrito={acumuladorCarrito}
          resetContadorcarrito={() => this.resetContadorcarrito()}
          logInPermiso={this.state.logInPermiso}
          logInEstado={this.state.logInEstado}
          cerrarSesion={() => this.cerrarSesion()}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Productos
                categoria={categoria}
                agregarCategoria={(categoriaElegida) =>
                  this.agregarCategoria(categoriaElegida)
                }
                eliminarCategoria={(index) => this.eliminarCategoria(index)}
                añadirAlCarrito={(productoId) =>
                  this.añadirAlCarrito(productoId)
                }
              />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/carrito"
            element={
              carrito.length >= 1 ? (
                <Carrito
                  getCarrito={(id) => this.getCarrito(id)}
                  logInId={this.state.logInId}
                  carrito={carrito}
                />
              ) : (
                <CarritoVacio />
              )
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                logInAvatar={this.state.logInAvatar}
                logInNombre={this.state.logInNombre}
                cerrarSesion={() => this.cerrarSesion()}
              />
            }
          >
            <Route path="/admin/productos" />
            <Route path="/admin/usuarios" />
            <Route path="/admin/stock" />
            <Route path="/admin/ultimosIngresos" />
          </Route>
          <Route path="*" element={<span>Eror 404</span>} />
        </Routes>
      </div>
    );
  }
}
