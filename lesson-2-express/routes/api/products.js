const express = require("express");
const { v4 } = require("uuid");

const products = require("../../data/products");

const productsOperations = require("../../methods");

const productsRouter = express.Router();

/*
1. Отримати всі товари
2. Отримати 1 товар по id 
3. Додати товар
4. Оновити товар по id
5. Видалити товар по id
*/

//Get /api/products — вже є, див app.js

//Всі товари Get /api/products
productsRouter.get("/", async(req, res, next) => {
    // res.json({
    //     status: "success",
    //     code: 200,
    //     data: {
    //         result: products
    //     }
    // })

    const products = await productsOperations.listAll();
    res.json(products);
    console.log(products);
});

//Один товар
productsRouter.get("/:id", (req, res) => {
    console.log(req.params);

    const { id } = req.params;
    const result = products.find(item => item._id === id);
    if (!result) {
        res.status(404).json({
            status: "error",
            code: 404,
            message: `Product with id=${id} is not found.`
        })
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
});

//Додати товар Post /api/products
productsRouter.post("/", (req, res) => {
    // console.log(req.body);

    const newProduct = { ...req.body, _id: v4() };
    products.push(newProduct);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result: newProduct
        }
    })
});

//Оновити товар PUT /api/products


module.exports = productsRouter;