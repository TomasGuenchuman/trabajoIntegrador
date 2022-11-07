var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
  const sql = "SELECT *  FROM productos";
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send(resul);
    }
  });
});

router.get("/productoElegido", function (req, res, next) {
  const {id} = req.query;
  const sql = "SELECT * FROM productos WHERE id = "+ id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send(resul);
    }
  });
});

router.get("/categoriaElegida", function (req, res, next) {
  const {categoriaId} = req.query;
  const sql = "SELECT * FROM productos WHERE categoria = "+ categoriaId;
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
  const { nombre, precio, imagen, categoria } = req.body;
  const sql =
    "INSERT INTO productos (nombre,precio,imagen,categoria) VALUES (?)";
  db.query(sql, [[nombre, precio, imagen, categoria]], function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("producto guardado");
    }
  });
});

router.put("/", function (req, res, next) {
  const { nombre, precio, imagen, categoria, id } = req.body;
  const sql =
    "UPDATE productos SET nombre = '" +
    nombre +
    "', precio = '" +
    precio +
    "', imagen = '" +
    imagen +
    "', categoria = '" +
    categoria +
    "' WHERE id = " +
    id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("producto actualizado");
    }
  });
});

router.delete("/", function (req, res, next) {
  const { id } = req.body;
  const sql = "DELETE FROM productos WHERE id = " + id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("producto eliminado");
    }
  });
});
module.exports = router;
