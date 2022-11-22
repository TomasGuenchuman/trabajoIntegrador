var express = require('express');
var router = express.Router();
var productosRouter = require('./productos');
var categoriasRouter = require('./categorias');
var lista_productosRouter = require('./lista_productos');
var carritoRouter = require('./carrito');
var usuariosRouter = require('./usuarios');
var ultimosIngresosRouter = require('./ultimos_ingresos');
var stockRouter = require('./stock');
var nodeMailerRouter = require('./nodeMailer');

router.use('/productos', productosRouter);
router.use('/categorias', categoriasRouter);
router.use('/listaProductos', lista_productosRouter);
router.use('/carrito', carritoRouter);
router.use('/usuarios', usuariosRouter);
router.use('/ultimosIngresos', ultimosIngresosRouter);
router.use('/stock', stockRouter);
router.use('/nodeMailer', nodeMailerRouter);

module.exports = router;