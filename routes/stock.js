var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
    const sql =
    "SELECT ultimos_ingresos.cantidad, productos.nombre,productos.imagen,productos.id FROM productos LEFT JOIN ultimos_ingresos ON ultimos_ingresos.id_producto = productos.id";

  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
        let arrayDatos = [];
        arrayDatos = resul
        res.send(arrayDatos);
    }
  });
});
module.exports = router;
