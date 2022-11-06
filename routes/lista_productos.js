var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
  const sql = "SELECT *  FROM lista_productos";
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
  const { cantidad, producto_id } = req.body;
  const sql = "INSERT INTO lista_productos (cantidad,producto_id) VALUES (?)";
  db.query(sql, [[cantidad, producto_id]], function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("lista añadida");
    }
  });
});

router.put("/", function (req, res, next) {
  const { cantidad, producto_id, id } = req.body;
  const sql =
    "UPDATE lista_productos SET cantidad = '" +
    cantidad +
    "', producto_id = '" +
    producto_id +
    "' WHERE id = " +
    id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("lista actualizada");
    }
  });
});

router.delete("/", function (req, res, next) {
  const { id } = req.body;
  const sql = "DELETE FROM lista_productos WHERE id = " + id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("lista eliminada");
    }
  });
});

module.exports = router;
