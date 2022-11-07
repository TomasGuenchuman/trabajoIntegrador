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
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: [],
      carrito: [],
      precioFinal: [],
      total: 0,
      precioTotal: "",
      acumuladorCarrito: 0,
    };
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
  eliminarDelCarrito(index) {
    const { carrito, precioFinal } = this.state;
    precioFinal.splice(index, 1);
    carrito.splice(index, 1);
    this.sumarPrecioFinal();
    this.setState({ carrito });
  }
  getProducto(productoId){
    return new Promise((resolve, reject) => {
      axios
      .get("http://localhost:5000/api/productos/productoElegido/?id=" + productoId)
      .then((res) => {
        let productoCarrito = res.data[0];
        productoCarrito.cantidad = 1;
        resolve(productoCarrito);
      });
   });
  }
  async añadirAlCarrito(productoId) {
    let { carrito, acumuladorCarrito, } = this.state;
    let productoCarrito = await this.getProducto(productoId);
    carrito.push(productoCarrito);
    acumuladorCarrito += 1;
    this.precioTotal(productoCarrito.precio);
    carrito.map((productoElegido, index) => {
      if (
        productoElegido.nombre === productoCarrito.nombre &&
        carrito.indexOf(productoElegido) != carrito.indexOf(productoCarrito)
      ) {
        this.actualizarPrecio(
          carrito.indexOf(productoElegido),
          (productoElegido.cantidad += 1)
        );
        this.eliminarDelCarrito(carrito.indexOf(productoCarrito));
      }
    });
    this.sumarPrecioFinal();

    this.setState({ carrito, acumuladorCarrito });
  }
  precioTotal(precio) {
    let { precioFinal } = this.state;
    let precioActualizado = precio;
    precioFinal.push({ precio, precioActualizado });
    this.setState({ precioFinal });
  }
  actualizarPrecio(index, cantidad) {
    let { precioFinal, carrito } = this.state;
    precioFinal[index].precioActualizado = precioFinal[index].precio * cantidad;
    carrito[index].cantidad = cantidad;
    this.sumarPrecioFinal();
    this.setState({ precioFinal });
  }
  sumarPrecioFinal() {
    let { precioFinal, total } = this.state;
    total = precioFinal.reduce(function (acc, obj) {
      return Number(acc) + Number(obj.precioActualizado);
    }, 0);
    this.setState({ total });
  }
  resetContadorcarrito() {
    const { acumuladorCarrito } = this.state;
    this.setState({ acumuladorCarrito: 0 });
  }
  render() {
    const { categoria, carrito, precioFinal, total, acumuladorCarrito } =
      this.state;
    return (
      <Router>
        <div className={styles.App}>
          <LogIn />
          <Navbar
            acumuladorCarrito={acumuladorCarrito}
            resetContadorcarrito={() => this.resetContadorcarrito()}
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
                    eliminarDelCarrito={(index) =>
                      this.eliminarDelCarrito(index)
                    }
                    carrito={carrito}
                    total={total}
                    precioFinal={precioFinal}
                    actualizarPrecio={(index, cantidad) =>
                      this.actualizarPrecio(index, cantidad)
                    }
                  />
                ) : (
                  <CarritoVacio />
                )
              }
            />
            <Route path="*" element={<span>Eror 404</span>} />
          </Routes>
        </div>
      </Router>
    );
  }
}
