let models = require('../../models/index')
let jwt = require('jsonwebtoken')
let Validator = require('validatorjs')
let bcrypt = require('bcrypt')


async function getProduct (req, res) {
    try {
        let result = await models.Product.findAll({ where: {merchant_id: req.params.merchant_id} })
            if (result.length < 1) {
                return res.json({message: 'Product data is not available'})
            }
            return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function getProductById (req, res) {
    try {
        let result = await models.Product.findOne({ where: {id: req.params.id, merchant_id: req.params.merchant_id} })
            if (result.length < 1) {
                res.json({message: 'Product data is not available'})
            }
            res.json(result)
    } catch (error) {
        res.json(error)  
    }
}

async function createProduct (req, res) {
    try {
        let rules = {
            name: 'required|min:3|max:50',
            quantity: 'required|min:1|numeric',
            price: 'required|min:1000|numeric'
        }
        let validation = new Validator(req.body, rules)
        if (validation.passes()) {
            let createProduct = await models.Product.create(req.body)
            res.json(req.body) 
        } else {
            return res.json({ errors: validation.errors.all() })
        }
    } catch (error) {
        res.json(error)    
    }
}

async function updateProduct (req, res) {
    try {
        let result = await models.Product.findOne({ where: {id: req.params.id, merchant_id: req.params.merchant_id} })
            if (result.length < 1) {
                res.json({message: 'Product data is not available'})
            }
            let updateProduct = await result.update(req.body)
            res.json(result)
    } catch (error) {
        res.json(error)
    }
}

async function deleteProduct (req, res) {
    try {
        let deleteProduct = await models.Product.destroy({ where: { id: req.params.id, merchant_id: req.params.merchant_id }})
        res.json({message: "Product has already deleted", id: req.params.id})
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}