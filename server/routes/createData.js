const mongoose = require('mongoose')

const Department = mongoose.model('Department')
const Category = mongoose.model('Category')
const Product = mongoose.model('Product')
const ProductCategory = mongoose.model('ProductCategory')
const Attribute = mongoose.model('Attribute')
const AttributeValue = mongoose.model('AttributeValue')
const ProductAttribute = mongoose.model('ProductAttribute')
//shopping_cart
//orders
//order_detail
const ShippingRegion = mongoose.model('ShippingRegion')
//customer
const Shipping = mongoose.model('Shipping')
const Tax = mongoose.model('Tax')
//review

module.exports = app => {
  app.all('/create', async (req, res) => {
    const fs = require('fs')
    const readline = require('readline')
    const Stream = require('stream')

    const instream = fs.createReadStream(__dirname + '/initialData.csv')
    const outstream = new Stream()

    let rl = readline.createInterface(instream, outstream),
    lines = []
    let cntRows = 0
    rl.on('line', async (li) => {
      if (li === '') return
      if (li.substr(0, 3) === 'row') cntRows++
      lines.push(li)
    })
    

    rl.on('close', async () => {

      console.log(cntRows)

      const deleteCollections = (collections) => {
        return new Promise((res) => {
          collections.map((coll) => {
            eval(coll).deleteMany({}, () => {
              res()
            })
          })
        })
      }
      await deleteCollections(['Department', 'Category', 'Product', 'ProductCategory', 'Attribute', 'AttributeValue', 'ProductAttribute', 'ShippingRegion', 'Shipping', 'Tax'])

      const insertData = (lines) => {
        return new Promise((res) => {
          let tbl = '',
          schema = null,
          departmentIds = [],
          categoryIds = [],
          productIds = [],
          shippingIds = [],
          data,
          cnt = 0

          lines.map((line) => {
            // Prepair
            let arrayRow = line.split(',')
      
            if(arrayRow[0] === 'tbl') {
              tbl = arrayRow[1].trim().replace(/"/gi, '')
              schema = eval(tbl)
            }
            if(['tbl', 'prefix'].includes(arrayRow[0])) {
              return
            }
      
            // Prepair - create data Object
            switch(tbl) {
              case 'Department':
              case 'Category':
                if (arrayRow.length !== 3) return
                data = {
                  name: arrayRow[1].trim().replace(/"/gi, ''),
                  description: arrayRow[2].trim().replace(/"/gi, '')
                }
                break
              case 'Product':
                if (isNaN(parseFloat(arrayRow[3])) || arrayRow.length !== 9) return
                data = {
                  name: arrayRow[1].trim().replace(/"/gi, ''),
                  description: arrayRow[2].trim().replace(/"/gi, ''),
                  price: arrayRow[3],
                  discounted_price: arrayRow[4],
                  image: arrayRow[5].trim().replace(/"/gi, ''),
                  image_2: arrayRow[6].trim().replace(/"/gi, ''),
                  thumbnail: arrayRow[7].trim().replace(/"/gi, ''),
                  display: arrayRow[8]
                }
                break
              case 'Shipping':
                if (arrayRow.length !== 3) return
                data = {
                  shipping_type: arrayRow[1].trim().replace(/"/gi, ''),
                  shipping_cost: arrayRow[2]
                }
            }
            // Nodata then do nothing
            if (!data) return
      
            // Insert
            const createARow = (schema, data) => {
              return new Promise((res) => {
                schema.create(data, function (err, result) {
                  if (!err) {
                    cnt++
                    switch(schema.modelName) {
                      case 'Department':
                        departmentIds.push(result._id)
                        break
                      case 'Category':
                        categoryIds.push(result._id)
                        break
                      case 'Product':
                        productIds.push(result._id)
                        break
                      case 'Shipping':
                        shippingIds.push(result._id)
                    }
                  }
                  res(cnt)
                })
              })
            }
            
            createARow(schema, data).then((cnt) => {
              if (cnt === cntRows) {
                res({ departmentIds, categoryIds, productIds, shippingIds })
              }
            })
          })
        })
      }
      const { departmentIds, categoryIds, productIds, shippingIds } = await insertData(lines)
      console.log(departmentIds.length, categoryIds.length, productIds.length, shippingIds.length)
      categoryIds.map(async (id, idx) => {
        let dIdx
        if (idx <= 2) dIdx = 0
        else if (idx > 2 && idx <= 4) dIdx = 1
        else dIdx = 2

        await Category.updateOne({_id: id}, { department_id: departmentIds[dIdx] })
      })

      const insertAttribute = async () => {
        
        const size = await Attribute.create({name: 'Size'})
        const color = await Attribute.create({name: 'Color'})

        const fnAnAttribute = (values, attId) => {
          return new Promise((res) => {
            let avs = []
            values.map((e) => {
              AttributeValue.create({
                value: e,
                attribute_id: attId
              }, (err, av) => {
                avs.push(av._id)
                if (avs.length === values.length) {
                  res(avs)
                }
              })

            })
          })
        }

        const list1 = await fnAnAttribute([ 'S', 'M', 'L', 'XL', 'XXL' ], size._id)
        const list2 = await fnAnAttribute(['White', 'Black', 'Red' , 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Purple'], color._id)
        return new Promise((res) => res([...list1, ...list2]))
      }
      let attributeValueIds = await insertAttribute()

      productIds.map(async (id, idx) => {
        let catId
        if (idx <= 18) catId = 0
        else if (idx >= 19 && idx <= 28) catId = 1
        else if (idx >= 29 && idx <= 35) catId = 2
        else if (idx >= 36 && idx <= 48) catId = 3
        else if (idx >= 49 && idx <= 66) catId = 4
        else if (idx >= 67 && idx <= 90) catId = 5
        else if (idx >= 91 && idx <= 100) catId = 6

        await ProductCategory.create({
          product_id: id,
          category_id: categoryIds[catId]
        })
        attributeValueIds.map(attId => {
          ProductAttribute.create({
            product_id: id,
            attribute_value_id: attId
          })
        })
      })

      Tax.create({
        tax_type: 'Sales Tax at 8.5%',
        tax_percentage: 8.50
      })

      Tax.create({
        tax_type: 'No Tax',
        tax_percentage: 0
      })

      const fnShipRegion = (regions) => {
        return new Promise(res => {
          let shipRegionIds = []
          regions.map((e, i) => {
            ShippingRegion.create({
              shipping_region: e
            }, (err, shr) => {
              shipRegionIds.push(shr._id)
              if (shipRegionIds.length === regions.length){
                res(shipRegionIds)
              }
            })
          })
        })
      }

      const shrIds = await fnShipRegion(['Please Select', 'US / Canada', 'Europe', 'Rest of World'])
      console.log(shrIds.length)
      shippingIds.map(async (id, i) => {
        let shrid
        if (i <= 2) shrid = 1
        else if (i > 2 && i <= 4) shrid = 2
        else shrid = 3
        await Shipping.updateOne({_id: id}, {shipping_region_id: shrIds[shrid]})
      })

    })

    res.send('Hello World!')
  })
}