var express = require('express');
var router = express.Router();
var productosRouter = require('./productos');
var categoriasRouter = require('./categorias');
var lista_productosRouter = require('./lista_productos');
var carritoRouter = require('./carrito');

router.use('/productos', productosRouter);
router.use('/categorias', categoriasRouter);
router.use('/listaProductos', lista_productosRouter);
router.use('/carrito', carritoRouter);

module.exports = router;