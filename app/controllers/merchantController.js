let models = require('../../models/index')
let jwt = require('jsonwebtoken')
let Validator = require('validatorjs')
let bcrypt = require('bcrypt')

async function getMerchant (req, res) {
    try {
        let result = await models.Merchant.findAll({
            attributes: ['id', 'name', 'email', 'address'],
            include: {
                association: 'product',
                attributes: [ 'id', 'name', 'price']
            }
        }) 
        if (result.length < 1) {
            res.json({message: 'Merchant data is not available'})
        }
        res.json(result)
    } catch (error) {
        res.json(error)        
    }
}

async function getMerchantById (req, res) {
    try {
        let result = await models.Merchant.findOne({ where: {id: req.params.id} })
        if (result.length < 1) {
            res.json({message: 'Merchant data is not available'})
        }
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

async function createMerchant (req, res) {
    try {
        let rules = {
            name: 'required|min:3|max:50',
            email: 'required|email|min:10',
            password: 'required|min:6',
            address: 'required',
            phone_number: 'required|numeric'
        }
        let validation = new Validator(req.body, rules)

        if (validation.passes()) {
            let salt = bcrypt.genSaltSync(10)
            let password = bcrypt.hashSync(req.body.password, salt)
            req.body.password = password
        
            let createMerchant = await models.Merchant.create(req.body)
            return res.json({message: 'Merchant account has been created'})
        } else {
            return res.json({ errors: validation.errors.all() })
        }
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}

async function updateMerchant (req, res) {
    try {
        let result = await models.Merchant.findOne({ where: {id: req.params.id} })
            if (result.length < 1) {
                res.json({message: 'Merchant data is not available'})
            }
            let updateMerchant = await result.update(req.body)
            res.json(result)
    } catch (error) {
        res.json(error)
    }    
}

async function deleteMerchant (req, res) {
    try {
        let deleteMerchant = await models.Merchant.destroy({ where: { id: req.params.id }})
        res.json({message: "Merchant has already deleted", id: req.params.id})
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    getMerchant,
    getMerchantById,
    createMerchant,
    updateMerchant,
    deleteMerchant
}