const searchProductsConditions = (mongoose, price, category_id, department_id, attributes) => {
  let conditions = []
  if (price) {
    conditions.push({
      $match: {
        $and: [
          { discounted_price: { $gte: price.from } },
          { discounted_price: { $lte: price.to } }
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
  return conditions
}

const paginating = ({ page_limit, index }) => {
  let conditions = []
  conditions = [
    { $sort: { '_id': -1 } },
    {
      $facet: {
        metadata: [ { $count: 'total' }, { $addFields: { page: index } } ],
        data: [{ $skip: (index - 1) * page_limit }, { $limit: page_limit }]
      }
    }
  ]
  return conditions
}

module.exports = {
  searchProductsConditions,
  paginating
}