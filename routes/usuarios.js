var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
  const sql = "SELECT *  FROM usuarios";
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
  const { avatar, nombre, email, permiso } = req.body;
  const sql = "INSERT INTO usuarios (avatar,nombre,email,permiso) VALUES (?)";
  db.query(sql, [[avatar, nombre, email, permiso]], function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("usuario agregado");
    }
  });
});

router.put("/", function (req, res, next) {
  const { avatar, nombre, email, permiso, id } = req.body;
  const sql =
    "UPDATE usuarios SET avatar = '" +
    avatar +
    "',nombre = '" +
    nombre +
    "',email = '" +
    email +
    "',permiso = '" +
    permiso +
    "' WHERE id = " +
    id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("usuario actualizado");
    }
  });
});

router.delete("/", function (req, res, next) {
  const { id } = req.query;
  const sql = "DELETE FROM usuarios WHERE id = " + id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("usuario eliminado");
    }
  });
});

module.exports = router;
