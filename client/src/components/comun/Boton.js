import React from "react";
import styles from "./Boton.module.css";
export default class Boton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className={styles.Boton}
        style={{
          width: this.props.width ? this.props.width : "a",
          cursor: "pointer",
          height: this.props.height ? this.props.height : "a",
          backgroundColor: this.props.color ? this.props.color : "white",
          textAlign: "center",
          padding: this.props.width
            ? "0"
            : this.props.padding
            ? this.props.padding
            : "10px",
          borderRadius: this.props.border ? this.props.border : "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: this.props.borde ? this.props.borde : "1px solid gray",
        }}
        onClick={this.props.funcion}
      >
        <span
          style={{
            textTransform: "uppercase",
            fontSize: "0.875rem",
            letterSpacing: "0.02857em",
            userSelect: "none",
            fontWeight: "bold",
          }}
        >
          {this.props.texto}
        </span>
      </div>
    );
  }
}
