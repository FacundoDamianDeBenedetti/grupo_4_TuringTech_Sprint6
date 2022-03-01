// ESTO SERIA EL GESTOR DEL MODELO
const db = require("../database/models")
const path = require("path")

const productController = {
    index: (req,res) => {
        res.render("products/index")
    },
    productCart: (req,res) => {
        res.render("products/productCart")
    },
    productDetail: (req,res) => {
        db.Product.findByPk(req.params.id,{
            include: [{association: "brand"},
                      {association: "categorie"}, 
                      {association: "discount"}
                    ]
        })
        .then(productDetail => {
            return res.render("products/productDetail",{productDetail})
        })
    },
    productos: (req,res) => {
        res.render('products/productos');
    },
    productAddGet: (req,res) => {
        let brands = db.Brand.findAll(),
            categories = db.Categorie.findAll(),
            discounts = db.Discount.findAll()

        Promise.all([brands,categories,discounts])
            .then(([brands,categories,discounts]) => {
                return res.render("products/productAdd",{brands,categories,discounts})
            })
        },
    productAddPost: (req,res) => {
        let sliced = req.file.path.slice(req.file.path.indexOf("productos-assets"), req.file.path.length)

		db.Product.create({
			product_name: req.body.productName,
			product_description: req.body.productDescription,
			product_descriptionplus: req.body.productDescriptionLong,
			price: req.body.productPrice,
			stock: req.body.productStock,
			visibility: req.body.productVisibility,
			imageProduct: req.file.filename,
            sliced: sliced,
            product_fees: req.body.productFees,
            product_main: req.body.productImportant,
			categorie_id: req.body.productCategory,
			brand_id: req.body.productBrand,
			discount_id: req.body.productDiscount
		})
        .then(() => {
           return res.redirect(`/products/${req.body.productCategory}`)
        })
    },
    productEdit: (req,res) => {
        db.Product.findByPk(req.params.id,{
            include: [{association: "brand"},
                      {association: "categorie"}, 
                      {association: "discount"}
                    ]
        })
            .then(productEdit => {
                return res.render("products/productEdit",{productEdit})
            })
    },
    productPut: (req,res) => {
        let sliced = req.file.path.slice(req.file.path.indexOf("productos-assets"), req.file.path.length)

        /* let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if(oneRow.id == row.id){
                    if(oneRow.productImage1){
                        fs.unlinkSync(path.resolve(__dirname, `../../public/images/${oneRow.ruta}`))
                    }
                }
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });
            // escribo el archivo
            //console.log(updatedRows)
            this.writeFile(updatedRows);

            return row.id; */

        db.Product.update({
            product_name: req.body.productName,
			product_description: req.body.productDescription,
			product_descriptionplus: req.body.productDescriptionLong,
			price: req.body.productPrice,
			stock: req.body.productStock,
			visibility: req.body.productVisibility,
			imageProduct: req.file.filename,
            sliced: sliced,
            product_fees: req.body.productFees,
            product_main: req.body.productImportant,
			categorie_id: req.body.productCategory,
			brand_id: req.body.productBrand,
			discount_id: req.body.productDiscount
        },{
            where: {
                id: req.params.id
            }
        })
        .then(() => {
           return res.redirect("/products/Procesadores")
        })
    },
    productDelete: (req,res) => {
        //console.log('Elimino :' + id)
        /* let rows = this.readFile();

        //Recorro todas las filas y elimino el archivo-imágen del producto que coincida con el id del mismo
        rows.forEach(row => {
            if(row.id == id){
                if(row.productImage1){
                    fs.unlinkSync(path.resolve(__dirname, `../../public/images/${row.ruta}`))
                }
            }
        });

        let updatedRows = rows.filter(row => {
            return row.id != id;
        });

        this.writeFile(updatedRows); */

        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            return res.redirect("/products/Procesadores")
        })
    },
    productCategory: (req,res) => {
        let products = db.Product.findAll(),
            categories = db.Categorie.findAll()

        Promise.all([products,categories])
            .then(([products,categories]) => {
                let productsFiltered = []

                for (let i = 0; i < products.length; i++) {
                    for(let j = 0; j < categories.length;j++){
                        if(products[i].categorie_id === categories[j].id && categories[j].categorie_name === req.params.productCategory){
                            productsFiltered.push(products[i])
                        }
                    }
                }

                res.render("products/productos",{productsFiltered})
            })
    },
    search: (req,res) => {
        let searched = req.query.search.toLowerCase()

		db.Product.findAll()
            .then(products => {
                let productsResults = []

                for(let i = 0; i < products.length;i++){
                    if(products[i].product_name.toLowerCase().includes(searched)){
                        productsResults.push(products[i])
                    }
                }
        
                res.render("products/results",{productsResults})
            })
    }
}

module.exports = productController;

