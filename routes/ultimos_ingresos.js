var express = require("express");
var router = express.Router();
var db = require("./conexion.js");

router.get("/", function (req, res, next) {
  const sql = "SELECT *  FROM ultimos_ingresos";
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send(resul);
    }
  });
});

router.get('/detalles', function(req, res, next) {
	const {id_producto} = req.query;
    const sql = 'SELECT nombre,imagen FROM productos WHERE id = '+ id_producto;
	db.query(sql, function(error,resul){
		if (error) {
			console.log(error);
			res.send("ocurrio un error");
		}else {
			res.send(resul);
		}
	});
});

router.post("/", function (req, res, next) {
  const { cantidad,id_producto } = req.body;
  const sql = "INSERT INTO ultimos_ingresos (cantidad,id_producto) VALUES (?)";
  db.query(sql, [[cantidad,id_producto]], function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("ingreso agregado");
    }
  });
});

router.put("/", function (req, res, next) {
  const { cantidad, id_producto, id } = req.body;
  const sql =
    "UPDATE ultimos_ingresos SET cantidad = '" +
    cantidad +
    "', id_producto = '" +
    id_producto +
    "' WHERE id = " +
    id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("ingreso modificado");
    }
  });
});

router.delete("/", function (req, res, next) {
  const { id } = req.body;
  const sql = "DELETE FROM ultimos_ingresos WHERE id = " + id;
  db.query(sql, function (error, resul) {
    if (error) {
      console.log(error);
      res.send("ocurrio un error");
    } else {
      res.send("ingreso eliminado");
    }
  });
});

module.exports = router;