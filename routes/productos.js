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
  const { id } = req.query;
  const sql = "SELECT * FROM productos WHERE id = " + id;
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
  const { categoriaId } = req.query;
  const sql = "SELECT * FROM productos WHERE categoria = " + categoriaId;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send(resul);
    }
  });
});

router.get("/filtro", function (req, res, next) {
  const { categoriaId, orden } = req.query;
  let sql;
  if (categoriaId) {
    sql = "SELECT * FROM productos WHERE categoria = " + categoriaId;
  } else {
    sql = "SELECT *  FROM productos";
  }
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      if (orden === "mayor") {
        res.send(resul.sort((a, b) => b.precio - a.precio)); // orden de mayor a menor
      } else if (orden === "menor") {
        res.send(resul.sort((a, b) => a.precio - b.precio)); // orden de menor a mayor
      }
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
  const { id } = req.query;
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
