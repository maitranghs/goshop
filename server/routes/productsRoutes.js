const mongoose = require('mongoose')

const Product = mongoose.model('Product')
const Department = mongoose.model('Department')
const Attribute = mongoose.model('Attribute')
const ShippingRegion = mongoose.model('ShippingRegion')

const search = require('../services/search')

module.exports = (app) => {

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
    ])

    res.send(departments)
  })

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
        $sort: { 'values.order': -1 }
      },
      
      {
        $project: { 'values.attribute_id': 0, 'values.order': 0 }
      }
    ])
    res.send(attributes) 

  })

  app.get('/api/shippingregions', async (req, res) => {
    const regions = await ShippingRegion.find({})

    res.send(regions)
  })

  /* options = { department_id: '', category_id: '', attributes: { Color: {}, Size: {}}, price: { from: 0, to: 15.5 }, text: '', paginate: { page_limit: 5, index: 2 } } */

  // Product search
  app.post('/api/products/s', async (req, res) => {
    const { department_id,
      category_id,
      attributes,
      price,
      text,
      paginate: { page_limit, index } } = req.body

    console.log(attributes)
    let products, conditions = []
    if (text) {
      conditions.push({
        $match: {
          $or: [
            { name: text },
            { description: text }
          ]
        }
      })
      products = await Product.find({
        $text: {
          $search: text
        }
      })
      return res.send(products)
    }

    if (price) {
      conditions.push({
        $match: {
          $and: [
            { price: { $gte: price.from } },
            { price: { $lte: price.to } }
          ]
        }
      })
    }

    if (category_id) {
      conditions.push({
        $lookup: {
          from: 'productcategories',
          localField: '_id',
          foreignField: 'product_id',
          as: 'pc'
        }
      })
      conditions.push({
        $match: { 'pc.category_id': { $eq: mongoose.Types.ObjectId(category_id) } }
      })
      conditions.push({
        $project: { pc: 0 }
      })
    }

    if (department_id) {
      conditions.push({
        $lookup: {
          from: 'productcategories',
          localField: '_id',
          foreignField: 'product_id',
          as: 'pc'
        }
      })
      conditions.push({
        $lookup: {
          from: 'categories',
          localField: 'pc.category_id',
          foreignField: '_id',
          as: 'c'
        }
      })
      conditions.push({
        $match: { 'c.department_id': { $eq: mongoose.Types.ObjectId(department_id) } }
      })
      conditions.push({
        $project: { pc: 0, c: 0 }
      })
    }

    const attributeArray = Object.values(attributes)
    if (attributeArray.length > 0) {
      conditions.push({
        $lookup: {
          from: 'productattributes',
          localField: '_id',
          foreignField: 'product_id',
          as: 'pa'
        }
      })
      const mapAttributes = attributeArray.map(attribute => 
                  ({ 'pa.attribute_value_id': { $eq: mongoose.Types.ObjectId(attribute._id) } }))

      conditions.push({
        $match: { $and: mapAttributes }
      })
      conditions.push({
        $project: { pa: 0 }
      })
    }

    conditions = [ ...conditions, { $sort: { '_id': -1 } },
                  {
                    $facet: {
                      metadata: [ { $count: 'total' }, { $addFields: { page: index } } ],
                      data: [{ $skip: (index - 1) * page_limit }, { $limit: page_limit }]
                    }
                  } ]
    
    products = await Product.aggregate(conditions)

    console.log(products[0].data.length)
    res.send(products[0])
  })
  app.get('/api/product/:id', async (req, res) => {
    const productDetail = await Product.findOne({ _id: req.params.id })

    res.send(productDetail)
  })
}