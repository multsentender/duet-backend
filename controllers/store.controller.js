const Products = require('../models/Products')
const errorHandler = require('../utils/errorHandler')
const normalize = require('../utils/normalize')

module.exports.search = async (req, res) => {
    res.json({message: 'search'})
}
module.exports.getByParams = async (req, res) => {
    try{
        const data = await Products.find({type: req.query.type, manufactured: req.query.manuf})
        res.status(200).json(data)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async (req, res) => {
    const product = new Products({
        manufacture: req.body.manuf,
        title: normalize(req.body.title),
        type: req.body.type,
        description: normalize(req.body.description),
        price: req.body.price,
        imageUrl: req.file ? req.file.path : '',
        favorite: req.body.favorite
    });
    try{
        await product.save()
        res.status(201).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async (req, res) => {
    const updated = {
        manufacture: req.body.manuf,
        title: normalize(req.body.title),
        type: req.body.type,
        description: normalize(req.body.description),
        price: req.body.price,
        favorite: req.body.favorite
    };
    if(req.file) {
        updated.imageUrl = req.file.path
    }

    try{
        const product = await Products.findOneAndUpdate(
            {_id: req.query.id},
            {$set: updated},
            {new: true})
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}