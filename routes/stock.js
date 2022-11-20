var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
  const sql =
    "SELECT SUM(ultimos_ingresos.cantidad) as cantidad, productos.nombre, productos.imagen, productos.id "+
    "FROM ultimos_ingresos LEFT JOIN productos ON ultimos_ingresos.id_producto = productos.id group by id_producto";
  
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send(resul)
    }
  });
});
module.exports = router;
