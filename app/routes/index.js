let express = require('express')

let authController = require('../controllers/authController')
let merchantController = require('../controllers/merchantController')
let productController = require('../controllers/productController')
let authMiddleware = require('../middlewares/authMiddleware')
let router = express.Router()

// A merchant could register itself/create an account in the merchant service
router.post('/merchant', merchantController.createMerchant)

// A merchant could remove its data/delete its account in the merchant service
router.delete('/merchant/:id', authMiddleware.isAuthenticate, merchantController.deleteMerchant)

//Login 
router.post('/login', authController.login)

// A merchant could add products in the merchant service
router.post('/merchant/product', authMiddleware.isAuthenticate, productController.createProduct)

// A merchant could delete a product in the merchant service
router.delete('/merchant/:merchant_id/product/:id', authMiddleware.isAuthenticate, productController.deleteProduct)

// A merchant could update a product in the merchant service
router.put('/merchant/:merchant_id/product/:id', authMiddleware.isAuthenticate, productController.updateProduct)

// A merchant could get the list of its products from the merchant service
router.get('/merchant/:merchant_id/product/:id', authMiddleware.isAuthenticate, productController.getProductById)
router.get('/merchant/:merchant_id/product', authMiddleware.isAuthenticate, productController.getProduct)

// Added feature to see all or single merchant & to update merchant account
router.get('/merchant',  authMiddleware.isAuthenticate, merchantController.getMerchant)
router.get('/merchant/:id', authMiddleware.isAuthenticate, merchantController.getMerchantById)
router.put('/merchant/:id', authMiddleware.isAuthenticate, merchantController.updateMerchant)




module.exports = router