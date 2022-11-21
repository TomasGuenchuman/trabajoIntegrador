var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
  const sql = "SELECT *  FROM categorias";
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
  const {id}= req.query;
  const sql = "SELECT *  FROM categorias where id="+id;
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
  const { descripcion } = req.body;
  const sql = "INSERT INTO categorias (descripcion) VALUES (?)";
  db.query(sql, [[descripcion]], function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("categoria guardada");
    }
  });
});

router.put("/", function (req, res, next) {
  const { descripcion, id } = req.body;
  const sql =
    "UPDATE categorias SET descripcion = '" +
    descripcion +
    "' WHERE id = " +
    id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("categoria actualizada");
    }
  });
});

router.delete("/", function (req, res, next) {
    const { id } = req.query;
    const sql = "DELETE FROM categorias WHERE id = " + id;
    db.query(sql, function (error, resul) {
      if (error) {
        console.log(error);
        res.send("ocurrio un error");
      } else {
        res.send("categoria eliminada");
      }
    });
  });
module.exports = router;
