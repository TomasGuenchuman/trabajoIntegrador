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

router.post("/", function (req, res, next) {
  const { producto_id,cantidad } = req.body;
  const sql = "INSERT INTO carrito (producto_id,cantidad) VALUES (?)";
  db.query(sql, [[producto_id,cantidad]], function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("producto del carrito actualizado");
    }
  });
});

router.put("/", function (req, res, next) {
  const { producto_id,cantidad, id } = req.body;
  const sql =
    "UPDATE carrito SET producto_id = '" +
    producto_id +
    "', cantidad = '" +
    cantidad +
    "' WHERE id = " +
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
    const { id } = req.body;
    const sql = "DELETE FROM carrito WHERE id = " + id;
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