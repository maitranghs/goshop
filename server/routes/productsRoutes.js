const mongoose = require('mongoose')

const Product = mongoose.model('Product')
const Category = mongoose.model('Category')
const ProductCategory = mongoose.model('ProductCategory')

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
  app.get('/api/products/cat/:categoryId', async (req, res) => {
    const { categoryId } = req.params

    const productCategories = await ProductCategory.find({
      category_id: categoryId
    }).populate('product_id').exec()

    const products = productCategories.map(pc => pc.product_id)
    res.send(products)
  })
  app.get('/api/products/dep/:departmentId', async (req, res) => {
    const { departmentId } = req.params

    const productCategories = await ProductCategory.find({})
      .populate('product_id')
      .populate({
        path: 'category_id',
        match: { department_id: departmentId }
      })
      .exec()

    const products = productCategories.map(pc => {
      if (pc.category_id) return pc.product_id
    }).filter(product => product)
    res.send(products)
  })
}