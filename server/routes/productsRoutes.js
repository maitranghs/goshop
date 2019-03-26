const mongoose = require('mongoose')

const Product = mongoose.model('Product')
const Department = mongoose.model('Department')
const Attribute = mongoose.model('Attribute')
const ShippingRegion = mongoose.model('ShippingRegion')

const search = require('../services/search')

module.exports = (app) => {

  // Departments
  app.get('/api/departments', async (req, res) => {

    const departments = await Department.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'department_id',
          as: 'categories'
        }
      },
      {
        $sort: { '_id': 1, 'categories.name': 1 }
      }
    ]).cache()

    res.send(departments)
  })

  // Attributes
  app.get('/api/attributes', async (req, res) => {

    const attributes = await Attribute.aggregate([
      {
        $lookup: {
          from: 'attributevalues',
          localField: '_id',
          foreignField: 'attribute_id',
          as: 'values'
        }
      },
      {
        $sort: { 'values._id': -1 }
      },
      {
        $project: { 'values.attribute_id': 0 }
      }
    ]).cache()
    res.send(attributes) 

  })

  // Shipping regions
  app.get('/api/shippingregions', async (req, res) => {
    const regions = await ShippingRegion.aggregate([
      {
        $lookup: {
          from: 'shippings',
          localField: '_id',
          foreignField: 'shipping_region_id',
          as: 'ships'
        }
      },
      {
        $sort: { 'ships._id': -1 }
      },
      {
        $project: { 'ships.shipping_region_id': 0 }
      }
    ]).cache()

    res.send(regions)
  })

  // Product search by text
  app.post('/api/products/text/s', async (req, res) => {
    const { text } = req.body

    const products = await Product.find({
      $text: {
        $search: text
      }
    })
    return res.send(products)

  })

  /* options = 
    { department_id: '',
      category_id: '',
      attributes: { Color: {}, Size: {}},
      price: { from: 0, to: 15.5 },
      paginate: { page_limit: 5, index: 2 } } */
  app.post('/api/products/s', async (req, res) => {
    const { department_id,
      category_id,
      attributes,
      price,
      paginate } = req.body

    const conditions = [
          ...search.searchProductsConditions(mongoose, price, category_id, department_id, attributes),
          ...search.paginating(paginate)
        ]
    
    const products = await Product.aggregate(conditions)
    res.send(products[0])
  })

  // Product detail
  app.get('/api/product/:id', async (req, res) => {
    const productDetail = await Product.findOne({ _id: req.params.id })

    res.send(productDetail)
  })
}