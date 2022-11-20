var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
  const sql = "SELECT *  FROM carrito";
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send(resul);
    }
  });
});

router.get("/carritoUSuario", function (req, res, next) {
  const { id } = req.query;
  const sql = "SELECT SUM(carrito.cantidad) as cantidad,carrito.id_usuario,productos.imagen,productos.precio,productos.nombre,productos.id,carrito.idCarrito  FROM carrito LEFT JOIN productos ON carrito.producto_id = productos.id WHERE id_usuario = "+id+" group by producto_id";
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send(resul);
    }
  });
});

router.post("/", function (req, res, next) {
  const { producto_id,cantidad,id_usuario } = req.body;
  const sql = "INSERT INTO carrito (producto_id,cantidad,id_usuario) VALUES (?)";
  db.query(sql, [[producto_id,cantidad,id_usuario]], function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("producto del carrito actualizado");
    }
  });
});

router.put("/", function (req, res, next) {
  const { id } = req.query;
  const {cantidad} = req.body;
  const sql =
    "UPDATE carrito SET cantidad = '" +
    cantidad +
    "' WHERE idCarrito = " +
    id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("producto del carrito actualizado");
    }
  });
});

router.delete("/", function (req, res, next) {
    const { id } = req.query;
    const sql = "DELETE FROM carrito WHERE idCarrito = " + id;
    db.query(sql, function (error, resul) {
      if (error) {
        console.log(error);
        res.send("ocurrio un error");
      } else {
        res.send("producto eliminado del carrito");
      }
    });
  });
module.exports = router;