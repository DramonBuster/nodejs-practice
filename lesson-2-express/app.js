const express = require("express");
const fs = require("fs/promises");
const moment = require("moment");
const cors = require("cors");

const productsRouter = require("./routes/api/products");

//створення веб-сервера
const app = express();

app.use(cors());
app.use(express.json());

const products = require("./data/products")

//якщо прийде GET запит на адресу /, виконатидану функцію
app.get("/contacts", (req, res) => {
    // console.log(req.url);//адреса на яку прийшов запид
    // console.log(req.method);//метод запиту (GET, Post...)
    // console.log(req.headers);//заголовки запиту
    res.send("<h2>Contacts page</h2>");
});

app.get("/", (req, res) => {
    res.send("<h2>Home Page</h2>")
})

//продукти

// app.set("json spaces", 18);

// app.get("/products", (req, res) => {
    
//     // res.json(null);
//     // res.send(null);

//     res.json(products);
//     // res.send(products);
// })

//Мідлвари

// app.use((req, res, next) => {
//     console.log("First middleware");
//     next();
// });

// app.use((req, res, next) => {
//     console.log("Second middleware");
//     next();
// });

// app.use(async(req, res, next) => {
//     const { method, url } = req;
//     const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//     await fs.appendFile("server.log", `\n${method} ${url} ${date}`)
//     next();
// })

app.get("/products", (req, res) => {
    res.json(products);
})

// Свій Сервер

app.use("/api/products", productsRouter);

//(прослуховується порт, колбек)
app.listen(3000, () => console.log("Server is running on port 3000"));

