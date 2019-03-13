const mongoose = require('mongoose')

const Product = mongoose.model('Product')
const Category = mongoose.model('Category')
const ProductCategory = mongoose.model('ProductCategory')
const AttributeValue = mongoose.model('AttributeValue')

module.exports = (app) => {
  app.get('/api/products', async (req, res) => {
    const products = await Product.find({})

    // TODO check paging in mongdoDB
    res.send(products)
  })
  app.get('/api/departments', async (req, res) => {
    const categories = await Category.find({}).populate('department_id').exec()

    let departments = {}
    categories.map((category) => {
      const dbDepartment = category.department_id
      let department = departments[dbDepartment._id.toString()]
      if (!department) {
        department = {
          _id: dbDepartment._id.toString(),
          name: dbDepartment.name,
          description: dbDepartment.description,
          categories: []
        }
      }
      department['categories'] = [...department['categories'], {
        _id: category._id.toString(),
        name: category.name,
        description: category.description
      }]
      departments[dbDepartment._id.toString()] = department
    })

    res.send(Object.values(departments))
  })
  app.get('/api/attributes', async (req, res) => {
    const attributeValues = await AttributeValue.find({}).populate('attribute_id').exec()
    let attributes = {}
    attributeValues.map((value, idx) => {
      let dbAttribute = value.attribute_id,
      attribute = attributes[dbAttribute._id.toString()]
      if (!attribute) {
        attribute = {
          _id: dbAttribute._id.toString(),
          name: dbAttribute.name,
          values: []
        }
      }
      attribute.values = [...attribute.values, {
        _id: value._id,
        value: value.value
      }]
      attributes[dbAttribute._id.toString()] = attribute
    })

    res.send(Object.values(attributes))

  })

  /* const options = {
    department_id: '',
    category_id: '',
    attributes: { Color: {}, Size: {}},
    price: {
      from: 0,
      to: 15.5
    },
    text: ''
  } */
  app.post('/api/products/s', async (req, res) => {
    const { department_id,
      category_id,
      attributes,
      price,
      text } = req.body

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
      // products = await Product.find({
      //   $text: {
      //     $search: text
      //   }
      // })
      // return res.send(products)
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
    
    if (conditions.length === 0) {
      products = await Product.find({})
    } else {
      products = await Product.aggregate(conditions)
    }

    console.log(products.length)
    res.send(products)
  })
  app.get('/api/product/:id', async (req, res) => {
    const productDetail = await Product.findOne({ _id: req.params.id })

    res.send(productDetail)
  })
}