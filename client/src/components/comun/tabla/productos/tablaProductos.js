import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Boton from "../../boton/Boton";
import styles from "./tablaProductos.module.css";
import axios from "axios";
export default class AdminProductos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCard: false,
      infoProducto: {},
      categorias: [],
    };
  }
  componentDidMount() {
    this.getCategorias();
  }

  getCategorias() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/categorias").then((res) => {
        resolve(this.setState({ categorias: res.data }));
      });
    });
  }
  createData(id, nombre, imagen, precio,categoria) {
    return { id, nombre, imagen, precio,categoria};
  }
  categoriaElegida(categoriaId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:5000/api/categorias/categoriaElegida?id=" +
            categoriaId
        )
        .then((res) => {
          resolve(res.data[0].descripcion);
        });
    });
  }
  async mostrarCard(id,nombre,imagen,precio,categoria) {
    let categoriaDescripcion = await this.categoriaElegida(Number(categoria))
    let productInfo = {id:id,nombre:nombre,imagen:imagen,precio: precio,categoria: categoriaDescripcion}
    this.setState({infoProducto: productInfo})
    this.setState({ mostrarCard: true });
  }
  esconderCard() {
    this.setState({infoProducto: {}})
    this.setState({ mostrarCard: false });
  }
  render() {
    const { productos } = this.props;
    const { mostrarCard,infoProducto } = this.state;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const rows = productos.map((producto) => {
      return this.createData(
        producto.id,
        producto.nombre,
        producto.imagen,
        producto.precio,
        producto.categoria
      );
    });
    return (
      <>
        
        {rows.map((row,index) => (
          
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="center">{row.nombre}</TableCell>
            <TableCell align="center">
              <img alt={row.nombre} src={row.imagen} width="80px" />
            </TableCell>
            <TableCell align="center">{formatter.format(row.precio)}</TableCell>
            <TableCell align="center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Boton
                  texto="edit"
                  color="orange"
                  borde="0"
                  padding="0"
                  width="50px"
                  height="35px"
                  funcion={() => this.mostrarCard(row.id,row.nombre,row.imagen,row.precio,row.categoria)}
                />
                <Boton
                  texto="del"
                  color="red"
                  borde="0"
                  padding="0"
                  width="50px"
                  height="35px"
                />
              </div>
              
            </TableCell>
            {mostrarCard === true ? <CardProducto infoProducto={infoProducto}  esconderCard={() => this.esconderCard()} categorias={this.state.categorias}/> : ""}
          </TableRow>
        ))}
      </>
    );
  }
}

class CardProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {infoProducto, esconderCard,categorias} = this.props;

    return (
      <div className={styles.ContenedorCard}>
        <div style={{width: "100%",height: "80%",display: "flex", flexDirection: "column", justifyContent: "center",alignItems: "center"}}>
            <img alt={infoProducto.nombre} src={infoProducto.imagen}/>
            <label>Nombre</label>
            <input type="text" value={infoProducto.nombre}/>
            <label>Precio</label>
            <input type="number" value={infoProducto.precio}/>
            <label>Categoria: {infoProducto.categoria}</label>
            <input list="ice-cream-flavors" id="ice-cream-choice" placeholder="Cambiar categoria"/>
            <datalist id="ice-cream-flavors" value="1">
                {categorias.map((categoria) => {
                  return(
                    <option value={categoria.descripcion}> {categoria.id}</option>
                  );
                })}
            </datalist>
        </div>
        <div style={{height: "20%",width: "50%",display: "flex", flexDirection: "row",justifyContent: "space-evenly", alignItems: "center"}}>
                <Boton
                  texto="Guardar"
                  color="lightgreen"
                  width="100px"
                  height="50px"
                />
                <Boton
                  texto="cancelar"
                  color="red"
                  borde="0"
                  padding="0"
                  width="100px"
                  height="50px"
                  funcion={() =>  esconderCard()}
                />
        </div>
      </div>
    );
  }
}
