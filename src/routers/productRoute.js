const express = require('express'),
      router = express.Router(),
      multer = require("multer"),
      {body} = require("express-validator");
// Solicito todas las funcionalidades del productController
const productController = require('../controllers/productController');

//Require de middlewares de ruta
const uploadProducts = require("../middlewares/multerProductsMiddleware")

/* Con readAll - LISTADO DE PRODUCTOS, RENDERIZA CATALOGO DE PRODUCTOS*/
router.get('/', productController.index);

//Index
router.get('/index', productController.index);

//Creación de nuevo producto
router.get('/productAdd', productController.productAddGet);
router.post('/productAdd/create',uploadProducts.single("imageProduct") ,productController.productAddPost);

//Detalle de producto
router.get('/productDetail/:id', productController.productDetail);

//Carrito
router.get('/productCart', productController.productCart);

//Catálogo de productos
router.get('/products', productController.productos);

//Edición de producto
router.get('/productEdit/:id', productController.productEdit);
router.put("/productEdit/:id", uploadProducts.single("imageProduct"),productController.productPut)

//Borrado de producto
router.delete("/productDetail/:id", productController.productDelete)

//Rutas de categorías de productos
router.get("/products/:productCategory",productController.productCategory)

//Búsqueda/Barra de navegación
router.get("/results",productController.search)


/* Con readDetail - LEE PRODUCTO SEGUN ID */
//router.get('/detalle/:menuId', productController.readDetail);

module.exports = router;
